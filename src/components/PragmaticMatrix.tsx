import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Milestone, Trash2, Plus, Sparkles } from 'lucide-react';
import { PragmaticOption } from '../types';

export default function PragmaticMatrix() {
  const [options, setOptions] = useState<PragmaticOption[]>([
    {
      id: 'opt-1',
      title: "Path Alpha: Accept the high-paying corporate director post.",
      consequencesShortTerm: "Wake up at 6:30 AM to respond to client Slack channels. Spend 3 hours daily inside synchronous alignment reviews.",
      consequencesLongTerm: "Financial leverage increased by 40%. Risk of specialized gold-plating. Creative writing gets deferred to weeknights.",
      cashValueRating: 3
    },
    {
      id: 'opt-2',
      title: "Path Beta: Launch independent philosophy writing bureau.",
      consequencesShortTerm: "Schedule 4 hours daily of deep distraction-free drafting. Reach out to 5 sub-stack publishers weekly for syndicate options.",
      consequencesLongTerm: "High intellectual sovereignty, variable income model. Habit of deep self-discipline forged, but elevated solipsistic anxiety.",
      cashValueRating: 5
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newShortTerm, setNewShortTerm] = useState('');
  const [newLongTerm, setNewLongTerm] = useState('');
  const [newRating, setNewRating] = useState(3);
  const [isAdding, setIsAdding] = useState(false);

  const addOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newShortTerm.trim() || !newLongTerm.trim()) return;

    const newOption: PragmaticOption = {
      id: `opt-${Date.now()}`,
      title: newTitle,
      consequencesShortTerm: newShortTerm,
      consequencesLongTerm: newLongTerm,
      cashValueRating: Number(newRating)
    };

    setOptions(prev => [...prev, newOption]);
    setNewTitle('');
    setNewShortTerm('');
    setNewLongTerm('');
    setNewRating(3);
    setIsAdding(false);
  };

  const removeOption = (id: string) => {
    setOptions(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div id="pragmatic-matrix-widget" className="bg-[#FAF8F5] border-2 border-[#d6cebf] rounded-xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#d6cebf] pb-4 mb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#8c7e6d] font-semibold">Practical Exercise III</span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-[#2c2a27] mt-1">Jamesian Pragmatic Matrix</h3>
        </div>
        <button
          id="btn-trigger-add-option"
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3 py-1.5 mt-2 md:mt-0 font-serif text-xs bg-[#5a5a40] hover:bg-[#434330] text-[#f5f2ed] rounded transition cursor-pointer"
        >
          {isAdding ? "Cancel Addition" : "Map Another Path"}
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="font-serif text-sm text-[#57534E] leading-relaxed mb-6 italic bg-white p-3 rounded border border-[#d6cebf]">
        <strong>The Pragmatic Formula:</strong> To judge between two theories or actions, William James instructs us to trace their respective "cash-value"—the definite, observable consequences of habit, behavior, and conduct they yield. If no physical difference occurs, both paths are logically identical.
      </p>

      <AnimatePresence mode="popLayout">
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={addOption}
            className="bg-white border border-[#d6cebf] p-5 rounded-lg mb-6 shadow-inner space-y-4"
          >
            <div className="border-b border-[#d6cebf] pb-2">
              <h4 className="font-display font-semibold text-[#2c2a27] text-sm">Contemplate a New Alternative Path</h4>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-[#5a5a40] block mb-1">Path Title / Major Decision</label>
              <input
                id="input-matrix-title"
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. 'Invest in an intensive masterclass' or 'Learn purely via active experiment'"
                className="w-full text-sm p-2.5 border border-[#d6cebf] rounded focus:outline-none focus:ring-1 focus:ring-[#5a5a40] font-serif"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-[#5a5a40] block mb-1">Immediate Tuesday Habits (Short-Term)</label>
                <textarea
                  id="textarea-matrix-shortterm"
                  value={newShortTerm}
                  onChange={e => setNewShortTerm(e.target.value)}
                  placeholder="What literal behavioral habits will you do at 9 AM next week?"
                  className="w-full text-xs p-2.5 border border-[#d6cebf] rounded focus:outline-none focus:ring-1 focus:ring-[#5a5a40] font-serif"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-[#5a5a40] block mb-1">Resultant Quality of Spirit (Long-Term)</label>
                <textarea
                  id="textarea-matrix-longterm"
                  value={newLongTerm}
                  onChange={e => setNewLongTerm(e.target.value)}
                  placeholder="What psychological resilience or virtue habit will this construct in 5 years?"
                  className="w-full text-xs p-2.5 border border-[#d6cebf] rounded focus:outline-none focus:ring-1 focus:ring-[#5a5a40] font-serif"
                  rows={2}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#57534E]">Pragmatic Utility ("Cash-Value"):</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      id={`btn-rating-${n}`}
                      key={n}
                      type="button"
                      onClick={() => setNewRating(n)}
                      className={`w-7 h-7 rounded border font-mono text-xs flex items-center justify-center font-bold transition-all ${
                        newRating === n
                          ? 'bg-[#5a5a40] text-white border-[#5a5a40]'
                          : 'border-[#d6cebf] text-[#57534E] hover:bg-[#fcfbfa]'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="btn-matrix-submit"
                type="submit"
                className="flex items-center gap-1 px-4 py-2 bg-[#5a5a40] hover:bg-[#434330] text-white text-xs font-semibold rounded transition"
              >
                Log Path Matrix
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {options.map((opt, i) => (
          <motion.div
            layout
            key={opt.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="border border-[#d6cebf] bg-white rounded-lg p-5 flex flex-col md:flex-row justify-between gap-6 shadow-sm relative group"
          >
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-[#e4dfd5] border border-[#d6cebf] text-[#5a5a40] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#2c2a27] text-base md:text-lg leading-snug">
                    {opt.title}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-9">
                <div className="bg-[#FAF8F5] border border-[#d6cebf] rounded p-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8c7e6d] font-bold flex items-center gap-1 mb-1.5">
                    <Scale className="w-3 h-3" /> Concrete Short-Term Actions
                  </span>
                  <p className="font-serif text-xs md:text-sm text-[#444] leading-relaxed">
                    {opt.consequencesShortTerm}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#d6cebf] rounded p-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#5a5a40] font-bold flex items-center gap-1 mb-1.5">
                    <Milestone className="w-3 h-3" /> Resultant Character Outcome
                  </span>
                  <p className="font-serif text-xs md:text-sm text-[#444] leading-relaxed">
                    {opt.consequencesLongTerm}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col justify-between items-center md:items-end border-t md:border-t-0 md:border-l border-[#d6cebf] pt-4 md:pt-0 md:pl-5 shrink-0 gap-3">
              <div className="text-left md:text-right">
                <span className="font-mono text-[9px] uppercase text-[#5a5a40] font-bold block mb-1">Pragmatic Utility Value</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <div
                      key={star}
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border ${
                        star <= opt.cashValueRating
                          ? 'bg-[#8c7e6d] text-white border-[#8c7e6d]'
                          : 'bg-stone-105 text-stone-300 border-stone-200'
                      }`}
                    >
                      {star}
                    </div>
                  ))}
                </div>
              </div>

              <button
                id={`btn-matrix-delete-${opt.id}`}
                onClick={() => removeOption(opt.id)}
                className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer md:mt-2"
                title="Discard contemplation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}

        {options.length === 0 && (
          <div className="text-center py-10 border border-dashed border-[#d6cebf] rounded-lg bg-white">
            <p className="font-serif text-[#5a5a40] italic">"No paths mapped in this matrix of action. Chart your first course of existence above."</p>
          </div>
        )}
      </div>
    </div>
  );
}
