export enum OppType {
  Renewal = "Renewal",
  NewTerm = "New Term",
  UpsellSelfServe = "Upsell Self-Serve New",
  Extension = "Extension",
  Variable = "Variable",
  PoolOfFunds = "Pool of Funds",
  InsertionOrder = "Insertion Order",
  Amendment = "Amendment",
  NewBusiness = "New Business"
}

export enum Stage {
  ClosedWon = "Closed Won",
  Negotiation = "Negotiation",
  Prospecting = "Prospecting",
  ClosedLost = "Closed Lost"
}

export interface Opportunity {
  id: string;
  name: string;
  type: OppType;
  stage: Stage;
  amount: number; // MRR
  closeDate: string; // YYYY-MM-DD
  serviceDate: string; // YYYY-MM-DD
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  opportunities: Opportunity[];
}

export interface CalculationResult {
  baseOpp: Opportunity | null;
  validAmendments: Opportunity[];
  excluded: { opp: Opportunity; reason: string }[];
  mrr: number;
  acv: number;
}
