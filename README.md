# PathPilot — AI-Powered Student Success Platform

> **Hackathon Track**: Theme 10 — Education, Learning & EdTech  
> **Target Audience**: College Students, Computer Science Majors & Engineering Candidates  
> **Architecture**: 100% Client-Side React + TypeScript + Vite + Tailwind CSS v4 (Zero Backend, Zero Paid APIs)

---

## 🌟 Overview & Problem Statement

College students face severe curriculum fragmentation, high cognitive overload, and uncertainty around technical placement readiness. Key student pain points include:
1. **Syllabus Overwhelm**: University courses present dense, disconnected syllabi without visible prerequisite progression.
2. **Uncalibrated Self-Assessment**: Students don't know where their actual skill gaps lie until failing a midterm or technical interview.
3. **Practice Disconnect**: Fragmented tools (LeetCode for coding, Quizlet for flashcards, Notion for tasks, Google Calendar for schedules) increase cognitive friction.
4. **Lack of Immediate Guidance**: Late-night study sessions stall when students hit conceptual roadblocks and professors/TAs are unreachable.

### The PathPilot Solution
**PathPilot** is an all-in-one dark cosmic SaaS workspace designed specifically for college engineering students. It unifies:
- **Diagnostic Skill Assessment**: 8-question CS baseline test calibrating individual strengths and gaps.
- **Personalized Course Roadmaps**: Interactive curriculum tracks (Full Stack, DSA, AI/ML, Fundamentals, Placements) with lesson objectives, theoretical summaries, and practice activities.
- **Interactive Practice Lab**: 7-category MCQ quiz engine (35 authentic questions) and interactive DSA coding workspace (5 classic problems with multi-language sample validation).
- **Socratic AI Study Mentor**: Local deterministic educational assistant diagnosing quiz mistakes, explaining tricky React/DSA concepts, and planning weekly study routines.
- **Weekly Study Plan Generator**: Automatic 7-day schedule synthesis tailored to student goals, level, and incomplete curriculum lessons.
- **Gamification & Performance Analytics**: Action-based XP points, 9 milestone badges, study streaks, and Recharts multi-metric performance graphs.

---

## 🎨 Visual Identity & Design System (Phase 1 Authority)

PathPilot strictly adheres to a locked, futuristic cosmic dark SaaS palette:
- **Main Canvas Background**: `#090817`
- **Sidebar Background**: `#080611`
- **Main Panels**: `#171536`
- **Cards & Surfaces**: `#211C50`
- **Primary Neon Pink Accent**: `#F02BC8` (Buttons, glow highlights, active borders)
- **Violet Accent**: `#9255FF` (Secondary badges, chart areas, gradients)
- **Primary Text**: `#F7F3FF`
- **Secondary / Muted Text**: `#A7A0C5`

The design system incorporates subtle glassmorphic borders (`rgba(146, 85, 255, 0.2)`), radiant glowing accents, refined typography, and accessible contrast ratios throughout.

---

## 🚀 Key Modules & Application Architecture

| Route | Module | Purpose |
| :--- | :--- | :--- |
| `/` | **Landing Page** | High-conversion EdTech showcase: Hero, Problem/Solution, Core Features, How It Works, Live Interactive Product Preview, Testimonials, FAQ, and Footer. |
| `/onboarding` | **Student Onboarding** | 7-step wizard: Welcome, Profile Setup, Career Goals, Skills Inventory, 8-question CS Diagnostic Test, and Automated Calibration Result. |
| `/dashboard` | **Student Dashboard** | Unified command center: Overview Cards, Active Roadmap Banner, Deep Work Pomodoro Sprint Timer (25m), Interactive Study Planner, and Gamification Shelf. |
| `/roadmap` | **Course Roadmaps** | 5 comprehensive tracks (45 lessons) across Beginner, Intermediate, and Advanced tiers with lesson modals and progress toggling. |
| `/practice` | **Practice Lab** | 7-category MCQ Quiz Engine (All/Beginner/Intermediate/Advanced filters) + DSA Coding Lab with Java/Python/JS/C++ sample validation runner. |
| `/mentor` | **AI Study Mentor** | Local Socratic assistant with prompt chips, quiz mistake diagnosis, concept breakdowns, and a 7-day Weekly Study Plan Generator. |
| `/analytics` | **Performance Analytics** | Real-time Recharts dashboards: Study Activity Area Chart, Quiz Accuracy Bar Chart, Skill Mastery Radar Chart, and Language Distribution. |
| `/settings` | **Settings & Preferences** | Student profile editor, Pomodoro duration defaults, daily target goals, notification toggles, and JSON data backup/export. |
| `/design-system` | **Design System Preview** | Living styleguide demonstrating all buttons, badges, progress bars, cards, typography, and color tokens. |

---

## 🛠️ Technology Stack

- **Framework**: React 19 (Strict Mode)
- **Language**: TypeScript (`.tsx` and `.ts` strictly, zero `.js`/`.jsx`)
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS v4 + Custom Cosmic Theme Tokens
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Visualizations**: Recharts (Area, Bar, Radar, CartesianGrid)
- **Routing**: React Router DOM (v7)

---

## 💾 LocalStorage Persistence Schema

PathPilot requires zero external databases or cloud connections. All data persists securely in the browser's `localStorage` across refreshes:

| Key | Description | Type / Structure |
| :--- | :--- | :--- |
| `pathpilot_student_profile` | Onboarding profile and student metadata | `OnboardingData` (Name, College, Major, Semester, Goals, Assessment) |
| `pathpilot_onboarding_completed` | Flag indicating onboarding status | `'true'` \| `'false'` |
| `pathpilot_study_tasks` | Daily tasks queue with toggleable completion | `StudyTask[]` (id, title, course, priority, completed, dueDate) |
| `pathpilot_study_sessions` | Recorded focus sprints from Pomodoro timer | `StudySession[]` (id, durationMinutes, date, topic) |
| `pathpilot_active_roadmap` | Selected curriculum track | `'fullstack'` \| `'dsa'` \| `'aiml'` \| `'fundamentals'` \| `'internship'` |
| `pathpilot_completed_lessons` | IDs of finalized curriculum lessons | `string[]` (e.g. `['fs-mod1-les1', 'fs-mod1-les2']`) |
| `pathpilot_practice_attempts` | Submitted MCQ quiz history & scores | `PracticeQuizAttempt[]` (categoryId, score, total, percentage, answers) |
| `pathpilot_practice_coding_solutions` | Solved DSA problem submissions | `SolvedCodingProblem[]` (problemId, language, code, passed, solvedAt) |
| `pathpilot_saved_study_plan` | 7-day schedule generated by AI Mentor | `SavedStudyPlan` (items with day, topic, duration, objective, practice) |
| `pathpilot_mentor_messages` | Full conversation history with AI Mentor | `ChatMessage[]` (sender, text, timestamp, suggestedFollowUps, topicTag) |
| `pathpilot_gamification_state` | Earned XP, Level, Streak, and Badges | `GamificationState` (xp, level, streakDays, badges, completedActionIds) |

---

## 🛡️ Hackathon Transparency & Honesty Declaration

In compliance with hackathon guidelines, PathPilot makes **no deceptive or exaggerated claims**:
1. **Client-Side Prototype**: This application is a 100% frontend prototype designed for presentation and user experience evaluation.
2. **Local Deterministic Assistant**: The AI Study Mentor operates using a client-side deterministic educational response engine mapped to student goals, roadmap progress, and quiz history. It does not call ChatGPT or Gemini APIs.
3. **Simulated Sample Execution**: The DSA Coding Lab evaluates code against sample test cases within the browser sandbox; it does not claim to execute in a remote cloud container or secure backend compiler.
4. **Authentic Analytics**: Performance metrics and charts reflect only recorded student actions (completed tasks, quizzes, and study sessions). Empty states are displayed when no data exists rather than fabricating mock trends.
5. **Anti-Duplicate XP**: XP and achievement badges are awarded only once per unique action (e.g. unique lesson ID or task ID) to prevent exploit looping.

---

## ⚡ Quick Start & Run Instructions

### Prerequisites
- Node.js $\ge 18.0.0$
- npm $\ge 9.0.0$

### Installation & Launch
```bash
# 1. Clone repository & navigate into PathPilot directory
cd PathPilot

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# Navigate to: http://localhost:5173
```

### Production Build & Lint Checks
```bash
# Run TypeScript compilation & Vite production build
npm run build

# Run linter
npm run lint
```

---

## 🎬 Suggested Live Demo Walkthrough

1. **Landing Page (`/`)**:
   - Scroll through the hero, problem/solution, core features, and live interactive preview widget.
   - Click **"Get Started Free"** or **"Start Your Journey"**.
2. **Student Onboarding (`/onboarding`)**:
   - Complete Step 2 (Profile Setup: e.g. "Alex Chen", "Stanford University", "Computer Science").
   - Select Goals & Skills (Full Stack Web Development, DSA).
   - Take the 8-question CS diagnostic test and view the calibrated diagnostic score.
   - Click **"Launch My Student Dashboard"**.
3. **Student Dashboard (`/dashboard`)**:
   - Inspect the Overview Cards showing synchronized progress, XP, and active streak.
   - View the Level Progress bar and earned Milestone Badges on the Gamification Card.
   - Click **"Start Sprint (25m)"** to test the Pomodoro focus timer.
   - Check off a study task in the interactive Study Planner.
4. **Course Roadmaps (`/roadmap`)**:
   - View the active "Full Stack Web Development" track.
   - Expand Module 1, click into a lesson to inspect the theory, objective, and practice challenge.
   - Click **"Mark Lesson as Complete"** and observe XP award and progress bar update.
5. **Interactive Practice Lab (`/practice`)**:
   - Switch between **MCQ Quizzes** and **DSA Coding Lab**.
   - Launch a 5-question quiz (e.g. Data Structures & Algorithms or React).
   - Submit answers, view immediate feedback and concept explanations, and view the final scorecard.
   - Switch to **DSA Coding Lab**, select "Two Sum", switch language to Java or Python, and click **"Run Sample Tests"**.
6. **AI Study Mentor (`/mentor`)**:
   - Click prompt chips such as **"Explain my quiz mistakes"** or **"Explain a DSA concept"**.
   - Note how the assistant analyzes the student's recent practice scores.
   - Switch to the **"Study Plan Generator"** tab, regenerate a custom 7-day schedule, and save it.
7. **Performance Analytics (`/analytics`)**:
   - Review the empirical Recharts graphs: Weekly Study Activity, Quiz Accuracy by Category, and Skill Mastery Radar.
8. **Settings & Data Management (`/settings`)**:
   - Edit student profile, adjust Pomodoro duration, or click **"Export Progress JSON Backup"**.
