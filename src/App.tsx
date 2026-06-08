import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Scroll, Award, Sparkles, BookOpen, Quote, Shield, 
  HelpCircle, CreditCard, ChevronRight, Lock, Unlock, Mail, 
  CheckCircle, ArrowRight, NotebookPen, Landmark, HardHat
} from 'lucide-react';
import { CLASSIC_QUOTES, COURSE_COHORT_DETAILS } from './data';
import SyllabusSection from './components/SyllabusSection';
import DichotomyGame from './components/DichotomyGame';
import SocraticReframing from './components/SocraticReframing';
import PragmaticMatrix from './components/PragmaticMatrix';
import StudentPortal from './components/StudentPortal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'toolkits' | 'portal'>('overview');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [simulatedPurchaseEmail, setSimulatedPurchaseEmail] = useState('');
  const [purchased, setPurchased] = useState(false);
  const [activeToolkit, setActiveToolkit] = useState<'dichotomy' | 'socratic' | 'pragmatic'>('dichotomy');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Quote rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % CLASSIC_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Sync purchase status if someone logs in / registers in the portal
  useEffect(() => {
    const savedUser = localStorage.getItem('philosophy_active_user');
    if (savedUser) {
      setPurchased(true);
    }
  }, [activeTab]);

  const handleSimulatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedPurchaseEmail.trim() || !simulatedPurchaseEmail.includes('@')) return;

    // Simulate cohort purchase logs
    const usersRaw = localStorage.getItem('philosophy_registered_users') || "{}";
    let users = JSON.parse(usersRaw);
    const emailKey = simulatedPurchaseEmail.toLowerCase().trim();
    
    if (!users[emailKey]) {
      // Auto-register them
      users[emailKey] = {
        name: emailKey.split('@')[0].toUpperCase(),
        joinedAt: 'June 2026',
        pass: 'wisdom'
      };
      localStorage.setItem('philosophy_registered_users', JSON.stringify(users));
    }

    // Auth immediately
    const admittedUser = {
      email: emailKey,
      name: users[emailKey].name,
      joinedAt: 'June 2026'
    };
    
    localStorage.setItem('philosophy_active_user', JSON.stringify(admittedUser));
    
    setPurchased(true);
    setTimeout(() => {
      setActiveTab('portal');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] flex flex-col text-[#2c2a27] selection:bg-[#ebd9c5] selection:text-[#5a5a40]">
      
      {/* Decorative top header line */}
      <div className="h-1 bg-gradient-to-r from-[#5a5a40] via-[#8c7e6d] to-[#2c2a27]"></div>

      {/* Philosophy Header Bar */}
      <header className="border-b border-[#d6cebf] bg-[#FAF8F5] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Landmark className="w-6 h-6 text-[#5a5a40] shrink-0" />
            <div className="leading-tight">
              <span className="font-display font-black text-base md:text-xl tracking-wider text-[#2c2a27]">
                ATTIKÉ ACADEME
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#8c7e6d] block h-3">
                Socrates' Guild of Active Conduct
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 font-serif text-sm">
            <button
              id="nav-btn-overview"
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#5a5a40] text-[#f5f2ed]' : 'text-[#57534E] hover:text-[#2c2a27] hover:bg-[#e4dfd5]'
              }`}
            >
              🏛️ Forum Core
            </button>
            <button
              id="nav-btn-syllabus"
              onClick={() => setActiveTab('syllabus')}
              className={`px-4 py-2 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === 'syllabus' ? 'bg-[#5a5a40] text-[#f5f2ed]' : 'text-[#57534E] hover:text-[#2c2a27] hover:bg-[#e4dfd5]'
              }`}
            >
              📜 Syllabus & Drills
            </button>
            <button
              id="nav-btn-toolkits"
              onClick={() => setActiveTab('toolkits')}
              className={`px-4 py-2 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === 'toolkits' ? 'bg-[#5a5a40] text-[#f5f2ed]' : 'text-[#57534E] hover:text-[#2c2a27] hover:bg-[#e4dfd5]'
              }`}
            >
              ⚔️ Active Toolkits
            </button>
            <button
              id="nav-btn-portal"
              onClick={() => setActiveTab('portal')}
              className={`px-4 py-2.5 rounded-md font-semibold font-display tracking-wide border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'portal'
                  ? 'bg-[#2c2a27] text-white border-[#2c2a27] shadow-sm'
                  : 'border-[#d6cebf] bg-[#fcfbfa] text-[#5a5a40] hover:bg-[#e4dfd5]'
              }`}
            >
              <Unlock className="w-3.5 h-3.5" /> Scholar Portal
            </button>
          </nav>

          {/* Mobile Navigation trigger button */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg border border-[#d6cebf] hover:bg-[#e4dfd5]"
          >
            <span className="font-mono text-xs uppercase font-bold text-[#5a5a40]">Menu</span>
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#d6cebf] bg-[#FAF8F5] py-3 px-4 flex flex-col gap-2 font-serif text-sm shadow-inner"
            >
              <button
                id="mob-btn-overview"
                onClick={() => { setActiveTab('overview'); setIsMenuOpen(false); }}
                className={`py-2 px-4 rounded text-left font-semibold ${
                  activeTab === 'overview' ? 'bg-[#5a5a40] text-[#f5f2ed]' : 'text-[#57534E]'
                }`}
              >
                🏛️ Forum Core
              </button>
              <button
                id="mob-btn-syllabus"
                onClick={() => { setActiveTab('syllabus'); setIsMenuOpen(false); }}
                className={`py-2 px-4 rounded text-left font-semibold ${
                  activeTab === 'syllabus' ? 'bg-[#5a5a40] text-[#f5f2ed]' : 'text-[#57534E]'
                }`}
              >
                📜 Syllabus & Drills
              </button>
              <button
                id="mob-btn-toolkits"
                onClick={() => { setActiveTab('toolkits'); setIsMenuOpen(false); }}
                className={`py-2 px-4 rounded text-left font-semibold ${
                  activeTab === 'toolkits' ? 'bg-[#5a5a40] text-[#f5f2ed]' : 'text-[#57534E]'
                }`}
              >
                ⚔️ Active Toolkits
              </button>
              <button
                id="mob-btn-portal"
                onClick={() => { setActiveTab('portal'); setIsMenuOpen(false); }}
                className={`py-2 px-4 rounded text-left font-semibold border border-[#d6cebf] bg-[#fcfbfa] text-[#5a5a40] font-display flex items-center gap-1.5`}
              >
                <Unlock className="w-3.5 h-3.5" /> Scholar Portal Access
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Philosophy Stage Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full space-y-12">
        
        {/* Upper Broadside Manuscript Quote Banner */}
        <div id="classical-quote-banner" className="border-2 border-[#d6cebf] bg-[#FAF8F5] p-6 rounded-2xl relative shadow-inner overflow-hidden max-w-4xl mx-auto">
          <div className="absolute top-2 left-4 font-mono text-[9px] uppercase tracking-widest text-[#8c7e6d] font-bold select-none">
            Weekly Attiké Wisdom Scroll
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="py-4 text-center space-y-3"
            >
              <p className="font-serif italic text-base md:text-xl text-[#2c2a27] leading-relaxed select-text">
                “{CLASSIC_QUOTES[quoteIndex].text}”
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="w-6 h-px bg-[#d6cebf]"></span>
                <span className="font-display font-medium text-[11px] md:text-xs text-[#5a5a40] tracking-widest uppercase">
                  {CLASSIC_QUOTES[quoteIndex].author}
                </span>
                <span className="text-stone-400 text-[10px] italic">({CLASSIC_QUOTES[quoteIndex].context})</span>
                <span className="w-6 h-px bg-[#d6cebf]"></span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick cycle dots */}
          <div className="flex justify-center gap-1.5 mt-2">
            {CLASSIC_QUOTES.map((_, idx) => (
              <button
                id={`btn-quote-dot-${idx}`}
                key={idx}
                onClick={() => setQuoteIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === quoteIndex ? 'bg-[#5a5a40] w-4' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Core Screen Router Container */}
        <div className="space-y-8 animate-fade-in">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: COURSE OVERVIEW & INTRO */}
            {activeTab === 'overview' && (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-12"
              >
                {/* Hero Broadside Layout */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#d6cebf] px-3.5 py-1 rounded-full text-xs font-mono font-bold text-[#5a5a40]">
                    <Sparkles className="w-3.5 h-3.5" /> THE AGORA ENTRANCE OPEN
                  </div>
                  <h1 className="font-display text-4xl md:text-6xl font-black text-[#2c2a27] tracking-tight leading-none">
                    PRACTICAL PHILOSOPHY
                  </h1>
                  <p className="font-serif italic text-lg md:text-xl text-[#5a5a40] leading-relaxed max-w-2xl mx-auto">
                    Not a play of words, but a blueprint for existence. Establish your inner citadel.
                  </p>
                  <p className="font-serif text-sm md:text-base text-[#57534E] leading-relaxed max-w-2xl mx-auto">
                    Syllabi across universities reduce wisdom to grammatical debates and archival terminology. This seminar rejects sterile commentary. We look back to Epictetus, William James, and Socrates to build robust daily psychological frameworks.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      id="btn-hero-explore-syllabus"
                      onClick={() => setActiveTab('syllabus')}
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#5a5a40] hover:bg-[#434330] text-white font-serif font-bold text-base rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Inspect Course Syllabus <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      id="btn-hero-test-toolkits"
                      onClick={() => setActiveTab('toolkits')}
                      className="w-full sm:w-auto px-6 py-3.5 bg-white border-2 border-[#d6cebf] hover:border-[#2c2a27] text-[#2c2a27] font-serif font-bold text-base rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Try Free Interactive Tools
                    </button>
                  </div>
                </div>

                {/* Practical vs Academic Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <div className="border border-[#d6cebf] bg-white rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-700 font-serif font-bold flex items-center justify-center border border-rose-200">
                      ✗
                    </div>
                    <div>
                      <h3 className="font-display font-black text-lg md:text-xl text-stone-800">Abstract "Academic" Play of Words</h3>
                      <p className="font-serif text-xs md:text-sm text-stone-500 mt-1">What students are commonly fed inside bureaucratic lecture structures:</p>
                    </div>
                    <ul className="space-y-2 font-serif text-xs md:text-sm text-stone-600 list-disc list-inside">
                      <li>Memorizing year-of-birth lists and dead historical sub-categories.</li>
                      <li>Translating phrases to satisfy linguistic semantic perfection.</li>
                      <li>Zero demand for daily moral courage or personal application.</li>
                      <li>Sterile essays graded on formatting guidelines, not virtuous conduct.</li>
                    </ul>
                  </div>

                  <div className="border-2 border-[#d6cebf] bg-[#FAF8F5] rounded-2xl p-6 md:p-8 space-y-4 shadow-md">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 font-serif font-bold flex items-center justify-center border border-emerald-200">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-display font-black text-lg md:text-xl text-[#5a5a40]">Active "Attiké" Real-Life Frameworks</h3>
                      <p className="font-serif text-xs md:text-sm text-[#5a5a40]/70 mt-1">What you inside this $49 cohort master and integrate:</p>
                    </div>
                    <ul className="space-y-2 font-serif text-xs md:text-sm text-stone-800 list-disc list-inside font-medium">
                      <li><strong>Sovereignty:</strong> Disregarding noise beyond direct personal control.</li>
                      <li><strong>Socratic Cross-Exam:</strong> Rigorously dismantling corporate/personal dogma.</li>
                      <li><strong>Jamesian 'Cash Value':</strong> Measuring beliefs directly via Tuesday habits.</li>
                      <li><strong>Existential Margin:</strong> Attitudinal power during physical or tragic friction.</li>
                    </ul>
                  </div>
                </div>

                {/* TUITION PRICING BED / BADGE DESIGN ($49) */}
                <div id="tuition-pricing-card" className="max-w-xl mx-auto bg-[#2c2a27] text-stone-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden border-2 border-[#8c7e6d]/30">
                  {/* Visual Gold wax seal accent absolute */}
                  <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#8c7e6d]/10 rounded-full border border-[#8c7e6d]/25 flex items-center justify-center select-none">
                    <span className="text-[#8c7e6d]/40 text-[9px] font-mono uppercase tracking-widest leading-none rotate-12">Agora Seal</span>
                  </div>

                  <div className="space-y-2 border-b border-stone-800 pb-5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#8c7e6d] font-bold block">FORCED TUITION VALUE</span>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white">Full Cohort Seat</h4>
                      <div className="text-right">
                        <span className="text-3xl md:text-4xl font-display font-bold text-[#8c7e6d]">$49</span>
                        <span className="text-[10px] text-stone-400 block font-serif leading-none mt-0.5">one-time admission</span>
                      </div>
                    </div>
                    <p className="font-serif text-xs text-stone-400 italic">
                      Everything you need to merge Stoicism, Pragmatism, and Existential reflection into physical habits.
                    </p>
                  </div>

                  {/* Pricing features included */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 font-serif text-xs">
                      <strong className="text-[#8c7e6d] uppercase font-mono text-[9px] tracking-wider block">Exclusive Downloads</strong>
                      <p className="text-stone-300">A pristine downloadable reading dossier (Marcus Aurelius, Seneca, Viktor Frankl, William James) complete with custom outlines.</p>
                    </div>
                    <div className="space-y-1.5 font-serif text-xs">
                      <strong className="text-[#8c7e6d] uppercase font-mono text-[9px] tracking-wider block">Interactive Drills</strong>
                      <p className="text-stone-300">Weekly Discussion Reflection Papers, Socratic Dialogue organizers, and a custom student portal diary that autosaves to local archives.</p>
                    </div>
                  </div>

                  {/* Payment Simulator with actual student account provision */}
                  <form onSubmit={handleSimulatePurchase} className="border-t border-stone-800 pt-5 space-y-3.5">
                    <div>
                      <label className="font-mono text-[10px] uppercase text-stone-300 font-bold block mb-1">Simulate Enrollment & Unlock Portal</label>
                      <p className="text-[10px] font-serif text-stone-400 mb-2 leading-relaxed">
                        Input your electronic email to activate your member access pass directly (Simulation of Tuition pay).
                      </p>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                          <input
                             id="purchase-input-email"
                             type="email"
                             value={simulatedPurchaseEmail}
                             onChange={e => setSimulatedPurchaseEmail(e.target.value)}
                             placeholder="athenian_citizen@mail.edu"
                             className="w-full text-xs py-2 px-3 pl-9 border border-stone-700 bg-stone-950 text-white rounded font-serif focus:outline-none focus:ring-1 focus:ring-[#5a5a40] placeholder-stone-600"
                             required
                          />
                        </div>
                        <button
                          id="btn-simulate-enrolment"
                          type="submit"
                          className="px-4 py-2 bg-[#5a5a40] hover:bg-[#434330] active:transform active:scale-[0.98] text-white font-serif font-bold text-xs rounded transition shadow-md flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          Unlock Agora Portal <Unlock className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {purchased && (
                      <div className="bg-stone-850 p-2 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono text-center rounded flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-4 h-4" /> Admission granted. Unloading access credentials and jumping to Student Portal...
                      </div>
                    )}
                  </form>
                </div>
              </motion.div>
            )}

            {/* TAB 2: FULL SYLLABUS LISTING */}
            {activeTab === 'syllabus' && (
              <motion.div
                key="tab-syllabus"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SyllabusSection />
              </motion.div>
            )}

            {/* TAB 3: SOCRATIC & STOIC TOOLKITS */}
            {activeTab === 'toolkits' && (
              <motion.div
                key="tab-toolkits"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Visual Section Intro Header */}
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#8c7e6d] font-bold">Practical Resources</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#2c2a27]">Philosophical Gymnasium</h2>
                  <p className="font-serif text-xs md:text-sm text-[#57534E] italic leading-relaxed">
                    Interactive apparatus designs created to convert ancient theories into real-time psychological conduct. Choose an apparatus.
                  </p>
                </div>

                {/* Sub-tab Tool Selector */}
                <div className="flex justify-center gap-2 border-b border-[#d6cebf] pb-4 max-w-md mx-auto">
                  <button
                    id="btn-select-toolkit-dichotomy"
                    onClick={() => setActiveToolkit('dichotomy')}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition cursor-pointer ${
                      activeToolkit === 'dichotomy' ? 'bg-[#5a5a40] text-white' : 'bg-white border border-[#d6cebf] text-[#57534E] hover:bg-[#fcfbfa]'
                    }`}
                  >
                    Ⅰ. Stoic Agency
                  </button>
                  <button
                    id="btn-select-toolkit-socratic"
                    onClick={() => setActiveToolkit('socratic')}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition cursor-pointer ${
                      activeToolkit === 'socratic' ? 'bg-[#5a5a40] text-white' : 'bg-white border border-[#d6cebf] text-[#57534E] hover:bg-[#fcfbfa]'
                    }`}
                  >
                    Ⅱ. Socratic Examination
                  </button>
                  <button
                    id="btn-select-toolkit-pragmatic"
                    onClick={() => setActiveToolkit('pragmatic')}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition cursor-pointer ${
                      activeToolkit === 'pragmatic' ? 'bg-[#5a5a40] text-white' : 'bg-white border border-[#d6cebf] text-[#57534E] hover:bg-[#fcfbfa]'
                    }`}
                  >
                    Ⅲ. Pragmatic Consequence
                  </button>
                </div>

                {/* Dynamic Apparatus Widget Loader */}
                <div className="max-w-4xl mx-auto">
                  <AnimatePresence mode="wait">
                    {activeToolkit === 'dichotomy' && (
                      <motion.div
                        key="widget-dichotomy"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        <DichotomyGame />
                      </motion.div>
                    )}
                    {activeToolkit === 'socratic' && (
                      <motion.div
                        key="widget-socratic"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        <SocraticReframing />
                      </motion.div>
                    )}
                    {activeToolkit === 'pragmatic' && (
                      <motion.div
                        key="widget-pragmatic"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        <PragmaticMatrix />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* TAB 4: MEMBER PORTAL */}
            {activeTab === 'portal' && (
              <motion.div
                key="tab-portal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-5xl mx-auto"
              >
                <StudentPortal />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

      {/* Philosophy Footer Broadside */}
      <footer className="border-t border-[#d6cebf] bg-[#FAF8F5] py-10 text-stone-650 font-serif mt-12 bg-[radial-gradient(#ebd9c5_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="font-display font-bold text-sm tracking-widest text-[#2c2a27] block">
              ATTIKÉ ACADEME COHORT SCRIPTURES
            </span>
            <p className="text-[11px] text-stone-400 italic">
              "We must not merely read of tranquility; we must construct it with deliberate Tuesday choices."
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1.5 text-[11px] text-stone-400">
            <span>© 2026 Athens Forum • Admitted Student Archives</span>
            <span className="font-mono uppercase text-[9px] tracking-wider text-[#8c7e6d]">
              Durable Browser Archives Activated
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
