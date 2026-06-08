import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, ChevronLeft, RotateCcw, PenSquare, Download, CheckCircle } from 'lucide-react';
import { SocraticExercise, SocraticStage } from '../types';

const SOCRATIC_STAGES: SocraticStage[] = [
  {
    id: 1,
    question: "Formulate the Limiting Belief",
    placeholder: "e.g., 'If I launch my business and fail, my reputation will be ruined and I will be deemed a total amateur.'",
    field: "limitingBelief"
  },
  {
    id: 2,
    question: "Cross-Examine the Objective Evidence",
    placeholder: "What real, unshakeable evidence supports this fear? Separate catastrophic imagination from provable legal or physical facts.",
    field: "evidenceFor"
  },
  {
    id: 3,
    question: "Assemble the Defiant Counter-evidence",
    placeholder: "Name at least three exceptions. When have you survived failure? Who has failed publicly and emerged wiser or widely respected?",
    field: "evidenceAgainst"
  },
  {
    id: 4,
    question: "Extract the Socratic Integration",
    placeholder: "Write a pragmatic, rational synthesis. Reframe 'ruin' into 'instructive trial' and draft one concrete next step.",
    field: "alternativeInterpretation"
  }
];

export default function SocraticReframing() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [formData, setFormData] = useState<SocraticExercise>({
    limitingBelief: '',
    evidenceFor: '',
    evidenceAgainst: '',
    alternativeInterpretation: '',
    rationalAction: ''
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const stage = SOCRATIC_STAGES[currentStageIndex];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [stage.field]: e.target.value
    }));
  };

  const handleNext = () => {
    if (currentStageIndex < SOCRATIC_STAGES.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setFormData({
      limitingBelief: '',
      evidenceFor: '',
      evidenceAgainst: '',
      alternativeInterpretation: '',
      rationalAction: ''
    });
    setCurrentStageIndex(0);
    setIsCompleted(false);
  };

  const downloadSocraticSheet = () => {
    const text = `======================================================
SOCRATIC DIALOGUE REFRAMING SHEET - PRACTICAL PHILOSOPHY
======================================================

1. THE RIGID BELIEF:
"${formData.limitingBelief}"

2. COGNITIVE CROSS-EXAMINATION (EVIDENCE FOR):
"${formData.evidenceFor}"

3. COGNITIVE ANTIDOTE (EVIDENCE AGAINST / EXCEPTIONS):
"${formData.evidenceAgainst}"

4. INTEGRATED PRACTICAL ROADMAP:
"${formData.alternativeInterpretation}"

======================================================
"An unexamined life is not worth living." - Socrates
======================================================`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Socratic_Reframing_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="socratic-reframing-widget" className="bg-[#FAF8F5] border-2 border-[#d6cebf] rounded-xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#d6cebf] pb-4 mb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#8c7e6d] font-semibold">Practical Exercise II</span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-[#2c2a27] mt-1">Socratic Self-Examination</h3>
        </div>
        {!isCompleted && (
          <div className="flex items-center gap-1.5 mt-2 md:mt-0 font-mono text-xs text-[#57534E]">
            <span>Stage:</span>
            <div className="flex gap-1">
              {SOCRATIC_STAGES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] font-bold ${
                    i === currentStageIndex
                      ? 'bg-[#5a5a40] text-white border-[#5a5a40]'
                      : i < currentStageIndex
                      ? 'bg-[#8c7e6d] text-white border-[#8c7e6d]'
                      : 'border-[#d6cebf] text-[#777]'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key={currentStageIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#8c7e6d] font-semibold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Stage {stage.id} Question
              </span>
              <h4 className="font-display text-lg md:text-xl font-bold text-[#2c2a27]">
                {stage.question}
              </h4>
            </div>

            <textarea
              id={`textarea-socratic-${stage.field}`}
              value={formData[stage.field] || ''}
              onChange={handleInputChange}
              placeholder={stage.placeholder}
              rows={5}
              className="w-full p-4 border border-[#d6cebf] rounded-lg bg-white font-serif text-[#2c2a27] placeholder-[#A8A29E] focus:outline-none focus:ring-1 focus:ring-[#5a5a40] focus:border-[#5a5a40] transition shadow-inner leading-relaxed text-sm md:text-base resize-none"
            />

            <div className="flex justify-between items-center pt-2 border-t border-[#d6cebf]">
              <button
                id="btn-socratic-back"
                onClick={handleBack}
                disabled={currentStageIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2 border border-[#d6cebf] text-sm font-medium text-[#57534E] rounded hover:border-[#2c2a27] hover:text-[#2c2a27] transition-colors cursor-pointer ${
                  currentStageIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <button
                id="btn-socratic-next"
                onClick={handleNext}
                disabled={!formData[stage.field]?.trim()}
                className={`flex items-center gap-1.5 px-5 py-2.5 bg-[#5a5a40] hover:bg-[#434330] text-[#f5f2ed] text-sm font-semibold rounded shadow-sm transition cursor-pointer ${
                  !formData[stage.field]?.trim() ? 'opacity-50 cursor-not-allowed bg-stone-400' : ''
                }`}
              >
                {currentStageIndex === SOCRATIC_STAGES.length - 1 ? 'Complete Dialogue' : 'Proceed Forward'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-900">
              <CheckCircle className="w-6 h-6 shrink-0 text-emerald-600" />
              <div>
                <h4 className="font-display font-bold text-base">Elenchus Session Compiled Successful</h4>
                <p className="text-xs text-emerald-700 font-serif">You have subjected this conceptual belief to structural investigation. Observe the summary below.</p>
              </div>
            </div>

            <div className="border border-[#d6cebf] divide-y divide-[#d6cebf] rounded-xl overflow-hidden shadow-sm bg-white font-serif text-sm md:text-base">
              <div className="p-4 bg-[#FAF8F5]">
                <span className="font-mono text-xs uppercase text-[#8c7e6d] font-bold block mb-1">1. The Absolute Supposition</span>
                <p className="text-[#2c2a27] italic">"{formData.limitingBelief}"</p>
              </div>
              <div className="p-4">
                <span className="font-mono text-xs uppercase text-[#57534E] block mb-1">2. Core Underlying Premises & Support</span>
                <p className="text-[#444] whitespace-pre-line">{formData.evidenceFor}</p>
              </div>
              <div className="p-4 bg-[#FAF8F5]">
                <span className="font-mono text-xs uppercase text-[#57534E] block mb-1">3. Structural Refutations of the Premise</span>
                <p className="text-[#444] whitespace-pre-line">{formData.evidenceAgainst}</p>
              </div>
              <div className="p-4">
                <span className="font-mono text-xs uppercase text-[#8c7e6d] font-bold block mb-1">4. Elegant Reframed Path forward</span>
                <p className="text-[#2c2a27] font-medium leading-relaxed">"{formData.alternativeInterpretation}"</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-end">
              <button
                id="btn-socratic-reset"
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 px-4 py-2 border border-[#d6cebf] text-[#57534E] hover:text-[#2c2a27] hover:border-[#2c2a27] rounded-md text-sm font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Begin New Dialogue
              </button>
              <button
                id="btn-socratic-download"
                onClick={downloadSocraticSheet}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#5a5a40] hover:bg-[#434330] text-white rounded-md text-sm font-bold shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Reflection File
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
