import type { NavItem, StudentProfile } from '../types'

export const mockStudentProfile: StudentProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@campus.edu',
  major: 'Computer Science',
  year: 'Junior, Class of 2026',
  gpa: 3.89,
  streakDays: 14,
  notificationsCount: 3,
}

export const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Study Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    badge: 'Active',
  },
  {
    id: 'design-system',
    label: 'Design System',
    path: '/design-system',
    icon: 'Layers',
    badge: 'v1.0',
  },
  {
    id: 'roadmap',
    label: 'Course Roadmaps',
    path: '/roadmap',
    icon: 'Compass',
    badge: 'Active',
  },
  {
    id: 'mentor',
    label: 'Study Assistant',
    path: '/mentor',
    icon: 'Bot',
    badge: 'Active',
  },
  {
    id: 'practice',
    label: 'Practice Lab',
    path: '/practice',
    icon: 'Code2',
    badge: 'Active',
  },
  {
    id: 'analytics',
    label: 'Weekly Analytics',
    path: '/analytics',
    icon: 'LineChart',
    badge: 'Active',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    badge: 'Active',
  },
]

export interface ColorToken {
  name: string
  token: string
  hex: string
  rgb: string
  description: string
  role: string
}

export const colorTokens: ColorToken[] = [
  {
    name: 'Main Background',
    token: '--bg-main',
    hex: '#090817',
    rgb: 'rgb(9, 8, 23)',
    description: 'Deep midnight dark canvas for zero eye-strain during late-night study sessions',
    role: 'Canvas Background',
  },
  {
    name: 'Sidebar Background',
    token: '--bg-sidebar',
    hex: '#080611',
    rgb: 'rgb(8, 6, 17)',
    description: 'Focused dark container keeping primary navigation tucked neatly away',
    role: 'Navigation Drawer',
  },
  {
    name: 'Main Panels',
    token: '--bg-panel',
    hex: '#171536',
    rgb: 'rgb(23, 21, 54)',
    description: 'Grounded dark purple surfaces for search fields, bars, and modular controls',
    role: 'Controls & Inputs',
  },
  {
    name: 'Card Background',
    token: '--bg-card',
    hex: '#211C50',
    rgb: 'rgb(33, 28, 80)',
    description: 'Rich dark violet cards with high contrast for syllabus details and course stats',
    role: 'Content Surface',
  },
  {
    name: 'Primary Neon Pink',
    token: '--primary-pink',
    hex: '#F02BC8',
    rgb: 'rgb(240, 43, 200)',
    description: 'Vibrant highlight for high-priority deadlines, submit buttons, and active tabs',
    role: 'Primary Actions',
  },
  {
    name: 'Violet Accent',
    token: '--violet-accent',
    hex: '#9255FF',
    rgb: 'rgb(146, 85, 255)',
    description: 'Soft neon violet glow for borders, tags, secondary actions, and micro-interactions',
    role: 'Secondary & Glow',
  },
  {
    name: 'Main Text',
    token: '--text-main',
    hex: '#F7F3FF',
    rgb: 'rgb(247, 243, 255)',
    description: 'Crisp soft white for long reading sessions and dense course notes',
    role: 'Headings & Body',
  },
  {
    name: 'Secondary Text',
    token: '--text-secondary',
    hex: '#A7A0C5',
    rgb: 'rgb(167, 160, 197)',
    description: 'Subtle muted purple-gray for timestamps, metadata, and helper hints',
    role: 'Captions & Hints',
  },
]
