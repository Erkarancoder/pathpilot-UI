import type { AssessmentQuestion } from '../types'

export const LEARNING_GOAL_OPTIONS: string[] = [
  'Become a Full Stack Developer',
  'Improve DSA and problem solving',
  'Learn AI and Machine Learning',
  'Prepare for internships and placements',
  'Improve programming fundamentals',
  'Build real-world projects',
]

export const SKILL_OPTIONS: string[] = [
  'HTML/CSS',
  'JavaScript',
  'React',
  'Java',
  'Python',
  'Data Structures & Algorithms',
  'Database Fundamentals',
  'Git and GitHub',
]

export const DEGREE_OPTIONS: string[] = [
  'B.Tech / B.E. Computer Science',
  'B.Tech Information Technology',
  'BCA / MCA',
  'B.S. Software Engineering',
  'Electronics & Communication (ECE)',
  'Data Science / AI Specialization',
  'Other Engineering Discipline',
]

export const YEAR_SEMESTER_OPTIONS: string[] = [
  '1st Year (Semester 1 - 2)',
  '2nd Year (Semester 3 - 4)',
  '3rd Year (Semester 5 - 6)',
  'Final Year (Semester 7 - 8)',
  'Graduate / Masters Program',
]

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    topic: 'Programming Fundamentals',
    question: 'What is the primary risk of omitting a base case in a recursive function?',
    options: [
      'The compiler immediately throws a syntax error during static build',
      'Unbounded stack frame allocations trigger a stack overflow runtime exception',
      'The function automatically converts into an iterative loop',
      'Global scope variables are permanently deleted from heap memory',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Without an explicit termination condition (base case), each recursive invocation pushes a new activation frame onto the call stack until memory is exhausted, causing a stack overflow.',
  },
  {
    id: 2,
    topic: 'Data Structures: Arrays vs Lists',
    question:
      'What is the worst-case time complexity of prepending an element to an array of size N vs a singly linked list with a known head pointer?',
    options: [
      'Array: O(1), Linked List: O(N)',
      'Array: O(N), Linked List: O(1)',
      'Array: O(log N), Linked List: O(1)',
      'Array: O(N), Linked List: O(N)',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Prepending to a contiguous array requires shifting all N existing elements by one position (O(N)). In a linked list, inserting before the head only requires pointer adjustments (O(1)).',
  },
  {
    id: 3,
    topic: 'Algorithms: Binary Search',
    question:
      'Which fundamental precondition must an array satisfy to guarantee O(log N) binary search lookup?',
    options: [
      'All elements must be unique prime numbers',
      'The array must be sorted monotonically and support direct indexed random access',
      'The array must be implemented as a circular linked list',
      'The total number of elements must be an exact power of 2',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Binary search relies on evaluating the midpoint of a monotonic sequence with O(1) random access to discard half of the remaining search space on each step.',
  },
  {
    id: 4,
    topic: 'Web Fundamentals: JavaScript Event Loop',
    question:
      'In standard JavaScript, what is the exact execution order of: console.log("A"), setTimeout(() => console.log("B"), 0), and Promise.resolve().then(() => console.log("C"))?',
    options: [
      'A, B, C',
      'B, A, C',
      'A, C, B',
      'C, A, B',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Synchronous code ("A") executes first in the call stack. Microtasks like resolved Promise callbacks ("C") run immediately after the current stack clears, followed by macrotasks like setTimeout callbacks ("B").',
  },
  {
    id: 5,
    topic: 'Data Structures: Queues & Traversals',
    question:
      'Which data structure operates on a First-In, First-Out (FIFO) policy and forms the backbone of Breadth-First Search (BFS)?',
    options: [
      'Stack (LIFO)',
      'Queue (FIFO)',
      'Max-Binary Heap',
      'Disjoint Set Union (DSU)',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A Queue enforces First-In, First-Out ordering. In BFS, vertices are visited level-by-level in the order they were first discovered.',
  },
  {
    id: 6,
    topic: 'Web Fundamentals: HTTP Protocols',
    question:
      'Which standard HTTP status code signifies that an API request has successfully created a new resource on the server?',
    options: [
      '200 OK',
      '201 Created',
      '204 No Content',
      '304 Not Modified',
    ],
    correctAnswerIndex: 1,
    explanation:
      'HTTP 201 Created indicates that the request succeeded and led to the creation of a new server resource, commonly returned by POST endpoints.',
  },
  {
    id: 7,
    topic: 'Database Fundamentals: SQL Joins',
    question:
      'Which SQL JOIN retrieves all records from the primary (left) table and matching records from the secondary (right) table, filling non-matches with NULL?',
    options: [
      'INNER JOIN',
      'LEFT OUTER JOIN',
      'CROSS JOIN',
      'NATURAL JOIN',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A LEFT OUTER JOIN preserves all rows from the left table regardless of whether there is an associated record in the right table.',
  },
  {
    id: 8,
    topic: 'Data Structures: Binary Search Trees',
    question:
      'In a balanced Binary Search Tree (such as an AVL or Red-Black Tree) with N nodes, what is the worst-case search time complexity?',
    options: [
      'O(log N)',
      'O(N)',
      'O(1)',
      'O(N log N)',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Self-balancing trees ensure the tree height remains bounded by O(log N). Thus, lookup, insertion, and deletion all maintain a guaranteed worst-case time complexity of O(log N).',
  },
]

export function calculateSkillSummary(score: number, total: number): {
  level: string
  summary: string
  recommendation: string
} {
  const percentage = Math.round((score / total) * 100)

  if (percentage >= 85) {
    return {
      level: 'Advanced / Placement Ready',
      summary:
        'Outstanding technical fundamentals across data structures, asynchronous runtime mechanics, and database design.',
      recommendation:
        'Focus on advanced system design, distributed consistency patterns, and competitive algorithmic optimization for Tier-1 engineering interviews.',
    }
  } else if (percentage >= 60) {
    return {
      level: 'Intermediate Problem Solver',
      summary:
        'Solid foundation in core computer science principles with minor gaps in asymptotic analysis or web runtime nuances.',
      recommendation:
        'Strengthen tree and graph traversal implementations, and review asynchronous microtask queues and database indexing before midterm technical labs.',
    }
  } else {
    return {
      level: 'Foundational Learner',
      summary:
        'Good baseline understanding. Ready for structured daily roadmaps to reinforce core programming logic and data structures.',
      recommendation:
        'Start with daily 25-minute practice sprints on array manipulations, recursion base cases, and basic time complexity before advancing to dynamic programming.',
    }
  }
}
