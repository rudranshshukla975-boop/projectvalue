import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scroll, Bookmark, Sparkles, BookOpen, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { SYLLABUS_WEEKS } from '../data';
import { DiscussionPrompt } from '../types';

export default function SyllabusSection() {
  const [expandedWeek, setExpandedWeek] = useState<string | null>('week1');

  const toggleWeek = (id: string) => {
    setExpandedWeek(prev => (prev === id ? null : id));
  };

  return (
    <div id="syllabus-container" className="space-y-8">
      {/* Decorative Classical Heading Accent */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="h-[1px] w-12 bg-[#8c7e6d]"></div>
          <Scroll className="w-5 h-5 text-[#8c7e6d]" />
          <div className="h-[1px] w-12 bg-[#8c7e6d]"></div>
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-extrabold text-[#2c2a27] tracking-tight">Syllabus of Active Practice</h2>
        <p className="font-serif text-[#57534E] text-xs md:text-sm italic">
          Every lesson focuses on concrete mental frameworks that produce deliberate changes in daily actions.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {SYLLABUS_WEEKS.map((item, index) => {
          const isExpanded = expandedWeek === item.id;
          return (
            <div
              key={item.id}
              className={`border border-[#d6cebf] bg-[#FAF8F5] rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                isExpanded ? 'ring-1 ring-[#5a5a40] bg-[#FAF8F5]' : 'hover:bg-[#fcfbfa]'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                id={`btn-toggle-week-${item.id}`}
                onClick={() => toggleWeek(item.id)}
                className="w-full p-5 md:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="mt-1 shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded border border-[#d6cebf] bg-white text-[#5a5a40] font-mono text-xs font-bold shadow-inner">
                    <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] -mb-1">Wk</span>
                    <span>{item.week}</span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c7e6d] font-bold">
                      {item.frameworkName}
                    </span>
                    <h3 className="font-display text-base md:text-xl font-bold text-[#2c2a27] hover:text-[#5a5a40] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 mt-2 bg-white p-1 rounded-full border border-[#d6cebf] text-[#57534E]">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 md:px-8 border-t border-[#d6cebf] pt-5 space-y-5 bg-white">
                      {/* Quote Panel */}
                      <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#d6cebf] relative overflow-hidden">
                        <Quote className="absolute right-3 top-3 w-16 h-16 opacity-[0.04] text-[#5a5a40]" />
                        <p className="font-serif italic text-sm md:text-base text-[#2c2a27] leading-relaxed relative z-10">
                          “{item.quote}”
                        </p>
                        <span className="font-mono text-[10px] text-[#5a5a40] uppercase tracking-wider block mt-2 text-right">
                          — {item.attribution}
                        </span>
                      </div>

                      {/* Framework Goal */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                        <div className="space-y-1.5">
                          <h4 className="font-mono text-xs uppercase tracking-wide text-[#5a5a40] font-bold flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" /> Concept & Core Aim
                          </h4>
                          <p className="font-serif text-xs md:text-sm text-[#444] leading-relaxed">
                            {item.promptText}
                          </p>
                        </div>

                        <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-[#d6cebf] pt-4 md:pt-0 md:pl-5">
                          <h4 className="font-mono text-xs uppercase tracking-wide text-[#8c7e6d] font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Weekly Practical Drill
                          </h4>
                          <div>
                            <h5 className="font-display font-semibold text-xs md:text-sm text-[#2c2a27]">
                              {item.exerciseTitle}
                            </h5>
                            <p className="font-serif text-xs md:text-sm text-[#57534E] leading-relaxed mt-1">
                              {item.exerciseDescription}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CTA inside Syllabus pointing to student Portal */}
                      <div className="pt-2">
                        <div className="w-full flex justify-end">
                          <span className="font-mono text-[10px] uppercase font-bold text-[#d6cebf] tracking-widest">
                            Exclusive Material Locked for Tuition Members
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
