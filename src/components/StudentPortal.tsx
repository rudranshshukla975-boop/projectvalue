import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Key, Mail, User, ShieldCheck, LogOut, CheckSquare, Square, 
  BookOpen, Calendar, Book, FileText, Download, Check, Save, Plus, 
  TrendingUp, Compass, ArrowRight, Award, HelpCircle
} from 'lucide-react';
import { ReadingItem, DiscussionPrompt, JournalEntry, MemberUser } from '../types';
import { READING_LIST_DATA, SYLLABUS_WEEKS } from '../data';

// Helper for local storage keying per user
const getStorageKey = (email: string, suffix: string) => `philosophy_${email.replace(/[@.]/g, '_')}_${suffix}`;

export default function StudentPortal() {
  const [activeUser, setActiveUser] = useState<MemberUser | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Login / Register Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Portal Dashboard States
  const [portalTab, setPortalTab] = useState<'readings' | 'discussions' | 'journal'>('readings');
  const [readings, setReadings] = useState<ReadingItem[]>(READING_LIST_DATA);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [submittedPrompts, setSubmittedPrompts] = useState<Record<string, string>>({}); // promptId -> response text
  const [promptInput, setPromptInput] = useState('');
  const [promptMessage, setPromptMessage] = useState('');

  // Journal States
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [jTitle, setJTitle] = useState('');
  const [jText, setJText] = useState('');
  const [jCategory, setJCategory] = useState('Morning Stoic Review');

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('philosophy_active_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as MemberUser;
        setActiveUser(parsed);
        loadUserData(parsed.email);
      } catch (e) {
        localStorage.removeItem('philosophy_active_user');
      }
    }
  }, []);

  const loadUserData = (userEmail: string) => {
    // 1. Reading items checklist state
    const savedReadings = localStorage.getItem(getStorageKey(userEmail, 'readings'));
    if (savedReadings) {
      try {
        setReadings(JSON.parse(savedReadings));
      } catch (e) {}
    } else {
      setReadings(READING_LIST_DATA);
    }

    // 2. Weekly prompt submission status
    const savedSubmissions = localStorage.getItem(getStorageKey(userEmail, 'submissions'));
    if (savedSubmissions) {
      try {
        const parsed = JSON.parse(savedSubmissions);
        setSubmittedPrompts(parsed);
        if (parsed[SYLLABUS_WEEKS[0].id]) {
          setPromptInput(parsed[SYLLABUS_WEEKS[0].id]);
        }
      } catch (e) {}
    } else {
      setSubmittedPrompts({});
      setPromptInput('');
    }

    // 3. Journal Entries loading
    const savedJournal = localStorage.getItem(getStorageKey(userEmail, 'journal_v2'));
    if (savedJournal) {
      try {
        setJournalEntries(JSON.parse(savedJournal));
      } catch (e) {}
    } else {
      setJournalEntries([
        {
          id: 'ent-initial',
          title: 'Opening Contemplation',
          text: 'Today, I begin this journey. Not merely to debate words or play with abstractions, but to train my internal assent and align my character with immutable virtue. Let letters become habits.',
          category: 'Philosophy Journal',
          createdAt: new Date().toLocaleDateString('en-US')
        }
      ]);
    }
  };

  // Auth Submit Handlers
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (authMode === 'login') {
      // Find user in simulated database
      const usersRaw = localStorage.getItem('philosophy_registered_users');
      let users: Record<string, { name: string; joinedAt: string; pass: string }> = {};
      if (usersRaw) {
        try { users = JSON.parse(usersRaw); } catch(e){}
      }

      // Check default demo account too!
      if (email === 'sophia@philosophy.org' && password === 'wisdom') {
        const demoUser: MemberUser = { email, name: 'Sophia of Athens', joinedAt: 'June 2026' };
        localStorage.setItem('philosophy_active_user', JSON.stringify(demoUser));
        setActiveUser(demoUser);
        loadUserData(email);
        return;
      }

      const foundUser = users[email.toLowerCase().trim()];
      if (foundUser && foundUser.pass === password) {
        const matchedUser: MemberUser = {
          email: email.toLowerCase().trim(),
          name: foundUser.name,
          joinedAt: foundUser.joinedAt
        };
        localStorage.setItem('philosophy_active_user', JSON.stringify(matchedUser));
        setActiveUser(matchedUser);
        loadUserData(matchedUser.email);
      } else {
        setAuthError('Incorrect secret phrase/credential sequence. Try with sophia@philosophy.org & wisdom.');
      }
    } else {
      // Register logic
      if (!name.trim()) return setAuthError('State your noble name.');
      if (!email.includes('@')) return setAuthError('Provide a standard electronic email post.');
      if (password.length < 4) return setAuthError('Secret phrase must be at least 4 letters.');

      const usersRaw = localStorage.getItem('philosophy_registered_users');
      let users: Record<string, { name: string; joinedAt: string; pass: string }> = {};
      if (usersRaw) {
        try { users = JSON.parse(usersRaw); } catch(e){}
      }

      const emailKey = email.toLowerCase().trim();
      if (users[emailKey] || emailKey === 'sophia@philosophy.org') {
        return setAuthError('This email is already initiated into the Academe. Please use login.');
      }

      users[emailKey] = {
        name: name.trim(),
        joinedAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        pass: password
      };

      localStorage.setItem('philosophy_registered_users', JSON.stringify(users));
      setAuthSuccess('Registration completed! You are admitted into the forum. Logging in...');
      
      const sessionUser: MemberUser = {
        email: emailKey,
        name: name.trim(),
        joinedAt: users[emailKey].joinedAt
      };

      setTimeout(() => {
        localStorage.setItem('philosophy_active_user', JSON.stringify(sessionUser));
        setActiveUser(sessionUser);
        loadUserData(sessionUser.email);
        setAuthSuccess('');
      }, 1200);
    }
  };

  const handleShortcutLogin = () => {
    setEmail('sophia@philosophy.org');
    setPassword('wisdom');
    setAuthMode('login');
    setAuthError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('philosophy_active_user');
    setActiveUser(null);
    setEmail('');
    setPassword('');
    setName('');
  };

  // Toggle Reading Checklist Items
  const handleToggleReading = (index: number) => {
    if (!activeUser) return;
    const updated = [...readings];
    updated[index].completed = !updated[index].completed;
    setReadings(updated);
    localStorage.setItem(getStorageKey(activeUser.email, 'readings'), JSON.stringify(updated));
  };

  // Weekly Prompt submissions
  const handlePromptSelectChange = (index: number) => {
    setActivePromptIndex(index);
    const pId = SYLLABUS_WEEKS[index].id;
    setPromptInput(submittedPrompts[pId] || '');
    setPromptMessage('');
  };

  const submitWeeklyPromptResponse = () => {
    if (!activeUser) return;
    const pId = SYLLABUS_WEEKS[activePromptIndex].id;
    const updated = {
      ...submittedPrompts,
      [pId]: promptInput
    };
    setSubmittedPrompts(updated);
    localStorage.setItem(getStorageKey(activeUser.email, 'submissions'), JSON.stringify(updated));
    setPromptMessage('Your deep reflection has been permanently forged on local scrolls.');
    setTimeout(() => setPromptMessage(''), 3000);

    // Auto-create a corresponding journal entry!
    const activePrompt = SYLLABUS_WEEKS[activePromptIndex];
    const newJournal: JournalEntry = {
      id: `prompt-log-${pId}`,
      title: `Contemplation Wk ${activePrompt.week}: ${activePrompt.frameworkName}`,
      text: promptInput,
      category: 'Syllabus Submission',
      createdAt: new Date().toLocaleDateString('en-US'),
      promptId: pId
    };

    setJournalEntries(prev => {
      const filtered = prev.filter(p => p.promptId !== pId); // replace old one
      const merged = [newJournal, ...filtered];
      localStorage.setItem(getStorageKey(activeUser.email, 'journal_v2'), JSON.stringify(merged));
      return merged;
    });
  };

  // Custom free-form journaling
  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jTitle.trim() || !jText.trim() || !activeUser) return;

    const newEntry: JournalEntry = {
      id: `ent-${Date.now()}`,
      title: jTitle,
      text: jText,
      category: jCategory,
      createdAt: new Date().toLocaleDateString('en-US')
    };

    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem(getStorageKey(activeUser.email, 'journal_v2'), JSON.stringify(updated));

    setJTitle('');
    setJText('');
    setPromptMessage('Journal entry preserved in the archives.');
    setTimeout(() => setPromptMessage(''), 3000);
  };

  const handleDeleteJournal = (id: string) => {
    if (!activeUser) return;
    const filtered = journalEntries.filter(j => j.id !== id);
    setJournalEntries(filtered);
    localStorage.setItem(getStorageKey(activeUser.email, 'journal_v2'), JSON.stringify(filtered));
  };

  const downloadFullNotes = () => {
    let text = `======================================================
THE MEMOIRS & SCRIPTS OF ${activeUser?.name.toUpperCase()}
Practical Philosophy Cohort Syllabus Journal & Memoirs
======================================================\n\n`;

    text += `MEMBER: ${activeUser?.name}\n`;
    text += `JOINED ATHENS ENROLLMENT: ${activeUser?.joinedAt}\n`;
    text += `ARCHIVAL DATE: ${new Date().toLocaleDateString()}\n\n`;

    text += `--- EXCLUSIVE READING PROGRESS ---\n`;
    const finished = readings.filter(r => r.completed);
    text += `Completion rate: ${finished.length} / ${readings.length} classical works.\n`;
    finished.forEach(f => {
      text += `[X] "${f.title}" by ${f.author} (${f.practicalFramework})\n`;
    });
    readings.filter(r => !r.completed).forEach(u => {
      text += `[ ] "${u.title}" by ${u.author}\n`;
    });

    text += `\n======================================================\n`;
    text += `--- COHORT REFLECTION PAPERS & SUBMISSIONS ---\n`;
    text += `======================================================\n\n`;

    SYLLABUS_WEEKS.forEach(w => {
      text += `WEEK ${w.week}: ${w.title}\n`;
      text += `Sovereign Framework: ${w.frameworkName}\n`;
      text += `Reflection Prompt: "${w.promptText}"\n`;
      text += `Your Submission Response:\n`;
      text += submittedPrompts[w.id] 
        ? `"${submittedPrompts[w.id]}"` 
        : `[Unsubmitted - Contemplation Ongoing]`;
      text += `\n------------------------------------------------------\n\n`;
    });

    text += `\n======================================================\n`;
    text += `--- ARCHIVED FREE-FORM DAILY JOURNALS ---\n`;
    text += `======================================================\n\n`;

    journalEntries.filter(j => j.category !== 'Syllabus Submission').forEach(entry => {
      text += `Date: ${entry.createdAt} | Category: ${entry.category}\n`;
      text += `Title: ${entry.title}\n`;
      text += `Content:\n"${entry.text}"\n`;
      text += `------------------------------------------------------\n\n`;
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Philosophy_Journal_Portfolio_${activeUser?.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Metrics
  const readingsCompleted = readings.filter(r => r.completed).length;
  const submissionsCompleted = Object.keys(submittedPrompts).length;
  const journalCount = journalEntries.length;

  return (
    <div id="student-portal-wrapper" className="w-full">
      <AnimatePresence mode="wait">
        {!activeUser ? (
          /* Authentication Screen (Old school Parchment card) */
          <motion.div
            key="auth-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto bg-[#FAF6F0] border-2 border-[#D2C1A5] rounded-xl p-6 md:p-8 shadow-md"
          >
            <div className="text-center space-y-3 mb-6 border-b border-[#EADEC9] pb-5">
              <div className="mx-auto w-12 h-12 bg-[#EFE9DC] border border-[#D2C1A5] rounded-full flex items-center justify-center text-[#78350F]">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1C1917]">The Attic Archives Portal</h3>
              <p className="font-serif text-[#57534E] text-xs leading-relaxed max-w-xs mx-auto">
                Secure access gateway to private reading lists, discussion prompts, journal registries, and community syllabi.
              </p>
            </div>

            {authError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded p-3 text-xs font-serif mb-4">
                {authError}
              </div>
            )}
            {authSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded p-3 text-xs font-serif mb-4">
                {authSuccess}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#78350F] block mb-1">Your Full Name / Alias</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                    <input
                      id="auth-input-name"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Diogenes of Sinope"
                      className="w-full pl-9 p-2 text-sm border border-[#D2C1A5] bg-white rounded font-serif focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#5a5a40] block mb-1">School Post / Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    id="auth-input-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="sophia@philosophy.org"
                    className="w-full pl-9 p-2 text-sm border border-[#d6cebf] bg-white rounded font-serif focus:outline-none focus:ring-1 focus:ring-[#5a5a40]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#5a5a40] block mb-1">Access Passphrase</label>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    id="auth-input-password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="wisdom"
                    className="w-full pl-9 p-2 text-sm border border-[#d6cebf] bg-white rounded font-serif focus:outline-none focus:ring-1 focus:ring-[#5a5a40]"
                    required
                  />
                </div>
              </div>

              <button
                id="btn-auth-submit"
                type="submit"
                className="w-full py-2.5 bg-[#5a5a40] hover:bg-[#434330] text-white rounded font-serif text-sm font-semibold transition cursor-pointer shadow-sm mt-2"
              >
                {authMode === 'login' ? 'Pass Into Socratic Portals' : 'Inscribe My Name and Enroll'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#d6cebf] flex items-center justify-between text-xs font-serif text-[#57534E]">
              <span>
                {authMode === 'login' ? 'First time in the Agora?' : 'Already initiated?'}
              </span>
              <button
                id="btn-switch-auth-mode"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setAuthError('');
                  setAuthSuccess('');
                }}
                className="text-[#5a5a40] underline hover:text-[#434330] cursor-pointer"
              >
                {authMode === 'login' ? 'Register Admission' : 'Login Securely'}
              </button>
            </div>

            {/* Quick Demo Assist */}
            <div className="mt-6 p-4 bg-[#e4dfd5] border border-[#d6cebf] rounded text-center">
              <span className="font-mono text-[10px] text-[#5a5a40] uppercase block font-extrabold mb-1.5 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Fast Reviewer Entry Access
              </span>
              <p className="font-serif text-[11px] text-[#57534E] leading-relaxed mb-3">
                Tuition has been simulated. Click below to bypass secure payment gateways and enter instantly under a pre-authenticated Athenian Scholar account.
              </p>
              <button
                id="btn-fast-reviewer-login"
                onClick={handleShortcutLogin}
                className="w-full py-1.5 px-3 bg-white hover:bg-[#5a5a40] hover:text-white border border-[#d6cebf] rounded font-mono text-[11px] font-bold text-[#5a5a40] transition cursor-pointer shadow-inner"
              >
                Auto-Login: sophia@philosophy.org / wisdom
              </button>
            </div>
          </motion.div>
        ) : (
          /* Members Dashboard Interface */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full space-y-6"
          >
            {/* Header Member Banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#FAF8F5] border-2 border-[#d6cebf] rounded-xl p-5 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#d6cebf] bg-[#e4dfd5] text-[#5a5a40] font-serif font-bold text-lg flex items-center justify-center shadow-inner select-none uppercase">
                  {activeUser.name.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-[#2c2a27] text-lg md:text-xl leading-none">{activeUser.name}</h3>
                    <span className="bg-amber-100 text-[#5a5a40] font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-extrabold border border-amber-300">Scholar Member</span>
                  </div>
                  <p className="font-serif text-xs text-[#57534E] mt-1 italic">
                    Admitted in enrollment {activeUser.joinedAt} • Active Ledger
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                <button
                  id="btn-download-full-ledger"
                  onClick={downloadFullNotes}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#FAF8F5] border border-[#d6cebf] text-xs font-semibold rounded text-[#2c2a27] transition cursor-pointer"
                  title="Download readings, submissions, and journals"
                >
                  <Download className="w-3.5 h-3.5" /> Export My Journal Scrolls
                </button>
                <button
                  id="btn-logout-portal"
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-medium rounded transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Depart Agora
                </button>
              </div>
            </div>

            {/* Micro Stats Belt */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#FAF8F5] border border-[#d6cebf] rounded-xl p-3 text-center">
                <span className="font-mono text-[9px] uppercase text-[#5a5a40] block">Readings Done</span>
                <span className="font-display text-lg md:text-2xl font-bold text-[#2c2a27]">{readingsCompleted} / {readings.length}</span>
              </div>
              <div className="bg-[#FAF8F5] border border-[#d6cebf] rounded-xl p-3 text-center">
                <span className="font-mono text-[9px] uppercase text-[#8c7e6d] block">Wk Reflections</span>
                <span className="font-display text-lg md:text-2xl font-bold text-[#2c2a27]">{submissionsCompleted} / 6</span>
              </div>
              <div className="bg-[#FAF8F5] border border-[#D2C1A5] rounded-xl p-3 text-center">
                <span className="font-mono text-[9px] uppercase text-[#57534E] block">Journal Log</span>
                <span className="font-display text-lg md:text-2xl font-bold text-[#1C1917]">{journalCount}</span>
              </div>
            </div>

            {/* Portal Tab Navigation */}
            <div className="flex border-b border-[#d6cebf] overflow-x-auto gap-2">
              <button
                id="btn-portal-tab-readings"
                onClick={() => setPortalTab('readings')}
                className={`py-2 px-4 font-serif text-sm font-semibold shrink-0 border-t-2 border-x transition-colors cursor-pointer ${
                  portalTab === 'readings'
                    ? 'border-t-[#5a5a40] border-x-[#d6cebf] bg-[#FAF8F5] text-[#2c2a27]'
                    : 'border-t-transparent border-x-transparent text-[#57534E] hover:text-[#2c2a27]'
                }`}
              >
                📖 Exclusive Reading List ({readingsCompleted}/{readings.length})
              </button>
              <button
                id="btn-portal-tab-discussions"
                onClick={() => {
                  setPortalTab('discussions');
                  // Align input text with week select default
                  const defaultId = SYLLABUS_WEEKS[activePromptIndex].id;
                  setPromptInput(submittedPrompts[defaultId] || '');
                }}
                className={`py-2 px-4 font-serif text-sm font-semibold shrink-0 border-t-2 border-x transition-colors cursor-pointer ${
                  portalTab === 'discussions'
                    ? 'border-t-[#5a5a40] border-x-[#d6cebf] bg-[#FAF8F5] text-[#2c2a27]'
                    : 'border-t-transparent border-x-transparent text-[#57534E] hover:text-[#2c2a27]'
                }`}
              >
                🖋️ Discussion Prompts ({submissionsCompleted}/6)
              </button>
              <button
                id="btn-portal-tab-journal"
                onClick={() => setPortalTab('journal')}
                className={`py-2 px-4 font-serif text-sm font-semibold shrink-0 border-t-2 border-x transition-colors cursor-pointer ${
                  portalTab === 'journal'
                    ? 'border-t-[#5a5a40] border-x-[#d6cebf] bg-[#FAF8F5] text-[#2c2a27]'
                    : 'border-t-transparent border-x-transparent text-[#57534E] hover:text-[#2c2a27]'
                }`}
              >
                📓 Daily Reflection Journal ({journalCount})
              </button>
            </div>

            {/* Panel Area */}
            <div className="bg-[#FAF8F5] border-x-2 border-b-2 border-[#d6cebf] rounded-b-xl p-5 focus:outline-none">
              {portalTab === 'readings' && (
                <div id="panel-readings" className="space-y-4">
                  <div className="border-b border-[#d6cebf] pb-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-display font-extrabold text-[#2c2a27] text-lg">Downloadable Literature Works</h4>
                      <p className="font-serif text-xs text-[#57534E] italic">Check off classical texts as you complete them inside the cohort studies.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {readings.map((item, index) => (
                      <div
                        key={item.id}
                        className={`p-4 bg-white border rounded-lg shadow-sm transition-all flex gap-3 ${
                          item.completed ? 'border-emerald-200 bg-emerald-50/20' : 'border-[#d6cebf] hover:border-[#5a5a40]'
                        }`}
                      >
                        <button
                          id={`btn-checkbox-reading-${item.id}`}
                          onClick={() => handleToggleReading(index)}
                          className="mt-1 shrink-0 text-[#5a5a40] cursor-pointer"
                        >
                          {item.completed ? (
                            <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                          ) : (
                            <Square className="w-5 h-5 text-stone-300 hover:text-stone-600 shrink-0" />
                          )}
                        </button>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#e4dfd5] text-[#5a5a40] border border-[#d6cebf]">
                              {item.category}
                            </span>
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              {item.era} Era
                            </span>
                          </div>

                          <h5 className={`font-serif text-base font-bold ${item.completed ? 'line-through text-stone-400' : 'text-[#2c2a27]'}`}>
                            {item.title} <span className="text-xs font-normal text-stone-500">by {item.author}</span>
                          </h5>

                          <p className="font-serif text-xs text-[#57534E] leading-relaxed">
                            {item.description}
                          </p>

                          <div className="bg-[#FAF8F5] p-2 rounded border border-[#d6cebf] text-[11px] font-mono text-[#5a5a40]">
                            <strong>Framework:</strong> {item.practicalFramework}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portalTab === 'discussions' && (
                <div id="panel-discussions" className="space-y-4">
                  <div className="border-b border-[#d6cebf] pb-3">
                    <h4 className="font-display font-extrabold text-[#2c2a27] text-lg">Weekly Discussion Responses</h4>
                    <p className="font-serif text-xs text-[#57534E] italic">Submit your weekly thesis papers below. Submitting automatically commits thoughts to your personal journal archive.</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-5">
                    {/* Left Week Selector list */}
                    <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                      {SYLLABUS_WEEKS.map((prompt, index) => {
                        const isSubm = !!submittedPrompts[prompt.id];
                        const isActive = index === activePromptIndex;
                        return (
                          <button
                            id={`btn-select-week-prompt-${prompt.id}`}
                            key={prompt.id}
                            onClick={() => handlePromptSelectChange(index)}
                            className={`w-full text-left p-3 rounded-lg border text-xs font-serif font-semibold shrink-0 cursor-pointer flex justify-between items-center gap-2 ${
                              isActive
                                ? 'bg-[#5a5a40] border-[#5a5a40] text-white'
                                : 'bg-white border-[#d6cebf] text-[#292524] hover:bg-[#FAF8F5]'
                            }`}
                          >
                            <span className="truncate">Week {prompt.week}: {prompt.title.split(' ')[0]}</span>
                            {isSubm && (
                              <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-emerald-600'}`}></span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Active Prompt Area */}
                    <div className="flex-1 bg-white border border-[#d6cebf] rounded-xl p-5 space-y-4 shadow-sm">
                      <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#d6cebf]">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#8c7e6d]">Syllabus Week {SYLLABUS_WEEKS[activePromptIndex].week} Reflection</span>
                        <h5 className="font-display font-bold text-base text-[#2c2a27] mt-0.5">
                          {SYLLABUS_WEEKS[activePromptIndex].title}
                        </h5>
                        <p className="font-serif italic text-xs text-[#57534E] leading-relaxed mt-2 p-2 bg-[#FAF8F5] rounded border-l-2 border-[#5a5a40]">
                          "{SYLLABUS_WEEKS[activePromptIndex].promptText}"
                        </p>
                      </div>

                      {promptMessage && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-serif p-2.5 rounded">
                          {promptMessage}
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] uppercase font-bold tracking-wider text-[#5a5a40] block">Inscribe Your Reflection Paper (Required Submission)</label>
                        <textarea
                          id="textarea-weekly-reflection"
                          value={promptInput}
                          onChange={e => setPromptInput(e.target.value)}
                          placeholder="Type your philosophical insights, outcomes of daily drills, and behavioral findings..."
                          rows={6}
                          className="w-full p-4 border border-[#d6cebf] rounded-lg bg-[#FAF8F5] font-serif text-sm text-[#2c2a27] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#5a5a40] focus:bg-white resize-none"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          id="btn-weekly-prompt-submit"
                          onClick={submitWeeklyPromptResponse}
                          disabled={!promptInput.trim()}
                          className={`flex items-center gap-1.5 px-4 py-2.5 bg-[#5a5a40] hover:bg-[#434330] text-white rounded font-serif text-sm font-bold shadow-md cursor-pointer transition ${
                            !promptInput.trim() ? 'opacity-40 cursor-not-allowed bg-stone-300' : ''
                          }`}
                        >
                          <Save className="w-4 h-4" /> Commit Reflection Paper
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {portalTab === 'journal' && (
                <div id="panel-journal" className="space-y-6">
                  <div className="border-b border-[#d6cebf] pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h4 className="font-display font-extrabold text-[#2c2a27] text-lg">Daily Scholar Journal Hub</h4>
                      <p className="font-serif text-xs text-[#57534E] italic">Review weekly reflection sheets and free logs stored in your personal browser scrolls.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Form */}
                    <form onSubmit={handleAddJournal} className="bg-white border border-[#d6cebf] rounded-xl p-4 space-y-4 h-fit shadow-xs">
                      <span className="font-mono text-[10px] uppercase font-extrabold text-[#5a5a40] block border-b border-[#d6cebf] pb-1.5">Compose Log Entry</span>
                      
                      <div>
                        <label className="font-mono text-[9px] uppercase font-bold text-[#57534E] block mb-1">Title</label>
                        <input
                          id="journal-input-title"
                          type="text"
                          value={jTitle}
                          onChange={e => setJTitle(e.target.value)}
                          placeholder="e.g. Mid-day Judgment Guard"
                          className="w-full text-xs p-2 border border-[#d6cebf] rounded bg-[#FAF8F5] font-serif focus:outline-none focus:ring-1 focus:ring-[#5a5a40]"
                          required
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[9px] uppercase font-bold text-[#57534E] block mb-1">Contemplation Category</label>
                        <select
                          id="journal-select-category"
                          value={jCategory}
                          onChange={e => setJCategory(e.target.value)}
                          className="w-full text-xs p-2 border border-[#d6cebf] rounded bg-white font-serif focus:outline-none focus:ring-1 focus:ring-[#5a5a40]"
                        >
                          <option value="Morning Stoic Review">Morning Stoic Review</option>
                          <option value="Evening Review of Faults">Evening Review of Faults</option>
                          <option value="Socratic Reframing Record">Socratic Reframing Record</option>
                          <option value="Philosophy Journal">Philosophy Journal</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-mono text-[9px] uppercase font-bold text-[#57534E] block mb-1">Text Notes</label>
                        <textarea
                          id="journal-textarea-text"
                          value={jText}
                          onChange={e => setJText(e.target.value)}
                          placeholder="Inscribe thoughts on temperance, control, actions..."
                          rows={4}
                          className="w-full text-xs p-2 border border-[#d6cebf] rounded bg-[#FAF8F5] font-serif focus:outline-none focus:ring-1 focus:ring-[#5a5a40] resize-none"
                          required
                        />
                      </div>

                      <button
                        id="btn-journal-submit"
                        type="submit"
                        className="w-full py-2 bg-[#5a5a40] hover:bg-[#434330] text-white rounded font-serif text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> File Memoirs
                      </button>
                    </form>

                    {/* Right Entries List */}
                    <div className="md:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-1">
                      {journalEntries.map(entry => (
                        <div key={entry.id} className="p-4 bg-white border border-[#d6cebf] rounded-lg shadow-inner flex flex-col justify-between gap-3 relative group">
                          <div>
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                                  {entry.category}
                                </span>
                                <span className="font-mono text-[9px] text-[#A8A29E]">
                                  {entry.createdAt}
                                </span>
                              </div>
                              {entry.id !== 'ent-initial' && (
                                <button
                                  id={`btn-delete-journal-entry-${entry.id}`}
                                  onClick={() => handleDeleteJournal(entry.id)}
                                  className="text-stone-300 hover:text-rose-600 text-xs transition-colors cursor-pointer"
                                >
                                  Delete
                                </button>
                              )}
                            </div>

                            <h5 className="font-serif font-bold text-[#2c2a27] text-base mt-2">
                              {entry.title}
                            </h5>

                            <p className="font-serif text-xs md:text-sm text-[#444] leading-relaxed mt-2 whitespace-pre-line italic">
                              "{entry.text}"
                            </p>
                          </div>
                        </div>
                      ))}

                      {journalEntries.length === 0 && (
                        <div className="text-center py-12 border border-dashed border-[#d6cebf] rounded-xl bg-white">
                          <p className="font-serif text-[#5a5a40] italic">"Archive empty. Write down your first reflective entry above."</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
