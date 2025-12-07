import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data';
import { Trophy, ArrowRight } from 'lucide-react';

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(QUIZ_QUESTIONS.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = answers.reduce((acc, curr, idx) => {
    return curr === QUIZ_QUESTIONS[idx].correct ? acc + 1 : acc;
  }, 0);

  const resetQuiz = () => {
    setAnswers(new Array(QUIZ_QUESTIONS.length).fill(-1));
    setSubmitted(false);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Knowledge Check</h2>
        <p className="text-slate-600">Test your understanding of the MRR calculation rules.</p>
      </div>

      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, qIdx) => (
          <div key={qIdx} className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-medium text-lg text-slate-900 mb-4">{qIdx + 1}. {q.question}</h3>
            <div className="space-y-2">
              {q.options.map((option, oIdx) => {
                let btnClass = "w-full text-left p-3 rounded-lg border transition-all ";
                
                if (submitted) {
                  if (oIdx === q.correct) {
                    btnClass += "bg-green-100 border-green-500 text-green-900 font-medium";
                  } else if (answers[qIdx] === oIdx && oIdx !== q.correct) {
                    btnClass += "bg-red-100 border-red-500 text-red-900";
                  } else {
                    btnClass += "bg-slate-50 border-transparent text-slate-400";
                  }
                } else {
                  if (answers[qIdx] === oIdx) {
                    btnClass += "bg-blue-50 border-blue-500 text-blue-900 font-medium";
                  } else {
                    btnClass += "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    className={btnClass}
                    disabled={submitted}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={answers.includes(-1)}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:shadow-none"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="bg-slate-900 text-white p-8 rounded-2xl text-center space-y-4 animate-in zoom-in duration-300">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto" />
          <div>
            <h3 className="text-2xl font-bold">You scored {score} / {QUIZ_QUESTIONS.length}</h3>
            <p className="text-slate-400">
              {score === QUIZ_QUESTIONS.length ? "Perfect score! You're an MRR master." : "Good effort! Review the learning materials and try again."}
            </p>
          </div>
          <button 
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 px-6 py-2 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
          >
            Try Again <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
