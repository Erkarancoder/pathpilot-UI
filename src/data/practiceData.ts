import type {
  PracticeCategory,
  PracticeQuestion,
  CodingProblem,
} from '../types'

export interface CategoryMetadata {
  id: PracticeCategory
  title: string
  description: string
  icon: string
  color: string
}

export const PRACTICE_CATEGORIES: CategoryMetadata[] = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Asymptotic complexity, linear data layouts, tree traversals, graphs, and dynamic programming.',
    icon: 'Layers',
    color: '#F02BC8',
  },
  {
    id: 'java',
    title: 'Java',
    description: 'JVM architecture, memory management, OOP encapsulation, inheritance, exceptions, and collections.',
    icon: 'Coffee',
    color: '#9255FF',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'ECMAScript specs, event loop, closures, prototypes, asynchronous Promises, and DOM manipulation.',
    icon: 'Code2',
    color: '#FF6BE6',
  },
  {
    id: 'react',
    title: 'React',
    description: 'Component architecture, Virtual DOM diffing, JSX, React Hooks lifecycle, and state synchronization.',
    icon: 'Atom',
    color: '#61DAFB',
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Dynamic typing, list comprehensions, generators, decorators, memory references, and standard library.',
    icon: 'Terminal',
    color: '#38BDF8',
  },
  {
    id: 'html-css',
    title: 'HTML and CSS',
    description: 'Semantic document markup, CSS box model, Flexbox axes, CSS Grid tracks, and responsive media rules.',
    icon: 'Palette',
    color: '#F43F5E',
  },
  {
    id: 'database',
    title: 'Database Fundamentals',
    description: 'Relational algebra, SQL DDL/DML, normalization forms (1NF-3NF), B-Tree indexes, and ACID guarantees.',
    icon: 'Database',
    color: '#10B981',
  },
]

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  /* ========================================================================== */
  /* 1. DATA STRUCTURES & ALGORITHMS (5 questions)                              */
  /* ========================================================================== */
  {
    id: 'dsa-q1',
    categoryId: 'dsa',
    categoryTitle: 'Data Structures & Algorithms',
    difficulty: 'Beginner',
    question: 'What is the worst-case time complexity of searching for an element in an unsorted array of N elements?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctAnswerIndex: 2,
    explanation:
      'In an unsorted array, elements have no predefined order. In the worst case (the element is at the very last index or not present at all), a linear scan must check every element sequentially, yielding O(N) worst-case time complexity.',
  },
  {
    id: 'dsa-q2',
    categoryId: 'dsa',
    categoryTitle: 'Data Structures & Algorithms',
    difficulty: 'Beginner',
    question: 'Which of the following data structures operates on a Last-In, First-Out (LIFO) protocol?',
    options: ['Queue', 'Stack', 'Circular Linked List', 'Binary Min-Heap'],
    correctAnswerIndex: 1,
    explanation:
      'A Stack follows the Last-In, First-Out (LIFO) order. Elements pushed last onto the stack top are popped off first. Queues follow First-In, First-Out (FIFO).',
  },
  {
    id: 'dsa-q3',
    categoryId: 'dsa',
    categoryTitle: 'Data Structures & Algorithms',
    difficulty: 'Intermediate',
    question:
      'In a balanced Binary Search Tree (such as an AVL or Red-Black Tree) containing N nodes, what is the worst-case time complexity for insertion?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctAnswerIndex: 1,
    explanation:
      'Self-balancing BSTs enforce tree height invariants such that height h <= c * log2(N). Since tree search and insertion proceed down a single path from root to leaf followed by O(1) rotation rebalancing steps, worst-case insertion is strictly bounded by O(log N).',
  },
  {
    id: 'dsa-q4',
    categoryId: 'dsa',
    categoryTitle: 'Data Structures & Algorithms',
    difficulty: 'Intermediate',
    question: 'What is the primary difference between Breadth-First Search (BFS) and Depth-First Search (DFS) on an unweighted graph?',
    options: [
      'BFS uses a LIFO stack while DFS uses a FIFO queue',
      'BFS guarantees finding the shortest path in terms of edge count; DFS does not',
      'DFS can only be used on Directed Acyclic Graphs (DAGs)',
      'BFS has an asymptotic time complexity of O(V^2) while DFS is O(V + E)',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Because BFS explores nodes level by level using a FIFO queue, the first time it reaches any vertex in an unweighted graph, it has traversed the minimum number of edges. DFS explores deep along individual branches and may discover a target via a longer path first.',
  },
  {
    id: 'dsa-q5',
    categoryId: 'dsa',
    categoryTitle: 'Data Structures & Algorithms',
    difficulty: 'Advanced',
    question: 'Which algorithmic paradigm does Dijkstra’s Shortest Path algorithm employ, and why can it fail with negative edge weights?',
    options: [
      'Divide and Conquer; it cannot split graphs with negative values',
      'Dynamic Programming; memoization tables cannot store negative values',
      'Greedy; once a vertex is marked visited with the minimum tentative distance, it is never relaxed again',
      'Backtracking; recursion depth exceeds maximum limits with negative values',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Dijkstra’s algorithm uses a greedy approach: it selects the unvisited node with the smallest distance and assumes that distance is finalized. If negative edge weights exist, a later path with a negative edge could reduce the cost to an already-finalized vertex, which Dijkstra never revisits.',
  },

  /* ========================================================================== */
  /* 2. JAVA (5 questions)                                                     */
  /* ========================================================================== */
  {
    id: 'java-q1',
    categoryId: 'java',
    categoryTitle: 'Java',
    difficulty: 'Beginner',
    question: 'In Java, which keyword is used to prevent a class from being subclassed (inherited)?',
    options: ['static', 'final', 'sealed', 'abstract'],
    correctAnswerIndex: 1,
    explanation:
      'The "final" keyword applied to a class declaration (e.g. "public final class String") prevents any other class from extending it. Applied to a variable, it makes it immutable/constant; applied to a method, it prevents method overriding.',
  },
  {
    id: 'java-q2',
    categoryId: 'java',
    categoryTitle: 'Java',
    difficulty: 'Beginner',
    question: 'Where are objects instantiated with the "new" keyword allocated in the Java Virtual Machine (JVM) memory model?',
    options: ['Call Stack', 'Heap Memory', 'Method Area', 'Program Counter Register'],
    correctAnswerIndex: 1,
    explanation:
      'In Java, all objects and array instances are allocated dynamically on the Garbage-Collected Heap. Local variable references (pointers) live in the thread stack frame, pointing to the heap-allocated object.',
  },
  {
    id: 'java-q3',
    categoryId: 'java',
    categoryTitle: 'Java',
    difficulty: 'Intermediate',
    question: 'What is the key functional difference between String, StringBuilder, and StringBuffer in Java?',
    options: [
      'String is mutable; StringBuilder is immutable; StringBuffer is thread-safe',
      'String is immutable; StringBuilder is mutable and not thread-safe; StringBuffer is mutable and synchronized (thread-safe)',
      'StringBuilder cannot be used inside loops due to memory overhead',
      'StringBuffer is faster than StringBuilder in single-threaded environments',
    ],
    correctAnswerIndex: 1,
    explanation:
      'String objects in Java are immutable. StringBuilder provides a mutable buffer for high-performance string concatenation in single threads. StringBuffer provides mutable character sequences with method synchronization, making it thread-safe at the cost of synchronization overhead.',
  },
  {
    id: 'java-q4',
    categoryId: 'java',
    categoryTitle: 'Java',
    difficulty: 'Intermediate',
    question: 'Which of the following describes Method Overloading vs. Method Overriding in Java?',
    options: [
      'Overloading occurs at runtime (dynamic polymorphism); Overriding occurs at compile-time',
      'Overloading requires the same parameter types with different return types',
      'Overloading has the same method name with different parameter signatures in the same class; Overriding redefines a superclass method in a subclass with the exact same signature',
      'Overriding can only be performed on private and static methods',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Overloading is compile-time (static) polymorphism where methods in the same class share names but have differing argument lists. Overriding is runtime (dynamic) polymorphism where a subclass provides a specific implementation of a non-static, non-final method defined in its superclass.',
  },
  {
    id: 'java-q5',
    categoryId: 'java',
    categoryTitle: 'Java',
    difficulty: 'Advanced',
    question: 'What happens when two distinct objects in Java have different hash codes according to the equals() and hashCode() contract?',
    options: [
      'The JVM throws an IllegalStateException',
      'They might still be equal according to equals()',
      'They are guaranteed to be not equal according to equals()',
      'They cannot be stored in a HashSet',
    ],
    correctAnswerIndex: 2,
    explanation:
      'The Java Object contract specifies that if two objects are equal according to equals(), they MUST have identical hashCode() values. Therefore, by contrapositive, if two objects have different hash codes, they must evaluate to false when compared via equals().',
  },

  /* ========================================================================== */
  /* 3. JAVASCRIPT (5 questions)                                               */
  /* ========================================================================== */
  {
    id: 'js-q1',
    categoryId: 'javascript',
    categoryTitle: 'JavaScript',
    difficulty: 'Beginner',
    question: 'What will be the output of `typeof null` in standard JavaScript?',
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    correctAnswerIndex: 2,
    explanation:
      'In JavaScript, `typeof null === "object"` is a legacy bug from the first implementation of JavaScript in 1995. Values were represented as a type tag and a value, where object references carried the tag 000; null was represented as the NULL pointer (0x00), thus incorrectly reporting "object".',
  },
  {
    id: 'js-q2',
    categoryId: 'javascript',
    categoryTitle: 'JavaScript',
    difficulty: 'Beginner',
    question: 'What is the primary difference between "==" and "===" in JavaScript comparisons?',
    options: [
      '"==" compares memory addresses while "===" compares values',
      '"==" performs type coercion before comparison; "===" requires both value and type equality without coercion',
      '"===" only works on primitive types; "==" works on objects',
      'There is no difference in modern ECMAScript standards',
    ],
    correctAnswerIndex: 1,
    explanation:
      'The abstract equality operator (==) applies implicit type conversion algorithms before comparing values (e.g. 5 == "5" is true). The strict equality operator (===) checks both type and value identity without coercion (5 === "5" is false).',
  },
  {
    id: 'js-q3',
    categoryId: 'javascript',
    categoryTitle: 'JavaScript',
    difficulty: 'Intermediate',
    question: 'What is a Closure in JavaScript?',
    options: [
      'A method that terminates browser event loop iterations',
      'A function bundled together with references to its surrounding lexical environment',
      'An encrypted JSON object stored in session memory',
      'A block scope wrapped inside an immediately invoked function expression (IIFE)',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A closure is the combination of a function and the lexical environment within which that function was declared. It gives an inner function access to an outer enclosing function’s scope even after the outer function has finished execution and returned.',
  },
  {
    id: 'js-q4',
    categoryId: 'javascript',
    categoryTitle: 'JavaScript',
    difficulty: 'Intermediate',
    question: 'In the JavaScript Event Loop, in what sequence are tasks, microtasks, and synchronous code processed?',
    options: [
      'Macrotasks -> Microtasks -> Synchronous Call Stack',
      'Microtasks -> Macrotasks -> Synchronous Call Stack',
      'Synchronous Call Stack -> Microtask Queue (Promises) -> Macrotask Queue (setTimeout/IO)',
      'Macrotask Queue -> Synchronous Call Stack -> Render Phase',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Synchronous code executes immediately on the Call Stack. When the stack empties, the engine flushes the entire Microtask Queue (resolved Promise callbacks, queueMicrotask). Once microtasks are clear and rendering checks complete, one task from the Macrotask Queue (setTimeout, I/O) is dequeued.',
  },
  {
    id: 'js-q5',
    categoryId: 'javascript',
    categoryTitle: 'JavaScript',
    difficulty: 'Advanced',
    question: 'What is the behavior of the "this" keyword inside an Arrow Function compared to a standard function declaration?',
    options: [
      'Arrow functions bind "this" dynamically to the element calling the method',
      'Arrow functions do not have their own "this"; they lexically inherit "this" from their enclosing execution scope',
      'Arrow functions automatically set "this" to the global window/global object',
      'Arrow functions can be rebound dynamically using Function.prototype.bind()',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Arrow functions do not have their own "this", "arguments", "super", or "new.target" bindings. Instead, "this" is captured lexically from the scope enclosing the arrow function at declaration time. Using call(), apply(), or bind() on an arrow function cannot alter its "this" value.',
  },

  /* ========================================================================== */
  /* 4. REACT (5 questions)                                                     */
  /* ========================================================================== */
  {
    id: 'react-q1',
    categoryId: 'react',
    categoryTitle: 'React',
    difficulty: 'Beginner',
    question: 'Why must React component state never be mutated directly (e.g., `this.state.count = 5` or `count = 5`)?',
    options: [
      'Direct mutation causes a browser memory leak and crash',
      'React detects state changes by shallow reference comparisons; mutating state directly bypasses the re-render scheduler',
      'JavaScript strict mode throws a syntax error when assigning to state',
      'State variables are stored in read-only web workers',
    ],
    correctAnswerIndex: 1,
    explanation:
      'React relies on immutability to detect state transitions via shallow reference equality (Object.is). When state is mutated directly, the memory reference remains identical, so React skips scheduling a re-render. State updater functions (setCount(prev => prev + 1)) ensure fresh object identities.',
  },
  {
    id: 'react-q2',
    categoryId: 'react',
    categoryTitle: 'React',
    difficulty: 'Beginner',
    question: 'Why does React require a unique "key" prop when rendering dynamic lists of elements?',
    options: [
      'To provide unique CSS class names for styling',
      'To enable keyboard accessibility screen reader tab stops',
      'To help React identify which items have changed, been added, or been removed during Virtual DOM reconciliation',
      'To ensure items are sorted alphabetically in the DOM',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Keys give elements a stable identity across renders. During Virtual DOM reconciliation (diffing), React matches keys in the old tree with keys in the new tree. Without stable keys (or with unstable keys like array indexes on reordered lists), React may mutate or destroy stateful child components incorrectly.',
  },
  {
    id: 'react-q3',
    categoryId: 'react',
    categoryTitle: 'React',
    difficulty: 'Intermediate',
    question: 'What is the primary purpose of the `useEffect` hook in functional React components?',
    options: [
      'To calculate synchronous mathematical operations before rendering JSX',
      'To synchronize a component with external systems (such as event listeners, timers, or network requests)',
      'To create custom CSS animations and style transitions',
      'To prevent unnecessary re-rendering of child components',
    ],
    correctAnswerIndex: 1,
    explanation:
      'The useEffect hook lets you synchronize your component with external systems outside of React (such as browser APIs, WebSockets, or third-party widgets). Calculating derived values from props and state should be performed synchronously during rendering, not inside an effect.',
  },
  {
    id: 'react-q4',
    categoryId: 'react',
    categoryTitle: 'React',
    difficulty: 'Intermediate',
    question: 'When should you use `useCallback` vs. `useMemo` in React performance optimization?',
    options: [
      '`useCallback` caches a calculated return value; `useMemo` caches a function definition',
      '`useCallback` caches a function definition between renders; `useMemo` caches the result of an expensive calculation',
      '`useCallback` can only be used with asynchronous functions',
      'Both hooks are identical and can be used interchangeably',
    ],
    correctAnswerIndex: 1,
    explanation:
      '`useCallback(fn, deps)` returns a memoized version of the callback function instance so that child components wrapped in React.memo do not re-render due to function prop reference changes. `useMemo(() => compute(), deps)` caches the computed value of the function invocation.',
  },
  {
    id: 'react-q5',
    categoryId: 'react',
    categoryTitle: 'React',
    difficulty: 'Advanced',
    question: 'What is the role of React Fiber in modern React architecture?',
    options: [
      'A server-side streaming engine that replaces Node.js',
      'A complete rewrite of React’s reconciliation engine enabling incremental rendering, interruptible work, and task prioritization',
      'A lightweight replacement for Redux state management',
      'A WebAssembly compiler for JSX syntax',
    ],
    correctAnswerIndex: 1,
    explanation:
      'React Fiber redesigned React’s reconciliation engine. Traditional React used recursive stack reconciliation that could not be paused, causing frame drops on heavy computations. Fiber represents components as individual units of work (fibers), allowing the scheduler to pause, prioritize, abort, or resume rendering work to keep the browser responsive.',
  },

  /* ========================================================================== */
  /* 5. PYTHON (5 questions)                                                    */
  /* ========================================================================== */
  {
    id: 'py-q1',
    categoryId: 'python',
    categoryTitle: 'Python',
    difficulty: 'Beginner',
    question: 'Which of the following built-in data types in Python is IMMUTABLE?',
    options: ['list', 'dict', 'set', 'tuple'],
    correctAnswerIndex: 3,
    explanation:
      'In Python, tuples, integers, floats, strings, and frozensets are immutable; once created, their values cannot be modified in place. Lists, dictionaries, and sets are mutable collections.',
  },
  {
    id: 'py-q2',
    categoryId: 'python',
    categoryTitle: 'Python',
    difficulty: 'Beginner',
    question: 'What does the `is` operator compare in Python, as opposed to `==`?',
    options: [
      '`is` compares values; `==` compares data types',
      '`is` checks memory identity (id(a) == id(b)); `==` checks value equality',
      '`is` checks if a variable exists in global scope',
      'There is no difference in Python 3',
    ],
    correctAnswerIndex: 1,
    explanation:
      'The `is` operator checks identity: whether two references point to the exact same object in RAM (id(a) == id(b)). The `==` operator evaluates value equality by invoking the object’s `__eq__()` method.',
  },
  {
    id: 'py-q3',
    categoryId: 'python',
    categoryTitle: 'Python',
    difficulty: 'Intermediate',
    question: 'What is the difference between a Generator (using `yield`) and a standard Python function returning a list?',
    options: [
      'Generators run in separate background threads simultaneously',
      'Generators produce items lazily one at a time on demand, consuming minimal memory instead of constructing the full collection in RAM',
      'Generators are faster than lists for indexing operations by integer position',
      'Functions using yield cannot accept parameters',
    ],
    correctAnswerIndex: 1,
    explanation:
      'When a function contains the `yield` statement, calling it returns a generator iterator. Instead of evaluating all elements at once and allocating a full list in memory, the generator pauses execution state at `yield` and resumes on next() calls, enabling lazy iteration over massive or infinite datasets.',
  },
  {
    id: 'py-q4',
    categoryId: 'python',
    categoryTitle: 'Python',
    difficulty: 'Intermediate',
    question: 'Why should you avoid using a mutable default argument like `def append_to(item, target=[])` in Python?',
    options: [
      'Python throws a SyntaxError at compile time',
      'The default list is instantiated once at function definition time, so all subsequent calls without an explicit argument mutate the same shared list instance',
      'Lists cannot be passed as arguments in Python 3',
      'Default arguments are deleted by garbage collection after the first call',
    ],
    correctAnswerIndex: 1,
    explanation:
      'In Python, default parameter values are evaluated once when the function definition statement is executed. If a mutable object (like a list or dict) is used as default, every call that omits the parameter modifies that same persistent object. Idiomatic Python uses `target=None` and initializes `target = []` inside the function.',
  },
  {
    id: 'py-q5',
    categoryId: 'python',
    categoryTitle: 'Python',
    difficulty: 'Advanced',
    question: 'What is the Global Interpreter Lock (GIL) in standard CPython, and what is its consequence on multi-threaded execution?',
    options: [
      'A security protocol that encrypts Python scripts during runtime',
      'A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes concurrently on multi-core CPUs',
      'A garbage collection mechanism that clears circular references in heap memory',
      'A lock that prevents file I/O operations from corrupting disk blocks',
    ],
    correctAnswerIndex: 1,
    explanation:
      'CPython’s memory management is not thread-safe. To prevent race conditions in reference counts, the GIL ensures that only one thread executes Python bytecode at any given moment, even on multi-core processors. CPU-bound parallel workloads in Python therefore use multiprocessing rather than multi-threading.',
  },

  /* ========================================================================== */
  /* 6. HTML AND CSS (5 questions)                                              */
  /* ========================================================================== */
  {
    id: 'html-q1',
    categoryId: 'html-css',
    categoryTitle: 'HTML and CSS',
    difficulty: 'Beginner',
    question: 'In the CSS Box Model, what components constitute the total rendered width of an element with `box-sizing: content-box`?',
    options: [
      'Width only',
      'Width + Padding + Border',
      'Width + Padding + Border + Margin',
      'Width + Margin only',
    ],
    correctAnswerIndex: 1,
    explanation:
      'With default `content-box`, the CSS `width` applies strictly to the content area. Padding and borders are added on top of the width (Rendered Width = width + padding-left + padding-right + border-left + border-right). Under `border-box`, width includes content, padding, and border.',
  },
  {
    id: 'html-q2',
    categoryId: 'html-css',
    categoryTitle: 'HTML and CSS',
    difficulty: 'Beginner',
    question: 'Which HTML5 element should be used to encapsulate the primary, unique content of a document, excluding headers, sidebars, and footers?',
    options: ['<section>', '<article>', '<main>', '<div>'],
    correctAnswerIndex: 2,
    explanation:
      'The `<main>` element represents the dominant content of the `<body>` of a document. It should not contain content repeated across pages like site logos, navigation bars, search forms, or copyright footers. There must not be more than one visible `<main>` element in a document.',
  },
  {
    id: 'html-q3',
    categoryId: 'html-css',
    categoryTitle: 'HTML and CSS',
    difficulty: 'Intermediate',
    question: 'What is the difference between `display: none` and `visibility: hidden` in CSS?',
    options: [
      '`display: none` leaves empty layout space; `visibility: hidden` collapses layout space',
      '`display: none` removes the element from document layout flow entirely; `visibility: hidden` hides the element visually while preserving its layout dimensions',
      '`visibility: hidden` disables all descendant CSS styles; `display: none` does not',
      'There is no difference in modern browser engines',
    ],
    correctAnswerIndex: 1,
    explanation:
      '`display: none` removes the element from the rendering tree entirely—it takes up zero space and surrounding elements collapse into its gap. `visibility: hidden` prevents the element from painting to screen, but its box dimensions, margin, and layout space remain intact in document flow.',
  },
  {
    id: 'html-q4',
    categoryId: 'html-css',
    categoryTitle: 'HTML and CSS',
    difficulty: 'Intermediate',
    question: 'How do `justify-content` and `align-items` operate in a Flexbox container with `flex-direction: column`?',
    options: [
      '`justify-content` aligns horizontally; `align-items` aligns vertically',
      '`justify-content` aligns along the vertical main axis; `align-items` aligns along the horizontal cross axis',
      'Both properties operate on the horizontal axis regardless of flex-direction',
      '`align-items` is ignored in column direction',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Flexbox axes depend on `flex-direction`. When `flex-direction: column`, the Main Axis runs vertically (top to bottom) and the Cross Axis runs horizontally (left to right). Therefore, `justify-content` distributes items along the vertical main axis, and `align-items` aligns along the horizontal cross axis.',
  },
  {
    id: 'html-q5',
    categoryId: 'html-css',
    categoryTitle: 'HTML and CSS',
    difficulty: 'Advanced',
    question: 'Which selector combination has the HIGHEST specificity according to the W3C CSS Cascading rules?',
    options: [
      '10 class selectors (`.a.b.c.d.e.f.g.h.i.j`)',
      'A single ID selector (`#header`)',
      'An element selector with 10 pseudo-elements',
      'A universal selector (`*`) with an attribute selector',
    ],
    correctAnswerIndex: 1,
    explanation:
      'CSS specificity is calculated using a 3-column tuple: (IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements). An ID selector has specificity (1, 0, 0). Class selectors have specificity (0, 1, 0). No amount of class selectors can override an ID selector in standard cascading order (unless `!important` is used).',
  },

  /* ========================================================================== */
  /* 7. DATABASE FUNDAMENTALS (5 questions)                                    */
  /* ========================================================================== */
  {
    id: 'db-q1',
    categoryId: 'database',
    categoryTitle: 'Database Fundamentals',
    difficulty: 'Beginner',
    question: 'In relational database theory, what does the ACID acronym stand for in transaction processing?',
    options: [
      'Access, Consistency, Integrity, Durability',
      'Atomicity, Consistency, Isolation, Durability',
      'Authentication, Concurrency, Indexing, Data-integrity',
      'Asynchronous, Cluster, Immutable, Distributed',
    ],
    correctAnswerIndex: 1,
    explanation:
      'ACID guarantees reliability in database transactions: Atomicity (all-or-nothing completion), Consistency (database transitions from one valid state to another satisfying all schema constraints), Isolation (concurrent transactions execute independently without interference), and Durability (committed transactions persist permanently even across hardware failures).',
  },
  {
    id: 'db-q2',
    categoryId: 'database',
    categoryTitle: 'Database Fundamentals',
    difficulty: 'Beginner',
    question: 'What is the primary purpose of a FOREIGN KEY constraint in a relational database table?',
    options: [
      'To encrypt sensitive columns stored across different cloud zones',
      'To enforce referential integrity between matching columns in two related tables',
      'To speed up arithmetic operations in SQL aggregation functions',
      'To allow null values in primary keys',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A FOREIGN KEY establishes a referential link between a column (or set of columns) in one table and the PRIMARY KEY of another table. It prevents invalid records from being inserted and prevents master records from being deleted if dependent child rows exist.',
  },
  {
    id: 'db-q3',
    categoryId: 'database',
    categoryTitle: 'Database Fundamentals',
    difficulty: 'Intermediate',
    question: 'What requirement must a relational table satisfy to achieve Third Normal Form (3NF)?',
    options: [
      'It must be in 2NF and contain no non-prime attribute transitively dependent on the primary key',
      'It must have zero primary keys and all columns stored as JSON',
      'It must only contain string data types',
      'Every column must be indexed with a B+ Tree',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A relation is in 3NF if and only if it is in 2NF (all non-key attributes fully depend on the entire primary key) and every non-prime attribute is non-transitively dependent on the primary key (no X -> Y -> Z dependencies where X is primary key and Y, Z are non-prime attributes).',
  },
  {
    id: 'db-q4',
    categoryId: 'database',
    categoryTitle: 'Database Fundamentals',
    difficulty: 'Intermediate',
    question: 'How does a B-Tree / B+ Tree index improve the time complexity of SQL `WHERE id = ?` queries over an unindexed table?',
    options: [
      'Reduces complexity from O(N^2) to O(N)',
      'Reduces complexity from an O(N) full table scan to an O(log N) tree traversal',
      'Converts SQL queries directly into hardware binary machine code',
      'Removes the need for disk storage by caching all tables in CPU L1 cache',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Without an index, the database engine must execute a sequential scan checking every row in the table (O(N) disk page reads). A B+ Tree organizes keys in self-balancing multi-way search tree blocks, allowing search operations to locate target row pointers in O(log_B N) node traversals.',
  },
  {
    id: 'db-q5',
    categoryId: 'database',
    categoryTitle: 'Database Fundamentals',
    difficulty: 'Advanced',
    question: 'What is a "Phantom Read" in database transaction isolation levels, and which ANSI SQL isolation level prevents it?',
    options: [
      'Reading uncommitted data; prevented by Read Committed',
      'Reading modified data within the same transaction; prevented by Read Uncommitted',
      'A transaction queries rows satisfying a search condition, but a concurrent committed transaction inserts/deletes rows matching that condition; prevented by Serializable isolation',
      'Reading corrupted disk sectors; prevented by Repeatable Read',
    ],
    correctAnswerIndex: 2,
    explanation:
      'A phantom read occurs when a transaction executes a range query (e.g. `SELECT * FROM Orders WHERE amount > 100`) twice and sees newly inserted or deleted rows committed by another transaction in between. The Serializable isolation level (via predicate locking or snapshot isolation with serializability checks) guarantees prevention of phantom reads.',
  },
]

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table', 'O(N) Time'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    testCases: [
      {
        id: 'tc-1',
        input: 'nums = [2, 7, 11, 15], target = 9',
        expectedOutput: '[0, 1]',
        isSample: true,
      },
      {
        id: 'tc-2',
        input: 'nums = [3, 2, 4], target = 6',
        expectedOutput: '[1, 2]',
        isSample: true,
      },
      {
        id: 'tc-3',
        input: 'nums = [3, 3], target = 6',
        expectedOutput: '[0, 1]',
        isSample: false,
      },
    ],
    expectedKeywords: ['map', 'hash', 'target', 'index', 'for', 'return'],
    starterCode: {
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        
        return new int[] {};
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`,
    },
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    category: 'Stack',
    difficulty: 'Easy',
    tags: ['String', 'Stack', 'LIFO'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "(]"',
        output: 'false',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.',
    ],
    testCases: [
      {
        id: 'tc-vp-1',
        input: 's = "()"',
        expectedOutput: 'true',
        isSample: true,
      },
      {
        id: 'tc-vp-2',
        input: 's = "()[]{}"',
        expectedOutput: 'true',
        isSample: true,
      },
      {
        id: 'tc-vp-3',
        input: 's = "(]"',
        expectedOutput: 'false',
        isSample: false,
      },
    ],
    expectedKeywords: ['stack', 'push', 'pop', 'isEmpty', 'empty'],
    starterCode: {
      java: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        
        return stack.isEmpty();
    }
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack`,
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
      cpp: `#include <string>
#include <stack>

class Solution {
public:
    bool isValid(std::string s) {
        std::stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else if (st.empty() || st.top() != c) return false;
            else st.pop();
        }
        return st.empty();
    }
};`,
    },
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Pointers', 'In-place'],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.

Example: \`1 -> 2 -> 3 -> 4 -> 5\` becomes \`5 -> 4 -> 3 -> 2 -> 1\`.`,
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
      },
      {
        input: 'head = [1, 2]',
        output: '[2, 1]',
      },
      {
        input: 'head = []',
        output: '[]',
      },
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
    testCases: [
      {
        id: 'tc-rll-1',
        input: 'head = [1, 2, 3, 4, 5]',
        expectedOutput: '[5, 4, 3, 2, 1]',
        isSample: true,
      },
      {
        id: 'tc-rll-2',
        input: 'head = [1, 2]',
        expectedOutput: '[2, 1]',
        isSample: true,
      },
    ],
    expectedKeywords: ['prev', 'curr', 'next', 'null', 'while'],
    starterCode: {
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        
        return prev;
    }
}`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
        return prev`,
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function reverseList(head) {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
    },
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray (Kadane\'s)',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    tags: ['Array', 'Divide and Conquer', 'DP', 'Kadane'],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.

A **subarray** is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      {
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        output: '6',
        explanation: 'The subarray [4, -1, 2, 1] has the largest sum 6.',
      },
      {
        input: 'nums = [1]',
        output: '1',
      },
      {
        input: 'nums = [5, 4, -1, 7, 8]',
        output: '23',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    testCases: [
      {
        id: 'tc-ms-1',
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        expectedOutput: '6',
        isSample: true,
      },
      {
        id: 'tc-ms-2',
        input: 'nums = [1]',
        expectedOutput: '1',
        isSample: true,
      },
      {
        id: 'tc-ms-3',
        input: 'nums = [5, 4, -1, 7, 8]',
        expectedOutput: '23',
        isSample: false,
      },
    ],
    expectedKeywords: ['max', 'Math.max', 'sum', 'currentSum', 'maxSum'],
    starterCode: {
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        
        return maxSoFar;
    }
}`,
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        max_so_far = nums[0]
        current_max = nums[0]
        
        for x in nums[1:]:
            current_max = max(x, current_max + x)
            max_so_far = max(max_so_far, current_max)
            
        return max_so_far`,
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let currentMax = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    
    return maxSoFar;
}`,
      cpp: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        
        for (size_t i = 1; i < nums.size(); i++) {
            currentMax = std::max(nums[i], currentMax + nums[i]);
            maxSoFar = std::max(maxSoFar, currentMax);
        }
        
        return maxSoFar;
    }
};`,
    },
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'Binary Search',
    difficulty: 'Easy',
    tags: ['Array', 'Binary Search', 'O(log N)'],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`.

If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4',
      },
      {
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.',
    ],
    testCases: [
      {
        id: 'tc-bs-1',
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
        expectedOutput: '4',
        isSample: true,
      },
      {
        id: 'tc-bs-2',
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2',
        expectedOutput: '-1',
        isSample: true,
      },
    ],
    expectedKeywords: ['low', 'high', 'mid', 'while', '<=', 'target'],
    starterCode: {
      java: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        
        return -1;
    }
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    
    return -1;
}`,
      cpp: `#include <vector>

class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        int low = 0;
        int high = nums.size() - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        
        return -1;
    }
};`,
    },
  },
]
