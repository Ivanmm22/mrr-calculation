import React, { useState } from 'react';
import LearnModule from './components/LearnModule';
import PracticeMode from './components/PracticeMode';
import Quiz from './components/Quiz';

// Inline Icons to replace lucide-react
const BookOpen = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const Calculator = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
);
const GraduationCap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
);

enum Tab {
  Learn = 'learn',
  Practice = 'practice',
  Quiz = 'quiz'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Learn);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Learn: return <LearnModule />;
      case Tab.Practice: return <PracticeMode />;
      case Tab.Quiz: return <Quiz />;
      default: return <LearnModule />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight">MRR Master</h1>
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab(Tab.Learn)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === Tab.Learn ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Learn
            </button>
            <button
              onClick={() => setActiveTab(Tab.Practice)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === Tab.Practice ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" /> Practice
            </button>
            <button
              onClick={() => setActiveTab(Tab.Quiz)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === Tab.Quiz ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Quiz
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-slate-400 text-sm">
        <p>© 2024 MRR Training Module. Based on standard Deal Desk methodology.</p>
      </footer>
    </div>
  );
};

export default App;
