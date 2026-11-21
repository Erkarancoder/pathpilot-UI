import type {
  OnboardingData,
  SavedStudyPlan,
  WeeklyStudyPlanItem,
  PracticeQuizAttempt,
} from '../types'

export interface StudentMentorContext {
  onboarding: OnboardingData | null
  activeRoadmapTitle: string
  completedLessonsCount: number
  totalLessonsCount: number
  nextLessonTitle?: string
  recentQuizAttempts: PracticeQuizAttempt[]
  overallAccuracy: number
}

export const SUGGESTED_MENTOR_PROMPTS = [
  'Explain a DSA concept',
  'Help me understand React',
  'Create a study plan',
  'Prepare me for a technical interview',
  'Explain my quiz mistakes',
  'Suggest what I should learn next',
]

export const SUPPORTED_TOPICS = [
  { id: 'dsa', title: 'Data Structures & Algorithms', keywords: ['dsa', 'algorithm', 'complexity', 'binary search', 'two pointer', 'array', 'tree', 'graph'] },
  { id: 'react', title: 'React & Frontend Architecture', keywords: ['react', 'hook', 'useeffect', 'state', 'virtual dom', 'component', 'props', 'usememo'] },
  { id: 'interview', title: 'Technical Interview Prep', keywords: ['interview', 'placement', 'star method', 'mock interview', 'system design', 'resume'] },
  { id: 'quiz-mistakes', title: 'Quiz Performance & Mistakes', keywords: ['quiz', 'mistake', 'wrong', 'accuracy', 'error', 'failed', 'score'] },
  { id: 'next-steps', title: 'Roadmap & Next Steps', keywords: ['next', 'learn next', 'roadmap', 'recommendation', 'what should i do', 'continue'] },
  { id: 'study-plan', title: 'Study Scheduling & Focus', keywords: ['study plan', 'schedule', 'routine', 'routine plan', 'weekly plan', 'timetable'] },
  { id: 'python', title: 'Python Core & Concepts', keywords: ['python', 'gil', 'list comprehension', 'generator', 'decorator'] },
  { id: 'database', title: 'Database & SQL Fundamentals', keywords: ['database', 'sql', 'acid', 'index', 'normalization', 'join'] },
]

export function generateMentorResponse(
  rawQuery: string,
  context: StudentMentorContext
): {
  text: string
  suggestedFollowUps: string[]
  topicTag: string
  isDemoNotice?: boolean
} {
  const query = rawQuery.toLowerCase().trim()
  const studentName = context.onboarding?.fullName ? context.onboarding.fullName.split(' ')[0] : 'fellow engineer'
  const primaryGoal = context.onboarding?.learningGoals?.[0] || 'Software Engineering'

  // 1. Explain Quiz Mistakes / Diagnostic Performance
  if (
    query.includes('quiz mistake') ||
    query.includes('my mistake') ||
    query.includes('quiz') ||
    query.includes('wrong answer') ||
    query.includes('my score')
  ) {
    if (context.recentQuizAttempts.length === 0) {
      return {
        text: `### 🎯 Quiz Diagnostic & Mistake Analysis\n\nHi **${studentName}**, I checked your local records and noticed you haven't taken any practice quizzes yet!\n\nTo give you personalized mistake analysis, head over to the **Practice Lab** and take a quick 5-question quiz in DSA, React, or Java. Once you submit an attempt, I will diagnose specific concept gaps and common distractors here.`,
        suggestedFollowUps: ['Suggest what I should learn next', 'Explain a DSA concept'],
        topicTag: 'Quiz Diagnostics',
      }
    }

    const latest = context.recentQuizAttempts[0]
    const lowestScoring = [...context.recentQuizAttempts].sort((a, b) => a.percentage - b.percentage)[0]

    return {
      text: `### 🎯 Diagnostic & Quiz Performance Review\n\nHi **${studentName}**, here is your personalized performance breakdown based on your actual local practice data:\n\n- **Most Recent Quiz**: *${latest.categoryTitle}* (${latest.difficulty})\n  - **Score**: ${latest.score} / ${latest.totalQuestions} (${latest.percentage}%)\n  - **Status**: ${latest.percentage >= 80 ? '✅ Solid mastery of core concepts.' : '⚠️ Review foundational mechanics.'}\n- **Overall Lab Accuracy**: **${context.overallAccuracy}%** across all registered attempts.\n\n#### 💡 Common Trap Analysis for ${lowestScoring.categoryTitle}:\n1. **Boundary Cases & Edge Conditions**: In multiple-choice questions, incorrect options often alter off-by-one indices or omit null-safety checks.\n2. **Conceptual Distractors**: Pay special attention to execution order (e.g. microtask queue timing vs. setTimeout, or shallow vs. deep equality in React dependencies).\n3. **Recommended Fix**: Retake the *${lowestScoring.categoryTitle}* quiz at Beginner level, reviewing the explanation card immediately after checking each answer before advancing.`,
      suggestedFollowUps: ['Help me understand React', 'Explain a DSA concept', 'Create a study plan'],
      topicTag: 'Performance Diagnostics',
    }
  }

  // 2. Suggest what I should learn next / Roadmap
  if (
    query.includes('what should i learn next') ||
    query.includes('learn next') ||
    query.includes('next steps') ||
    query.includes('my roadmap')
  ) {
    const nextLesson = context.nextLessonTitle || 'Foundations & Architecture'
    const progressPct = context.totalLessonsCount > 0
      ? Math.round((context.completedLessonsCount / context.totalLessonsCount) * 100)
      : 0

    return {
      text: `### 🗺️ Tailored Learning Trajectory for ${studentName}\n\nBased on your active track (**${context.activeRoadmapTitle}**) and goal (**${primaryGoal}**):\n\n- **Current Progress**: You have completed **${context.completedLessonsCount} of ${context.totalLessonsCount} lessons** (${progressPct}%).\n- **Immediate Next Step**: 📌 **"${nextLesson}"**\n\n#### Recommended 3-Step Action Plan:\n1. **Deep Dive**: Open your Course Roadmap, review the theoretical objective for *"${nextLesson}"*, and inspect the companion reference resources.\n2. **Reinforce with Practice**: After finishing the reading, head to the Practice Lab to test your retention with 5 related MCQs.\n3. **Hands-On Coding**: Spend 20 minutes implementing the core data structure or interface without referencing tutorials.`,
      suggestedFollowUps: ['Create a study plan', 'Explain a DSA concept', 'Prepare me for a technical interview'],
      topicTag: 'Roadmap Guidance',
    }
  }

  // 3. Explain DSA Concept
  if (
    query.includes('dsa') ||
    query.includes('algorithm') ||
    query.includes('binary search') ||
    query.includes('two pointer') ||
    query.includes('time complexity') ||
    query.includes('big o')
  ) {
    return {
      text: `### ⚡ Core DSA Pattern: Two-Pointers & Binary Search\n\nWhen preparing for technical assessments, mastering algorithmic patterns beats memorizing individual problems.\n\n#### 1. The Two-Pointer Technique\n- **When to Use**: Sorted arrays/strings where you need to find pairs, partition elements, or invert sequences in $O(N)$ time with $O(1)$ auxiliary space.\n- **Classic Example**: *Two Sum II (Sorted)* or *Container With Most Water*.\n\`\`\`typescript\nfunction twoSumSorted(numbers: number[], target: number): [number, number] | null {\n  let left = 0;\n  let right = numbers.length - 1;\n  while (left < right) {\n    const sum = numbers[left] + numbers[right];\n    if (sum === target) return [left + 1, right + 1];\n    if (sum < target) left++;\n    else right--;\n  }\n  return null;\n}\n\`\`\`\n\n#### 2. Binary Search Invariant\n- Always maintain the search space bounds: \`mid = left + Math.floor((right - left) / 2)\` to prevent 32-bit integer overflow.\n- Halves search space each iteration: **$O(\\log N)$** time complexity.\n\nTry implementing these in the **DSA Coding Lab** on PathPilot!`,
      suggestedFollowUps: ['Prepare me for a technical interview', 'Help me understand React', 'Create a study plan'],
      topicTag: 'DSA Foundations',
    }
  }

  // 4. Help me understand React
  if (
    query.includes('react') ||
    query.includes('hook') ||
    query.includes('virtual dom') ||
    query.includes('state') ||
    query.includes('useeffect') ||
    query.includes('usememo')
  ) {
    return {
      text: `### ⚛️ Master React: Reconciliation & Hook Rules\n\nIn modern React development, performance and bug prevention hinge on understanding component lifecycle and memory references.\n\n#### 1. Reconciliation & The Virtual DOM\n- React generates a lightweight virtual representation of your UI tree.\n- When state or props change, React executes its **Diffing Algorithm** ($O(N)$ heuristic).\n- Keys must be stable and unique among siblings so React can differentiate moved elements from newly mounted ones.\n\n#### 2. Rules of Hooks\n- **Top-Level Only**: Never call hooks inside loops, conditions, or nested functions to ensure hook call order remains identical across renders.\n- **Dependency Arrays**: Everything read inside an effect or memoized callback that changes over time must be listed in its dependency array.\n\n#### 3. When to use \`useMemo\` vs \`useCallback\`\n- \`useMemo(() => computeExpensiveVal(x), [x])\`: Caches the *result* of a calculation.\n- \`useCallback(fn, deps)\`: Caches the *function instance* itself to avoid breaking reference equality in memoized children.`,
      suggestedFollowUps: ['Explain a DSA concept', 'Suggest what I should learn next', 'Create a study plan'],
      topicTag: 'React Architecture',
    }
  }

  // 5. Technical Interview Prep
  if (
    query.includes('interview') ||
    query.includes('placement') ||
    query.includes('mock interview') ||
    query.includes('star method')
  ) {
    return {
      text: `### 💼 Technical Interview Preparation Strategy\n\nFor college placements and campus recruitment, interviews test three distinct pillars:\n\n#### 1. Coding & Problem Solving (45 min)\n- **Clarify Inputs & Constraints**: Never start coding immediately. Ask about empty arrays, duplicates, negative numbers, and memory limits.\n- **State Brute Force First**: Briefly describe the $O(N^2)$ solution, explain why it falls short, and transition into your optimal $O(N)$ or $O(N \\log N)$ approach.\n- **Dry Run with Test Cases**: Trace code line-by-line with sample input *before* declaring it complete.\n\n#### 2. Core CS Fundamentals\n- **OS**: Process vs. Thread, Virtual Memory, Deadlock conditions.\n- **DBMS**: ACID transactions, indexing internals (B+ Trees), 1NF to 3NF.\n- **Networking**: TCP 3-Way Handshake, DNS resolution flow, HTTPS TLS negotiation.\n\n#### 3. Behavioral Questions (The STAR Method)\n- **S**ituation: Context and technical environment.\n- **T**ask: Your specific responsibility.\n- **A**ction: Concrete engineering steps you personally executed.\n- **R**esult: Quantified impact (e.g. reduced build time by 35%).`,
      suggestedFollowUps: ['Explain a DSA concept', 'Create a study plan', 'Explain my quiz mistakes'],
      topicTag: 'Interview Strategy',
    }
  }

  // 6. Create Study Plan
  if (
    query.includes('study plan') ||
    query.includes('routine') ||
    query.includes('schedule') ||
    query.includes('timetable')
  ) {
    return {
      text: `### 📅 Structured Weekly Study Strategy\n\nTo balance college coursework with technical interview prep, follow this sustainable 7-day study rhythm for **${primaryGoal}**:\n\n- **Mon & Wed (Theory & Roadmap)**: 45 mins completing 1 roadmap lesson and reading official documentation.\n- **Tue & Thu (Coding Practice)**: 45 mins solving 1 DSA problem and taking a 5-question lab quiz.\n- **Fri (System Design & Review)**: 30 mins reviewing notes, quiz mistakes, and CS fundamentals.\n- **Sat (Hands-on Mini-Project)**: 60 mins coding practical features in React or Node.\n- **Sun (Rest & Reflection)**: 15 mins reviewing weekly analytics and setting top 3 goals for next week.\n\n👉 **Tip**: Click the **"Study Plan Generator"** tab on the right to generate and save your personalized 7-day schedule with duration and learning objectives!`,
      suggestedFollowUps: ['Suggest what I should learn next', 'Explain my quiz mistakes'],
      topicTag: 'Study Planning',
    }
  }

  // 7. Python
  if (query.includes('python')) {
    return {
      text: `### 🐍 Core Python Concepts for Engineers\n\n- **Global Interpreter Lock (GIL)**: A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes simultaneously. For CPU-bound tasks, use \`multiprocessing\` rather than \`threading\`.\n- **Generators & \`yield\`**: Yield turns a function into a stateful iterator that yields values on demand, maintaining $O(1)$ memory consumption rather than building large lists in RAM.\n- **List Comprehensions**: Highly optimized C-level iteration over standard loops, but avoid nesting deeper than 2 levels to preserve readability.`,
      suggestedFollowUps: ['Explain a DSA concept', 'Help me understand React'],
      topicTag: 'Python Mastery',
    }
  }

  // 8. Database & SQL
  if (query.includes('database') || query.includes('sql') || query.includes('dbms')) {
    return {
      text: `### 🗄️ Database & SQL Architecture\n\n- **ACID Guarantees**:\n  - **Atomicity**: All operations in a transaction succeed or all roll back.\n  - **Consistency**: Database invariants and constraints are preserved.\n  - **Isolation**: Concurrent transactions execute as if serially scheduled.\n  - **Durability**: Committed data persists across system crashes.\n- **Index Mechanics**: B-Tree and B+ Trees provide $O(\\log N)$ lookups by keeping keys sorted across balanced disk pages.\n- **Normalization**: Eliminates redundancy and update anomalies through functional dependencies.`,
      suggestedFollowUps: ['Prepare me for a technical interview', 'Explain my quiz mistakes'],
      topicTag: 'Database Engineering',
    }
  }

  // 9. Unsupported / Fallback response with full honesty
  return {
    text: `### ℹ️ Local Educational Assistant Notice\n\nI am PathPilot's **local client-side educational assistant**. In this demonstration environment, all responses are deterministically mapped without a remote LLM API connection to guarantee zero latency and privacy.\n\nI couldn't find a direct match for *"${rawQuery}"*. However, I have in-depth educational guidance prepared for:\n\n- **DSA Concepts**: Binary Search, Two-Pointers, Tree Traversals, Big-O Complexity\n- **React & Frontend**: Virtual DOM, Hooks, Dependency Arrays, useMemo\n- **Career & Interviews**: Technical Interview Blueprint, STAR Method\n- **Practice Diagnostics**: Analyzing your quiz results and mistake patterns\n- **Roadmap Guidance**: What lesson to tackle next based on your track\n- **Study Scheduling**: Structured weekly study planner\n\nTry clicking any suggested chip below!`,
    suggestedFollowUps: [
      'Explain a DSA concept',
      'Help me understand React',
      'Suggest what I should learn next',
      'Prepare me for a technical interview',
    ],
    topicTag: 'Local Assistant Notice',
    isDemoNotice: true,
  }
}

export function generateWeeklyStudyPlan(
  goals: string[],
  experience: string,
  incompleteLessons: { title: string; objective: string }[],
  accuracyPercentage: number
): SavedStudyPlan {
  const goal = goals[0] || 'Full Stack Web Development'

  const days = [
    { day: 'Monday', focus: 'Foundational Theory' },
    { day: 'Tuesday', focus: 'DSA & Algorithmic Problem Solving' },
    { day: 'Wednesday', focus: 'Hands-on Framework / Engineering' },
    { day: 'Thursday', focus: 'Lab Quizzes & Diagnostic Review' },
    { day: 'Friday', focus: 'Core Computer Science Concepts' },
    { day: 'Saturday', focus: 'Mini-Project / Implementation' },
    { day: 'Sunday', focus: 'Weekly Retrospective & Rest' },
  ]

  const items: WeeklyStudyPlanItem[] = days.map((d, index) => {
    const lesson = incompleteLessons[index % Math.max(1, incompleteLessons.length)]
    let topic = lesson ? lesson.title : `${goal} Focus Module ${index + 1}`
    let duration = 45
    let objective = lesson ? lesson.objective : `Reinforce key ${goal} patterns and paradigms.`
    let practice = 'Complete 1 roadmap module and note down challenging concepts.'

    if (d.day === 'Tuesday') {
      topic = 'Array & Two-Pointer Problem Solving'
      duration = 50
      objective = 'Solve 2 array problems in the Practice Lab using two-pointer patterns.'
      practice = 'Submit working solution in Java or Python in DSA Coding Lab.'
    } else if (d.day === 'Thursday') {
      topic = 'Practice Lab Diagnostic Quiz'
      duration = 35
      objective = `Aim for >80% accuracy (current baseline: ${accuracyPercentage}%).`
      practice = 'Take a 5-question quiz in DSA or Web Development and review explanations.'
    } else if (d.day === 'Friday') {
      topic = 'Core CS: DBMS & Operating Systems'
      duration = 40
      objective = 'Review ACID transactions and Process vs Thread mechanics for interviews.'
      practice = 'Write out short flashcard summaries for interview revision.'
    } else if (d.day === 'Saturday') {
      topic = 'Applied Project Coding Sprint'
      duration = 60
      objective = 'Build and test a functional component or data structure from scratch.'
      practice = 'Conduct a 25-minute Pomodoro study session on the dashboard.'
    } else if (d.day === 'Sunday') {
      topic = 'Weekly Review & Analytics Check'
      duration = 20
      objective = 'Review study streak, check XP earned, and clear incomplete tasks.'
      practice = 'Set top 3 priorities for the upcoming week in your Study Planner.'
    }

    return {
      id: `plan-item-${index + 1}`,
      day: d.day,
      topic,
      suggestedDurationMinutes: duration,
      learningObjective: objective,
      practiceActivity: practice,
      completed: false,
    }
  })

  return {
    id: `plan-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    goalTarget: goal,
    summary: `Personalized 7-day study curriculum optimized for ${experience} level targeting ${goal}.`,
    items,
  }
}
