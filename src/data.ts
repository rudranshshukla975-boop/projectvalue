import { ReadingItem, DiscussionPrompt, DichotomyItem } from './types';

export const CLASSIC_QUOTES = [
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    context: "On Grounding Fears"
  },
  {
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    context: "The Citadel of Minds"
  },
  {
    text: "Freedom is the only worthy-goal in life. It is won by disregarding things that lie beyond our control.",
    author: "Epictetus",
    context: "The Enchiridion"
  },
  {
    text: "He who has a why to live for can bear almost any how.",
    author: "Friedrich Nietzsche",
    context: "Existential Meaning"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    context: "Pragmatism & Cash Value"
  },
  {
    text: "An unexamined life is not worth living.",
    author: "Socrates",
    context: "Apology of Action"
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    context: "Nicomachean Virtue"
  }
];

export const COURSE_COHORT_DETAILS = {
  duration: "6 Weeks (Self-Paced / Guided Cohorts)",
  price: 49,
  enrollmentDeadlines: "Enrolling for Summer 2026",
  syllabusHeading: "Syllabus: Six Great Frameworks for Active Existence",
  subtitle: "A syllabus forged in the fires of action, and structured around measurable frameworks for daily life."
};

export const READING_LIST_DATA: ReadingItem[] = [
  {
    id: 'read-1',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    era: 'Ancient',
    category: 'Stoicism',
    description: 'The personal diaries of the Roman Emperor, contemplating duty, mortality, resilience, and maintaining an inner citadel of tranquility.',
    practicalFramework: 'Inner Citadel: Developing psychological immunity to external chaos.',
    completed: false
  },
  {
    id: 'read-2',
    title: 'Letters from a Stoic',
    author: 'Seneca',
    era: 'Ancient',
    category: 'Stoicism',
    description: 'Wise, friendly letters offering pragmatic advice on overcoming anxiety, valuing time, and living simple, intentional lives.',
    practicalFramework: 'Premeditatio Malorum: Mentally rehearsing adversity to disarm fear.',
    completed: false
  },
  {
    id: 'read-3',
    title: 'Man\'s Search for Meaning',
    author: 'Viktor E. Frankl',
    era: 'Contemporary',
    category: 'Existentialism',
    description: 'A powerful chronicle of surviving concentration camps, introducing Logotherapy—the thesis that man\'s primary drive is the search for meaning.',
    practicalFramework: 'Existential Margin: Our ultimate power to choose our attitude in any circumstance.',
    completed: false
  },
  {
    id: 'read-4',
    title: 'Pragmatism',
    author: 'William James',
    era: 'Modern',
    category: 'Pragmatism',
    description: 'A seminal philosophy advocating that the value of an idea lies in its dynamic, concrete consequences and practical "cash value" in real life.',
    practicalFramework: 'Cash-Value Test: Measuring ideas by what differences they make to our actions.',
    completed: false
  },
  {
    id: 'read-5',
    title: 'Enchiridion (The Handbook)',
    author: 'Epictetus',
    era: 'Ancient',
    category: 'Stoicism',
    description: 'A straightforward manual on freedom, dignity, and acceptance, edited by his student Arrian.',
    practicalFramework: 'Dichotomy of Control: Investing zero anxiety in things you cannot govern.',
    completed: false
  },
  {
    id: 'read-6',
    title: 'The Myth of Sisyphus',
    author: 'Albert Camus',
    era: 'Contemporary',
    category: 'Existentialism',
    description: 'An exploration of the absurd, arguing that we must imagine Sisyphus happy in finding deliberate beauty and purpose inside our struggles.',
    practicalFramework: 'Radical Acceptance: Choosing to live and fight with purpose despite universal silence.',
    completed: false
  },
  {
    id: 'read-7',
    title: 'The Will to Believe',
    author: 'William James',
    era: 'Modern',
    category: 'Pragmatism',
    description: 'Defending our intellectual right to adopt a belief when objective evidence is not yet final, yet the practical choice is urgent and vital.',
    practicalFramework: 'Vital Leap: Choosing a path of courage to let the evidence emerge.',
    completed: false
  },
  {
    id: 'read-8',
    title: 'Apology',
    author: 'Plato (Socrates)',
    era: 'Ancient',
    category: 'Ethics & Logic',
    description: 'Socrates\' defense speech, revealing the courage required to stand for truth, and a masterclass in intellectual humility.',
    practicalFramework: 'Elenchus Method: Stripping away assumptions via targeted, honest questioning.',
    completed: false
  }
];

export const SYLLABUS_WEEKS: DiscussionPrompt[] = [
  {
    id: 'week1',
    week: 1,
    title: 'Dichotomy of Control (The Attic Foundation)',
    quote: "Make the best use of what is in your power, and take the rest as it happens.",
    attribution: "Epictetus",
    frameworkName: "Stoic Agency Scale",
    promptText: "Draft a clear list of three major distresses in your current week. Rigorously parse each into 'Entirely Mine' vs 'The Rest'. Plan one action of absolute non-attachment for the latter.",
    exerciseTitle: "Distinguish Your Agency",
    exerciseDescription: "Separate the noise of the universe from your direct sovereign choices."
  },
  {
    id: 'week2',
    week: 2,
    title: 'Socratic Deconstruction of Limiting Beliefs',
    quote: "An unexamined life is not worth living.",
    attribution: "Socrates",
    frameworkName: "Socratic Reframing Tool",
    promptText: "Identify a rigid professional or personal assumption you hold. Subject it to three layers of questioning: What evidence sustains it? What does it assume? How does it benefit you practically?",
    exerciseTitle: "Socratic Trial",
    exerciseDescription: "Act as your own cross-examiner. Dismantle assumptions before they solidify into dogmas."
  },
  {
    id: 'week3',
    week: 3,
    title: 'Pragmatic Consequence & Cash-Value',
    quote: "An idea's meaning is the practical conduct it produces.",
    attribution: "William James",
    frameworkName: "Jamesian Decision Matrix",
    promptText: "Test a major intellectual path, career avenue, or creative dream. What is its 'cash value' in terms of daily habits? If it changes nothing about what you do, reject it.",
    exerciseTitle: "Test Cash Value",
    exerciseDescription: "Avoid intellectual circles. Trace abstract beliefs directly to concrete outcomes they generate."
  },
  {
    id: 'week4',
    week: 4,
    title: 'The Existential Citadel',
    quote: "The last of the human freedoms is to choose one's attitude in any given set of circumstances.",
    attribution: "Viktor Frankl",
    frameworkName: "Frankl Existential Margin",
    promptText: "Recall a past period of severe friction. Detail how your response back then was shaped, and define how you can elevate your choice of attitude today in a current recurring obstacle.",
    exerciseTitle: "Find Your Margin",
    exerciseDescription: "Extend the gap between stimulus and your chosen response."
  },
  {
    id: 'week5',
    week: 5,
    title: 'Amor Fati & The Absurd Joy',
    quote: "One must imagine Sisyphus happy.",
    attribution: "Albert Camus",
    frameworkName: "Absurdist Defiance Metric",
    promptText: "What is your 'boulder'? Name the repetitive, challenging, or seemingly fruitless task in your life. How can you claim absolute ownership and joyful defiance over it today?",
    exerciseTitle: "Love the Boulder",
    exerciseDescription: "Transfigure heavy repetition into conscious heroic defiance."
  },
  {
    id: 'week6',
    week: 6,
    title: 'Aristotelian Virtue on the Ground',
    quote: "Virtue is a state of deliberate choice, lying in a mean relative to us.",
    attribution: "Aristotle",
    frameworkName: "Golden Mean Alignment",
    promptText: "Analyze one behavior trait you want to improve (e.g. courage, generosity). Chart its extremes (Deficiency vs. Excess) and outline three practical micro-actions to hit the Golden Mean this week.",
    exerciseTitle: "Calibrate the Mean",
    exerciseDescription: "Balance yourself between cowardice and rashness, miserliness and extravagance."
  }
];

export const DICHOTOMY_GAME_ITEMS: DichotomyItem[] = [
  {
    id: 'game-1',
    text: "Receiving a promotion from your manager after a long year of labor.",
    correctCategory: 'no-control',
    explanation: "External. The final decision sits in your manager's hand, budget allocations, and market timing. You only govern the quality of your labor and preparation."
  },
  {
    id: 'game-2',
    text: "Deciding to put in effort and prep thoroughly for next week's lecture.",
    correctCategory: 'control',
    explanation: "Internal. Your dedication, hours of sleep, writing structure, and research are entirely your sovereign domain."
  },
  {
    id: 'game-3',
    text: "The attitude, mood, and opinions of your peers during discussion hours.",
    correctCategory: 'no-control',
    explanation: "External. Others' judgments are shaped by their own history, biases, and morning rush. Directing energy to worry about them is wasted capital."
  },
  {
    id: 'game-4',
    text: "How you choose to speak and behave when a classmate strongly disagrees with you.",
    correctCategory: 'control',
    explanation: "Internal. Your tone, patience, open ears, and breath before replying are entirely in your control."
  },
  {
    id: 'game-5',
    text: "The exact weather on the morning of an outdoor Socratic Dialogue cohort meet.",
    correctCategory: 'no-control',
    explanation: "External. The atmospheric pressure, rain clouds, and wind are natural phenomena. Bring a warm cloak or shelter in the pavilion; do not curse the heavens."
  },
  {
    id: 'game-6',
    text: "The immediate, automatic emotional spark of anger you feel when insulted.",
    correctCategory: 'no-control',
    explanation: "External/Semi-External. Initial physiological sparks (first reactions) are evolutionary signals, but what you choose to DO with that spark (your assent) is in your control."
  }
];
