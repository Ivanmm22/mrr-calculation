import { Opportunity, OppType, Stage, CalculationResult } from './types';

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateMRRLogic = (opportunities: Opportunity[]): CalculationResult => {
  const result: CalculationResult = {
    baseOpp: null,
    validAmendments: [],
    excluded: [],
    mrr: 0,
    acv: 0,
  };

  // 1. Filter First
  const validForConsideration: Opportunity[] = [];

  opportunities.forEach(opp => {
    let isExcluded = false;
    let reason = "";

    // Rule: ONLY Closed Won
    if (opp.stage !== Stage.ClosedWon) {
      isExcluded = true;
      reason = "Stage is not Closed Won";
    }
    // Rule: IGNORE Extension, Variable, Pool of Funds
    else if ([OppType.Extension, OppType.Variable, OppType.PoolOfFunds].includes(opp.type)) {
      isExcluded = true;
      reason = `Type is ${opp.type}`;
    }
    // Rule: IGNORE $0.00 MRR
    else if (opp.amount <= 0) {
      isExcluded = true;
      reason = "MRR is $0.00";
    }

    if (isExcluded) {
      result.excluded.push({ opp, reason });
    } else {
      validForConsideration.push(opp);
    }
  });

  // 2. Find the Base
  const baseCandidates = validForConsideration.filter(opp => 
    [OppType.Renewal, OppType.NewTerm, OppType.UpsellSelfServe, OppType.NewBusiness].includes(opp.type)
  );

  if (baseCandidates.length > 0) {
    // Sort by Close Date descending to find the latest
    baseCandidates.sort((a, b) => new Date(b.closeDate).getTime() - new Date(a.closeDate).getTime());
    result.baseOpp = baseCandidates[0];
    
    // Add unused base candidates to excluded (conceptually they are ignored for calculation)
    for(let i=1; i<baseCandidates.length; i++) {
        result.excluded.push({ opp: baseCandidates[i], reason: "Older Base Opportunity" });
    }
  }

  // 3. Add Amendments
  if (result.baseOpp) {
    const baseServiceDate = new Date(result.baseOpp.serviceDate).getTime();

    const amendmentCandidates = validForConsideration.filter(opp => 
      [OppType.InsertionOrder, OppType.Amendment].includes(opp.type)
    );

    amendmentCandidates.forEach(opp => {
      const oppServiceDate = new Date(opp.serviceDate).getTime();
      
      // Rule: ONLY include if Service Date > Base Service Date
      if (oppServiceDate > baseServiceDate) {
        result.validAmendments.push(opp);
      } else {
        result.excluded.push({ opp, reason: "Service Date not after Base Service Date" });
      }
    });
  } else {
      // If no base is found, everything else is excluded effectively
      const amendmentCandidates = validForConsideration.filter(opp => 
        [OppType.InsertionOrder, OppType.Amendment].includes(opp.type)
      );
      amendmentCandidates.forEach(opp => result.excluded.push({ opp, reason: "No valid Base found" }));
  }

  // 4. Final Math
  const baseAmount = result.baseOpp ? result.baseOpp.amount : 0;
  const amendmentAmount = result.validAmendments.reduce((sum, opp) => sum + opp.amount, 0);

  result.mrr = baseAmount + amendmentAmount;
  result.acv = result.mrr * 12;

  return result;
};
