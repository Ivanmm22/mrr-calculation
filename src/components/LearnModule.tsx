import React from 'react';

// Inline Icons
const CheckCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const XCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
);
const Filter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
const Calendar = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const Calculator = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
);

const LearnModule: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      
      {/* Intro */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800">The MRR Calculation Methodology</h2>
        <p className="text-lg text-slate-600">
          Follow this strict 4-step process to accurately calculate "As-Is" Monthly Recurring Revenue (MRR) and Annual Contract Value (ACV).
        </p>
      </section>

      {/* Steps Container */}
      <div className="grid gap-8 md:grid-cols-2">
        
        {/* Step 1: Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Filter className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Step 1: Strict Filtering</h3>
          </div>
          <p className="text-slate-600 mb-4">Before calculating anything, remove invalid opportunities.</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm">Keep only <strong>Closed Won</strong> stage.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-sm">Remove Type: <strong>Extension, Variable, Pool of Funds</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-sm">Remove opportunities with <strong>$0.00 MRR</strong>.</span>
            </li>
          </ul>
        </div>

        {/* Step 2: Base */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Step 2: Find the Base</h3>
          </div>
          <p className="text-slate-600 mb-4">Identify the foundational contract.</p>
          <div className="space-y-3 text-sm text-slate-700">
            <p>Look for these types:</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-slate-100 rounded border">Renewal</span>
              <span className="px-2 py-1 bg-slate-100 rounded border">New Term</span>
              <span className="px-2 py-1 bg-slate-100 rounded border">Upsell Self-Serve New</span>
            </div>
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
              <p className="font-medium text-yellow-800">Tie-Breaker Rule:</p>
              <p className="text-yellow-700">If multiple bases exist, pick the one with the <strong>Latest Close Date</strong>.</p>
            </div>
          </div>
        </div>

        {/* Step 3: Amendments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Step 3: Add Valid Amendments</h3>
          </div>
          <p className="text-slate-600 mb-4">Layer on add-ons that happened <em>after</em> the base started.</p>
          <ul className="space-y-3 text-sm text-slate-700">
            <li>Look for types: <strong>Insertion Order</strong> or <strong>Amendment</strong>.</li>
            <li className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong>Condition:</strong><br/>
              Amendment Service Date <span className="text-purple-600 font-bold">&gt;</span> Base Service Date
            </li>
          </ul>
        </div>

        {/* Step 4: Math */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <span className="text-xl font-bold text-green-600">$</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Step 4: Final Math</h3>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">AS-IS MRR</p>
              <div className="text-lg font-mono bg-slate-900 text-green-400 p-3 rounded">
                Base Amount + Valid Amendments
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">ACV</p>
              <div className="text-lg font-mono bg-slate-900 text-green-400 p-3 rounded">
                AS-IS MRR * 12
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Example */}
      <div className="bg-slate-800 rounded-xl p-8 text-white">
        <h3 className="text-xl font-semibold mb-6">Visual Logic Flow</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center text-sm">
          
          <div className="flex-1 bg-slate-700 p-4 rounded border border-slate-600 w-full">
            <div className="font-bold text-blue-300 mb-2">Input List</div>
            <div className="space-y-1 text-slate-400 text-xs">
              <div>Opp A (Closed Won)</div>
              <div>Opp B (Extension)</div>
              <div>Opp C ($0 MRR)</div>
            </div>
          </div>

          <div className="text-slate-500">→</div>

          <div className="flex-1 bg-slate-700 p-4 rounded border border-slate-600 w-full">
            <div className="font-bold text-yellow-300 mb-2">Filter</div>
            <div className="text-xs text-slate-300">
              Remove Opp B & C
            </div>
          </div>

          <div className="text-slate-500">→</div>

          <div className="flex-1 bg-slate-700 p-4 rounded border border-slate-600 w-full">
            <div className="font-bold text-purple-300 mb-2">Identify Base</div>
            <div className="text-xs text-slate-300">
              Find Renewal/New Term with latest Close Date
            </div>
          </div>

          <div className="text-slate-500">→</div>

          <div className="flex-1 bg-slate-700 p-4 rounded border border-slate-600 w-full">
            <div className="font-bold text-green-300 mb-2">Sum</div>
            <div className="text-xs text-slate-300">
              Base + (Amendments after Base Start)
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LearnModule;
