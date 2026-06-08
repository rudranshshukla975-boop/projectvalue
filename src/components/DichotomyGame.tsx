import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ShieldAlert, Award, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { DICHOTOMY_GAME_ITEMS } from '../data';
import { DichotomyItem } from '../types';

export default function DichotomyGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'control' | 'no-control' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ item: DichotomyItem; selected: 'control' | 'no-control'; correct: boolean }[]>([]);

  const currentItem = DICHOTOMY_GAME_ITEMS[currentIndex];

  const handleChoice = (choice: 'control' | 'no-control') => {
    if (selectedCategory !== null) return;
    
    setSelectedCategory(choice);
    const isCorrect = choice === currentItem.correctCategory;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setUserAnswers(prev => [...prev, { item: currentItem, selected: choice, correct: isCorrect }]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedCategory(null);
    setShowExplanation(false);
    if (currentIndex < DICHOTOMY_GAME_ITEMS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedCategory(null);
    setShowExplanation(false);
    setScore(0);
    setGameFinished(false);
    setUserAnswers([]);
  };

  return (
    <div id="dichotomy-game-widget" className="bg-[#FAF8F5] border-2 border-[#d6cebf] rounded-xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#d6cebf] pb-4 mb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#8c7e6d] font-semibold">Practical Exercise I</span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-[#2c2a27] mt-1">Stoic Dichotomy of Control</h3>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0 bg-[#e4dfd5] px-3 py-1 rounded-md border border-[#d6cebf]">
          <span className="font-mono text-xs text-[#57534E]">Progress:</span>
          <span className="font-mono text-sm font-bold text-[#2c2a27]">
            {gameFinished ? DICHOTOMY_GAME_ITEMS.length : currentIndex + 1} / {DICHOTOMY_GAME_ITEMS.length}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!gameFinished ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 bg-white border border-[#d6cebf] rounded-lg shadow-inner flex gap-4 min-h-[140px]">
              <span className="text-3xl select-none text-[#5a5a40] font-serif">“</span>
              <p className="font-serif text-lg md:text-xl text-[#2c2a27] italic leading-relaxed pt-2">
                {currentItem.text}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                id="btn-choice-control"
                onClick={() => handleChoice('control')}
                disabled={selectedCategory !== null}
                className={`py-4 px-6 border-2 rounded-lg text-left transition-all duration-300 flex items-center justify-between group ${
                  selectedCategory === null
                    ? 'border-[#d6cebf] text-[#2c2a27] hover:bg-[#e4dfd5] hover:border-[#5a5a40] active:transform active:scale-[0.99] cursor-pointer'
                    : selectedCategory === 'control'
                    ? currentItem.correctCategory === 'control'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium shadow-sm'
                      : 'bg-rose-50 border-rose-500 text-rose-900'
                    : currentItem.correctCategory === 'control'
                    ? 'border-emerald-300 opacity-60'
                    : 'opacity-40 border-[#E5E5E5]'
                }`}
              >
                <div>
                  <h4 className="font-display font-semibold text-base">Within My Sovereign Power</h4>
                  <p className="text-xs text-[#57534E] mt-1 pr-4">My actions, my values, my responses, and my attention.</p>
                </div>
                {selectedCategory !== null && currentItem.correctCategory === 'control' && (
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {selectedCategory === 'control' && aktuelleResponseCorrect('control') === false && (
                  <X className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>

              <button
                id="btn-choice-no-control"
                onClick={() => handleChoice('no-control')}
                disabled={selectedCategory !== null}
                className={`py-4 px-6 border-2 rounded-lg text-left transition-all duration-300 flex items-center justify-between group ${
                  selectedCategory === null
                    ? 'border-[#d6cebf] text-[#2c2a27] hover:bg-[#e4dfd5] hover:border-[#5a5a40] active:transform active:scale-[0.99] cursor-pointer'
                    : selectedCategory === 'no-control'
                    ? currentItem.correctCategory === 'no-control'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium shadow-sm'
                      : 'bg-rose-50 border-rose-500 text-rose-900'
                    : currentItem.correctCategory === 'no-control'
                    ? 'border-emerald-300 opacity-60'
                    : 'opacity-40 border-[#E5E5E5]'
                }`}
              >
                <div>
                  <h4 className="font-display font-semibold text-base font-primary">Outside My Control</h4>
                  <p className="text-xs text-[#57534E] mt-1 pr-4">Others' opinions, raw luck, weather, biological systems, and global events.</p>
                </div>
                {selectedCategory !== null && currentItem.correctCategory === 'no-control' && (
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {selectedCategory === 'no-control' && aktuelleResponseCorrect('no-control') === false && (
                  <X className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-[#FAF8F5] border border-[#d6cebf] rounded-lg p-5 mt-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  {selectedCategory === currentItem.correctCategory ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      <Sparkles className="w-3 h-3" /> Absolute Truth
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                      <AlertCircle className="w-3 h-3" /> Illusory Grasp
                    </span>
                  )}
                  <span className="font-mono text-xs text-[#5a5a40] uppercase tracking-wide">Classical Deconstruction</span>
                </div>
                <p className="font-serif text-[#2c2a27] text-sm md:text-base leading-relaxed">
                  {currentItem.explanation}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    id="btn-next-dichotomy"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-5 py-2 bg-[#5a5a40] hover:bg-[#434330] text-[#f5f2ed] rounded-md text-sm font-medium font-serif transition-colors shadow-sm cursor-pointer"
                  >
                    Next Contemplation
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-6"
          >
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-[#f5f2ed] border-2 border-[#d6cebf] text-[#5a5a40] mb-2">
              <Award className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-display text-2xl font-bold text-[#2c2a27]">Sovereign Alignment Complete</h4>
              <p className="text-sm text-[#57534E] max-w-md mx-auto">
                You correctly evaluated <span className="font-bold text-[#5a5a40]">{score} out of {DICHOTOMY_GAME_ITEMS.length}</span> circumstances. 
                You are beginning to separate internal judgment from external fate.
              </p>
            </div>

            <div className="max-w-md mx-auto bg-white border border-[#d6cebf] rounded-lg p-4 text-left divide-y divide-[#d6cebf]">
              {userAnswers.map((ua, index) => (
                <div key={index} className="py-2.5 flex justify-between items-center text-xs gap-4">
                  <span className="font-serif text-[#2c2a27] truncate max-w-[280px]">
                    {ua.item.text}
                  </span>
                  <span className={`px-2 py-0.5 rounded uppercase font-mono font-semibold shrink-0 ${
                    ua.correct ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                  }`}>
                    {ua.correct ? 'Aligned' : 'Attached'}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                id="btn-reset-dichotomy"
                onClick={resetGame}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#d6cebf] text-[#57534E] hover:text-[#5a5a40] hover:border-[#5a5a40] rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Recalibrate Mind
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  function aktuelleResponseCorrect(category: 'control' | 'no-control') {
    return selectedCategory !== null && currentItem.correctCategory === category;
  }
}
