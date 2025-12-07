import React, { useState, useEffect } from 'react';
import { SCENARIOS } from '../data';
import { calculateMRRLogic, formatCurrency } from '../utils';
import { CalculationResult, Opportunity } from '../types';
import { Check, ChevronRight, RefreshCcw, AlertCircle } from 'lucide-react';

const PracticeMode: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userGuessMRR, setUserGuessMRR] = useState<string>('');
  
  const scenario = SCENARIOS[currentScenarioIndex];
  const [correctResult, setCorrectResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    // Calculate correct answer when scenario changes
    setCorrectResult(calculateMRRLogic(scenario.opportunities));
    setShowResults(false);
    setUserGuessMRR('');
  }, [scenario]);

  const handleNext = () => {
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else {
      setCurrentScenarioIndex(0); // Loop back
    }
  };

  const checkAnswer = () => {
    setShowResults(true);
  };

  if (!correctResult) return <div>Loading...</div>;

  const isCorrect = Math.abs(parseFloat(userGuessMRR) - correctResult.mrr) < 0.01;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Practice Scenario {scenario.id}</h2>
          <p className="text-slate-600">{scenario.title}</p>
        </div>
        <button 
          onClick={handleNext}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Next Scenario <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800">
        <strong>Context:</strong> {scenario.description}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Data Table */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b text-slate-500 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Stage</th>
                    <th className="px-6 py-3 text-right">MRR Amount</th>
                    <th className="px-6 py-3">Close Date</th>
                    <th className="px-6 py-3">Service Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scenario.opportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-900">{opp.type}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          opp.stage === 'Closed Won' ? 'bg-green-100 text-green-700' : 
                          opp.stage === 'Closed Lost' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {opp.stage}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right font-mono text-slate-700">{formatCurrency(opp.amount)}</td>
                      <td className="px-6 py-3 text-slate-600">{opp.closeDate}</td>
                      <td className="px-6 py-3 text-slate-600">{opp.serviceDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Calculator */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-800">Calculate As-Is MRR</h3>
            <p className="text-sm text-slate-500">Review the table and input your calculated Total MRR.</p>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700 uppercase">Your Answer</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                <input 
                  type="number" 
                  value={userGuessMRR}
                  onChange={(e) => setUserGuessMRR(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              onClick={checkAnswer}
              disabled={!userGuessMRR}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          </div>

          {/* Results Reveal */}
          {showResults && (
            <div className={`p-6 rounded-xl border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3 mb-4">
                {isCorrect ? (
                  <div className="bg-green-100 p-2 rounded-full"><Check className="w-5 h-5 text-green-600" /></div>
                ) : (
                  <div className="bg-red-100 p-2 rounded-full"><AlertCircle className="w-5 h-5 text-red-600" /></div>
                )}
                <div>
                  <h3 className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </h3>
                  {!isCorrect && <p className="text-sm text-red-600">Correct MRR: {formatCurrency(correctResult.mrr)}</p>}
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4 text-sm border-t pt-4 mt-2">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Base Opportunity Identified</span>
                  {correctResult.baseOpp ? (
                    <div className="flex justify-between mt-1 p-2 bg-blue-50 rounded text-blue-900 border border-blue-100">
                      <span>{correctResult.baseOpp.name}</span>
                      <span className="font-mono">{formatCurrency(correctResult.baseOpp.amount)}</span>
                    </div>
                  ) : (
                    <div className="mt-1 text-red-500 font-medium">None Found (Result is 0)</div>
                  )}
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Valid Add-ons</span>
                  {correctResult.validAmendments.length > 0 ? (
                    <div className="space-y-1 mt-1">
                      {correctResult.validAmendments.map(opp => (
                        <div key={opp.id} className="flex justify-between p-2 bg-green-50 rounded text-green-900 border border-green-100">
                          <span>{opp.name}</span>
                          <span className="font-mono">{formatCurrency(opp.amount)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-1 text-slate-500 italic px-2">None</div>
                  )}
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Excluded / Ignored</span>
                  <div className="space-y-1 mt-1">
                    {correctResult.excluded.map(({ opp, reason }) => (
                      <div key={opp.id} className="flex justify-between p-2 bg-slate-50 rounded text-slate-500 border border-slate-100 text-xs">
                        <span>{opp.name}</span>
                        <span className="italic">({reason})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                  <span className="font-bold text-slate-900">Final ACV (MRR x 12)</span>
                  <span className="font-mono font-bold text-lg text-slate-900">{formatCurrency(correctResult.acv)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeMode;
