import type { LearningPath } from '../types'

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'full-stack',
    title: 'Full Stack Web Development',
    shortDescription:
      'Master modern frontend architectures, robust server-side APIs, and relational databases for production applications.',
    fullDescription:
      'A structured semester-aligned engineering path covering everything from DOM semantics and reactive state to RESTful service architecture, SQL migrations, and secure JWT authentication.',
    icon: 'Code2',
    targetGoal: 'Become a Full Stack Developer',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    modules: [
      {
        id: 'fs-mod-1',
        title: 'Modern Web Foundations & Semantic DOM',
        description:
          'Core browser execution models, semantic document structures, and accessibility standards required for scalable web apps.',
        level: 'Beginner',
        order: 1,
        estimatedHours: 12,
        lessons: [
          {
            id: 'fs-les-1',
            title: 'HTML5 Semantics, Document Outlines & ARIA',
            durationMinutes: 45,
            objective:
              'Structure web pages using semantic HTML elements and accessible landmark regions rather than unstyled div tags.',
            explanation:
              'The browser converts HTML text into the Document Object Model (DOM) and an Accessibility Tree. Using semantic elements like <main>, <article>, <section>, and <nav> allows assistive devices to parse document hierarchy without manual ARIA workarounds. Semantic layouts also improve Search Engine Optimization (SEO) and reduce CSS selector complexity.',
            practiceActivity:
              'Refactor a generic multi-container layout using correct landmark elements (<header>, <nav>, <main>, <aside>, <footer>) and verify its accessibility tree in Chrome DevTools Elements tab.',
            resource: {
              title: 'MDN Web Docs: HTML Elements Reference',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
              type: 'docs',
            },
          },
          {
            id: 'fs-les-2',
            title: 'CSS Box Model, Flexbox & CSS Grid Mechanics',
            durationMinutes: 50,
            objective:
              'Master dimensional constraints, margin collapsing, flex alignment axes, and multi-track grid coordinates.',
            explanation:
              'Every element on a web page is rendered as a rectangular box comprising content, padding, border, and margin. Flexbox operates on a one-dimensional flow (row or column) best suited for navigation bars and toolbars. CSS Grid provides a two-dimensional grid coordinate system suited for responsive application page layouts with fractional (fr) units and auto-fit templates.',
            practiceActivity:
              'Build a 12-column responsive dashboard shell using CSS Grid with collapsible sidebar tracks and responsive auto-wrapping card items.',
            resource: {
              title: 'MDN Web Docs: CSS Grid Layout Guide',
              url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout',
              type: 'docs',
            },
          },
          {
            id: 'fs-les-3',
            title: 'Modern JavaScript (ES6+), Event Loop & Microtasks',
            durationMinutes: 60,
            objective:
              'Understand asynchronous JavaScript, Promise chains, the call stack, macrotask queue, and microtask resolution.',
            explanation:
              'JavaScript is single-threaded with a non-blocking event loop. Synchronous code runs immediately on the call stack. Promises and queueMicrotask callbacks are resolved at the end of the current tick before the browser repaints. setTimeout and network I/O callbacks are queued in the macrotask queue.',
            practiceActivity:
              'Write an asynchronous data polling utility with exponential backoff and timeout cancellation using AbortController and async/await.',
            resource: {
              title: 'MDN Web Docs: The Event Loop & Concurrency',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'fs-mod-2',
        title: 'Reactive Frontend Engineering with React & TypeScript',
        description:
          'Component lifecycles, unidirectional data flow, custom hooks, and strict type safety for interactive UIs.',
        level: 'Intermediate',
        order: 2,
        estimatedHours: 18,
        lessons: [
          {
            id: 'fs-les-4',
            title: 'Component Declarative Architecture & Fiber Reconciliation',
            durationMinutes: 50,
            objective:
              'Build reusable typed React components and understand how the virtual DOM diffing algorithm reconciles state mutations.',
            explanation:
              'React uses a lightweight in-memory representation of the UI (Virtual DOM) and batches component re-renders into phases (Render phase and Commit phase). Keys help React identify which items have changed, been added, or been removed in lists. Unstable keys like Math.random() destroy component internal state.',
            practiceActivity:
              'Build a high-performance searchable student roster table with TypeScript interfaces, sorting props, and stable key identifiers.',
            resource: {
              title: 'React Documentation: Describing the UI',
              url: 'https://react.dev/learn/describing-the-ui',
              type: 'docs',
            },
          },
          {
            id: 'fs-les-5',
            title: 'Custom Hooks, Effect Lifecycles & State Management',
            durationMinutes: 65,
            objective:
              'Encapsulate stateful logic into custom hooks while avoiding synchronization race conditions and cascading re-renders.',
            explanation:
              'Hooks let you extract reusable component logic without changing your component hierarchy. useEffect must only be used to synchronize React with external systems (such as event listeners or WebSockets). Calculating derived state during render is preferred over syncing state in effects.',
            practiceActivity:
              'Create a typed useLocalStorage hook with JSON parsing, fallback values, and cross-tab storage event listeners.',
            resource: {
              title: 'React Documentation: Reusing Logic with Custom Hooks',
              url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
              type: 'docs',
            },
          },
          {
            id: 'fs-les-6',
            title: 'Client-Side Routing, Nested Layouts & Route Guards',
            durationMinutes: 45,
            objective:
              'Configure client-side URL routing with history pushState, nested layout outlets, and protected redirect boundaries.',
            explanation:
              'Client-side routers intercept link clicks and manipulate browser session history using the History API without requesting a full page reload from the origin server. Nested routes enable persisting common layouts (like topbars and sidebars) while switching interior views.',
            practiceActivity:
              'Configure a React Router structure with an AppLayout shell, dynamic path params (/courses/:id), and a 404 fallback page.',
            resource: {
              title: 'React Router Documentation: Tutorial',
              url: 'https://reactrouter.com/en/main/start/tutorial',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'fs-mod-3',
        title: 'Backend Services, Databases & Security Protocols',
        description:
          'Design RESTful HTTP endpoints, structured SQL schemas, relation constraints, and token-based authentication.',
        level: 'Advanced',
        order: 3,
        estimatedHours: 24,
        lessons: [
          {
            id: 'fs-les-7',
            title: 'RESTful API Architecture, Middleware & Request Validation',
            durationMinutes: 60,
            objective:
              'Design idempotently mapped REST endpoints using standard HTTP status codes, middleware validation pipelines, and error handling.',
            explanation:
              'REST architectures rely on stateless request handling where each request carries sufficient authentication and authorization context. Middlewares chain request processing (parsing, authentication, schema validation) before hitting business controllers.',
            practiceActivity:
              'Create an Express server endpoint that validates request payload schemas with Zod and returns typed HTTP 400 Bad Request responses with detailed field validation errors.',
            resource: {
              title: 'MDN Web Docs: HTTP Methods & Status Codes',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods',
              type: 'docs',
            },
          },
          {
            id: 'fs-les-8',
            title: 'Relational Database Schema Design & SQL Normalization',
            durationMinutes: 70,
            objective:
              'Model normalized relational schemas (1NF through 3NF) with foreign keys, cascading rules, and index optimization.',
            explanation:
              'Relational databases enforce data integrity through constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL). Normalization eliminates data redundancy and prevents insert, update, and delete anomalies. B-tree indexes speed up WHERE queries from O(N) sequential table scans to O(log N) lookups.',
            practiceActivity:
              'Write SQL DDL statements for a university enrollment database: Students, Courses, Professors, and Enrollments with composite primary keys.',
            resource: {
              title: 'PostgreSQL Documentation: The SQL Language',
              url: 'https://www.postgresql.org/docs/current/sql.html',
              type: 'docs',
            },
          },
          {
            id: 'fs-les-9',
            title: 'Authentication & Session Security (JWT, CORS & OWASP)',
            durationMinutes: 60,
            objective:
              'Implement secure authentication using salted password hashing, signed JSON Web Tokens (JWT), and OWASP security headers.',
            explanation:
              'Passwords must never be stored in plaintext; algorithms like bcrypt use iterative work factors and cryptographic salts to resist rainbow table attacks. JWTs contain base64url-encoded headers, payloads, and cryptographic HMAC or RSA signatures verified without database lookups.',
            practiceActivity:
              'Implement a registration and login authentication pipeline with bcrypt password hashing, JWT issue, and an authorization middleware extracting bearer tokens.',
            resource: {
              title: 'OWASP Foundation: Web Security Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/',
              type: 'docs',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    shortDescription:
      'Rigorous mastery of computational complexity, linear and hierarchical structures, sorting algorithms, and dynamic programming.',
    fullDescription:
      'The definitive computer science curriculum designed to help college students bridge theoretical textbook proofs with competitive programming and top-tier placement assessments.',
    icon: 'Layers',
    targetGoal: 'Improve DSA and problem solving',
    tags: ['Algorithms', 'Data Structures', 'C++', 'Java', 'Complexity'],
    modules: [
      {
        id: 'dsa-mod-1',
        title: 'Asymptotic Analysis & Linear Structures',
        description:
          'Big-O notation, memory layout of contiguous arrays, pointer manipulation in linked lists, and stack/queue primitives.',
        level: 'Beginner',
        order: 1,
        estimatedHours: 14,
        lessons: [
          {
            id: 'dsa-les-1',
            title: 'Big-O, Big-Omega, Big-Theta & Space-Time Tradeoffs',
            durationMinutes: 40,
            objective:
              'Evaluate code efficiency mathematically across worst-case, best-case, and average-case scenarios using asymptotic limits.',
            explanation:
              'Asymptotic analysis describes limiting behavior of functions as input size N grows towards infinity. Big-O gives an asymptotic upper bound (worst-case), Big-Omega gives a lower bound, and Big-Theta gives a tight bound. Constants and lower-order terms are dropped because input growth dominates running time.',
            practiceActivity:
              'Analyze the time and auxiliary space complexity of 5 common algorithms (Binary Search, Merge Sort, Nested Loops, Matrix Multiplication).',
            resource: {
              title: 'GeeksforGeeks: Analysis of Algorithms',
              url: 'https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/',
              type: 'docs',
            },
          },
          {
            id: 'dsa-les-2',
            title: 'Dynamic Arrays & Two-Pointer In-Place Strategies',
            durationMinutes: 50,
            objective:
              'Implement array resizing amortized analysis and solve two-pointer search patterns in O(N) time without extra memory.',
            explanation:
              'Standard arrays have fixed memory size allocated contiguously in RAM, granting O(1) random access via base address arithmetic. Dynamic arrays double capacity when full; inserting N elements takes O(N) total work, giving an amortized cost of O(1) per append operation.',
            practiceActivity:
              'Solve the Two-Sum problem on a sorted array using converging two-pointers, followed by Container With Most Water.',
            resource: {
              title: 'LeetCode Problem: Two Sum II (Sorted)',
              url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
              type: 'docs',
            },
          },
          {
            id: 'dsa-les-3',
            title: 'Linked Lists & Fast/Slow Pointer Cycle Detection',
            durationMinutes: 55,
            objective:
              'Manipulate node pointers in singly and doubly linked lists and detect cycles using Floyd’s Tortoise and Hare algorithm.',
            explanation:
              'Linked lists store elements non-contiguously in heap memory where each node holds data and a pointer to the next node. Inserting at the head is O(1), but accessing the k-th node requires O(k) linear traversal. Floyd’s cycle detection uses two pointers moving at speeds 1 and 2; if a cycle exists, they must meet inside the loop.',
            practiceActivity:
              'Implement iterative and recursive linked list reversal, followed by detecting whether a linked list contains a cycle.',
            resource: {
              title: 'GeeksforGeeks: Detect loop in a linked list',
              url: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'dsa-mod-2',
        title: 'Hierarchical Trees, Heaps & Search Algorithms',
        description:
          'Binary search trees, balanced invariants, priority queues, and divide-and-conquer sorting algorithms.',
        level: 'Intermediate',
        order: 2,
        estimatedHours: 20,
        lessons: [
          {
            id: 'dsa-les-4',
            title: 'Binary Search Trees & Recursive Tree Traversals',
            durationMinutes: 55,
            objective:
              'Construct BSTs and execute Inorder, Preorder, Postorder, and Level-Order (BFS) traversals.',
            explanation:
              'A Binary Search Tree preserves the invariant that every node in the left subtree has a key smaller than the root, and every node in the right subtree has a key greater. An inorder traversal of a valid BST outputs keys in strictly ascending sorted order.',
            practiceActivity:
              'Write functions to validate whether a given binary tree satisfies the BST property and compute the maximum tree depth.',
            resource: {
              title: 'GeeksforGeeks: Tree Traversals',
              url: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/',
              type: 'docs',
            },
          },
          {
            id: 'dsa-les-5',
            title: 'Binary Heaps, Priority Queues & Top-K Elements',
            durationMinutes: 60,
            objective:
              'Understand complete binary tree array representations, heapify operations, and min/max heap extraction.',
            explanation:
              'A binary heap is a complete binary tree satisfying the heap property (parent key is always <= children in a min-heap). Because it is complete, it can be represented compactly as an array without pointers (parent of i is floor((i-1)/2)). Peek is O(1) and insertion/extraction is O(log N).',
            practiceActivity:
              'Implement a solution for finding the K-th largest element in an unsorted stream using a Min-Heap of size K.',
            resource: {
              title: 'GeeksforGeeks: Binary Heap',
              url: 'https://www.geeksforgeeks.org/binary-heap/',
              type: 'docs',
            },
          },
          {
            id: 'dsa-les-6',
            title: 'Hash Tables, Collision Resolution & Amortized O(1)',
            durationMinutes: 50,
            objective:
              'Implement hash functions, handle bucket collisions via separate chaining and open addressing, and analyze load factor resizing.',
            explanation:
              'Hash tables map keys to index locations using a deterministic hash function modulo table size. Collisions happen when two keys hash to the same bucket. When the load factor (N / capacity) exceeds a threshold (typically 0.75), the table doubles in size and rehashes all elements.',
            practiceActivity:
              'Design a custom HashMap class supporting put, get, and remove operations in O(1) expected time using separate chaining.',
            resource: {
              title: 'GeeksforGeeks: Hashing Data Structure',
              url: 'https://www.geeksforgeeks.org/hashing-data-structure/',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'dsa-mod-3',
        title: 'Graphs, Shortest Paths & Dynamic Programming',
        description:
          'Graph representations, topological sort, Dijkstra’s algorithm, and DP memoization/tabulation techniques.',
        level: 'Advanced',
        order: 3,
        estimatedHours: 26,
        lessons: [
          {
            id: 'dsa-les-7',
            title: 'Graph Traversals (BFS, DFS) & Cycle Detection',
            durationMinutes: 65,
            objective:
              'Model real-world networks using adjacency lists and traverse them using breadth-first search and depth-first search.',
            explanation:
              'Graphs consist of vertices V and edges E. BFS uses a FIFO queue to explore nodes level-by-level, yielding the shortest path in unweighted graphs. DFS uses a LIFO stack (or recursion) to explore paths until a dead end, making it ideal for connectivity and cycle detection.',
            practiceActivity:
              'Solve Course Schedule (detecting directed cycles in prerequisite dependencies using Kahn’s Algorithm / Topological Sort).',
            resource: {
              title: 'GeeksforGeeks: Breadth First Search or BFS for a Graph',
              url: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/',
              type: 'docs',
            },
          },
          {
            id: 'dsa-les-8',
            title: 'Shortest Path Algorithms: Dijkstra & Priority Queues',
            durationMinutes: 70,
            objective:
              'Find the shortest path in non-negative weighted graphs in O((V + E) log V) time using greedy relaxation.',
            explanation:
              'Dijkstra’s algorithm maintains a distance array initialized to infinity and iteratively relaxes edges originating from the unvisited vertex with the minimum tentative distance. Using a min-priority queue guarantees that the chosen vertex already has its optimal shortest distance locked.',
            practiceActivity:
              'Implement Dijkstra’s algorithm on an adjacency list to find the minimum transit cost between network nodes.',
            resource: {
              title: 'GeeksforGeeks: Dijkstra’s Shortest Path Algorithm',
              url: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/',
              type: 'docs',
            },
          },
          {
            id: 'dsa-les-9',
            title: 'Dynamic Programming: Memoization vs. Tabulation',
            durationMinutes: 80,
            objective:
              'Deconstruct complex optimization problems into optimal substructures and overlapping subproblems.',
            explanation:
              'Dynamic Programming solves subproblems once and stores their solutions to avoid combinatorial explosion (e.g., exponential O(2^N) reduced to polynomial O(N)). Top-down uses recursion + hash/array memoization. Bottom-up tabulation iteratively fills a DP table in topological dependency order.',
            practiceActivity:
              'Solve the 0/1 Knapsack problem, Coin Change, and Longest Common Subsequence (LCS) using 2D and space-optimized 1D tabulation.',
            resource: {
              title: 'GeeksforGeeks: Dynamic Programming',
              url: 'https://www.geeksforgeeks.org/dynamic-programming/',
              type: 'docs',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI and Machine Learning',
    shortDescription:
      'Foundations of mathematical modeling, supervised & unsupervised machine learning, neural networks, and modern deep learning.',
    fullDescription:
      'Curated for college students preparing for research and AI industry roles: linear algebra matrix fundamentals, statistical learning theory, loss landscapes, and neural network engineering in PyTorch.',
    icon: 'Bot',
    targetGoal: 'Learn AI and Machine Learning',
    tags: ['Python', 'PyTorch', 'NumPy', 'Scikit-Learn', 'Math'],
    modules: [
      {
        id: 'ai-mod-1',
        title: 'Mathematical Foundations & Data Preprocessing',
        description:
          'Matrix vectorization in NumPy, probability distributions, gradient vectors, and exploratory data analysis.',
        level: 'Beginner',
        order: 1,
        estimatedHours: 14,
        lessons: [
          {
            id: 'ai-les-1',
            title: 'Linear Algebra: Vectors, Dot Products & Matrix Multiplication',
            durationMinutes: 50,
            objective:
              'Represent datasets as feature matrices and vectorize mathematical calculations using NumPy without slow Python loops.',
            explanation:
              'Machine learning models operate on high-dimensional vectors and tensors. Dot products compute projections and similarity between vectors. Matrix multiplication transforms coordinates across vector spaces. Vectorization executes operations simultaneously via SIMD hardware instructions.',
            practiceActivity:
              'Vectorize feature standardization ((X - mean) / std) and cosine similarity across 1,000 document embedding vectors using NumPy.',
            resource: {
              title: 'NumPy Documentation: Quickstart Guide',
              url: 'https://numpy.org/doc/stable/user/quickstart.html',
              type: 'docs',
            },
          },
          {
            id: 'ai-les-2',
            title: 'Multivariable Calculus: Gradients, Hessians & Chain Rule',
            durationMinutes: 55,
            objective:
              'Compute partial derivatives and understand how the gradient vector points in the direction of steepest scalar ascent.',
            explanation:
              'Training an ML model involves finding model parameters that minimize an empirical loss function. The gradient vector collects all partial derivatives with respect to each weight. Gradient descent updates weights in the negative gradient direction scaled by the learning rate alpha.',
            practiceActivity:
              'Derive the analytical gradient of Mean Squared Error (MSE) loss for multivariate linear regression and implement batch gradient descent in Python.',
            resource: {
              title: 'Khan Academy: Multivariable Calculus (Gradients)',
              url: 'https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/gradient-and-directional-derivatives/v/gradient',
              type: 'docs',
            },
          },
          {
            id: 'ai-les-3',
            title: 'Data Pipelines: Imputation, Encoding & Train-Test Splits',
            durationMinutes: 45,
            objective:
              'Preprocess raw tabular data without data leakage between training, validation, and testing partitions.',
            explanation:
              'Data leakage occurs when information outside the training dataset is mistakenly used to create the model (e.g., fitting an imputer or scaler on the entire dataset instead of training split only). Categorical features must be encoded via One-Hot Encoding or Target Encoding.',
            practiceActivity:
              'Build a Scikit-Learn Pipeline combining SimpleImputer, StandardScaler, and OneHotEncoder for tabular college dataset modeling.',
            resource: {
              title: 'Scikit-Learn: Preprocessing Data',
              url: 'https://scikit-learn.org/stable/modules/preprocessing.html',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'ai-mod-2',
        title: 'Supervised Learning & Model Validation',
        description:
          'Linear & logistic regression, tree ensembles (Random Forests, XGBoost), regularization, and cross-validation.',
        level: 'Intermediate',
        order: 2,
        estimatedHours: 18,
        lessons: [
          {
            id: 'ai-les-4',
            title: 'Linear & Logistic Regression with L1/L2 Regularization',
            durationMinutes: 60,
            objective:
              'Fit parametric linear decision boundaries, interpret odd ratios via sigmoid, and prevent overfitting using Ridge and Lasso.',
            explanation:
              'Logistic regression applies the non-linear Sigmoid function to linear combinations of features to produce probability estimates between 0 and 1. L2 regularization (Ridge) penalizes large squared weights, shrinking parameters smoothly. L1 regularization (Lasso) uses absolute values, driving redundant feature weights to zero for feature selection.',
            practiceActivity:
              'Train a regularized logistic regression model to predict student course completion and plot its precision-recall trade-off curve.',
            resource: {
              title: 'Scikit-Learn: Generalized Linear Models',
              url: 'https://scikit-learn.org/stable/modules/linear_model.html',
              type: 'docs',
            },
          },
          {
            id: 'ai-les-5',
            title: 'Decision Trees, Random Forests & Gradient Boosting',
            durationMinutes: 65,
            objective:
              'Understand recursive binary splitting, Gini impurity, bagging variance reduction, and sequential gradient boosting.',
            explanation:
              'Decision trees partition feature space based on threshold splits that maximize information gain or minimize Gini impurity. Individual trees suffer from high variance (overfitting). Random Forests reduce variance by averaging predictions across hundreds of de-correlated trees trained on bootstrap samples (Bagging).',
            practiceActivity:
              'Compare a single DecisionTreeClassifier with a RandomForestClassifier and tune max_depth and min_samples_split using GridSearchCV.',
            resource: {
              title: 'Scikit-Learn: Ensemble Methods',
              url: 'https://scikit-learn.org/stable/modules/ensemble.html',
              type: 'docs',
            },
          },
          {
            id: 'ai-les-6',
            title: 'Evaluation Metrics: Confusion Matrix, ROC-AUC & F1-Score',
            durationMinutes: 50,
            objective:
              'Evaluate classifier performance rigorously when working with imbalanced target class distributions.',
            explanation:
              'Accuracy is misleading on skewed datasets (e.g., 99% accuracy by predicting the negative majority class). Precision measures how many predicted positives were true positives. Recall measures what proportion of actual positives were caught. F1-score is the harmonic mean of precision and recall.',
            practiceActivity:
              'Compute and plot the Confusion Matrix, ROC Curve, and AUC score for an imbalanced college exam dropout prediction dataset.',
            resource: {
              title: 'Scikit-Learn: Model Evaluation Metrics',
              url: 'https://scikit-learn.org/stable/modules/model_evaluation.html',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'ai-mod-3',
        title: 'Deep Learning & Neural Architectures in PyTorch',
        description:
          'Perceptrons, backpropagation, convolutional networks, attention mechanisms, and model training loops.',
        level: 'Advanced',
        order: 3,
        estimatedHours: 24,
        lessons: [
          {
            id: 'ai-les-7',
            title: 'Multi-Layer Perceptrons & Backpropagation Mechanics',
            durationMinutes: 65,
            objective:
              'Understand activation functions (ReLU, GELU, Softmax), tensor computational graphs, and backward pass gradient flow.',
            explanation:
              'A Multi-Layer Perceptron (MLP) stacks linear transformations with non-linear activation functions, allowing networks to approximate arbitrary continuous functions (Universal Approximation Theorem). Backpropagation applies the calculus chain rule backward from loss to input weights.',
            practiceActivity:
              'Implement a 2-layer neural network from scratch using PyTorch nn.Module with CrossEntropyLoss and the Adam optimizer.',
            resource: {
              title: 'PyTorch: Deep Learning with PyTorch Tutorial',
              url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html',
              type: 'docs',
            },
          },
          {
            id: 'ai-les-8',
            title: 'PyTorch Training Loops, Batches & Learning Rate Scheduling',
            durationMinutes: 60,
            objective:
              'Construct clean PyTorch training pipelines with DataLoader batches, validation loops, early stopping, and GPU device transfer.',
            explanation:
              'Standard PyTorch training loops follow a 5-step ritual per batch: zero gradients (optimizer.zero_grad()), forward pass (model(x)), compute loss (criterion(outputs, y)), backward pass (loss.backward()), and parameter update (optimizer.step()).',
            practiceActivity:
              'Train a classification model on MNIST or Fashion-MNIST with an exponential learning rate scheduler and checkpoint saving.',
            resource: {
              title: 'PyTorch: Optimization Tutorial',
              url: 'https://pytorch.org/tutorials/beginner/basics/optimization_tutorial.html',
              type: 'docs',
            },
          },
          {
            id: 'ai-les-9',
            title: 'Introduction to Transformers & Self-Attention Mechanisms',
            durationMinutes: 75,
            objective:
              'Understand Query, Key, Value vectors, scaled dot-product attention, and positional encodings in modern LLMs.',
            explanation:
              'Unlike recurrent architectures that process tokens sequentially, Transformers process entire sequences simultaneously. The self-attention mechanism computes attention weights between all pairs of tokens via Softmax((Q * K^T) / sqrt(d_k)) * V, capturing long-range contextual relationships.',
            practiceActivity:
              'Implement a standalone Scaled Dot-Product Attention function using PyTorch tensor operations and verify output dimensions.',
            resource: {
              title: 'Hugging Face: The Transformer Architecture',
              url: 'https://huggingface.co/docs/transformers/index',
              type: 'docs',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'programming-fundamentals',
    title: 'Programming Fundamentals',
    shortDescription:
      'Solid programming discipline: algorithmic problem solving, variables, conditionals, loops, functions, memory models, and Git.',
    fullDescription:
      'Essential engineering foundations for first- and second-year college students transitioning into rigorous computer science curricula.',
    icon: 'Compass',
    targetGoal: 'Improve programming fundamentals',
    tags: ['Python', 'C++', 'Git', 'Clean Code', 'Debugging'],
    modules: [
      {
        id: 'pf-mod-1',
        title: 'Algorithmic Thinking, Variables & Flow Control',
        description:
          'Variable scoping, conditional branching, iteration loops, and boolean logic truth tables.',
        level: 'Beginner',
        order: 1,
        estimatedHours: 10,
        lessons: [
          {
            id: 'pf-les-1',
            title: 'Data Types, Variable Scope & Memory Allocation',
            durationMinutes: 40,
            objective:
              'Distinguish primitive value types from reference types and understand variable lifetimes across lexical scopes.',
            explanation:
              'Programs manipulate data stored in memory addresses. Primitive types (int, float, char, bool) typically allocate fixed byte sizes on the program stack. Reference types point to variable-length objects on the heap. Scope rules determine where an identifier can be accessed.',
            practiceActivity:
              'Write a program demonstrating variable shadowing, block scope, and primitive vs reference mutation behavior.',
            resource: {
              title: 'Python Documentation: Built-in Types',
              url: 'https://docs.python.org/3/library/stdtypes.html',
              type: 'docs',
            },
          },
          {
            id: 'pf-les-2',
            title: 'Conditionals, Boolean Logic & Branching Mechanics',
            durationMinutes: 40,
            objective:
              'Construct clean multi-condition logic using boolean operators (AND, OR, NOT) and prevent nested anti-patterns.',
            explanation:
              'Boolean algebra governs computer decision branches. Short-circuit evaluation ensures that in (A and B), B is never executed if A is false. Deeply nested if-else ladders reduce readability and can be refactored using guard clauses or pattern matching.',
            practiceActivity:
              'Refactor a nested grading classification function into clean guard clauses with early returns and unit tests.',
            resource: {
              title: 'Python Documentation: Control Flow Tools',
              url: 'https://docs.python.org/3/tutorial/controlflow.html',
              type: 'docs',
            },
          },
          {
            id: 'pf-les-3',
            title: 'Loops, Iteration Invariants & Infinite Loop Guards',
            durationMinutes: 45,
            objective:
              'Master determinate (for) and indeterminate (while) loops and establish loop invariants to prove correctness.',
            explanation:
              'A loop invariant is a formal condition that is true before and after each iteration. For loops iterate over a known finite sequence or range. While loops execute until a condition evaluates to false; failing to update state within the body leads to CPU hangs from infinite loops.',
            practiceActivity:
              'Implement the Collatz Conjecture simulator with iteration safety limits and loop step counters.',
            resource: {
              title: 'W3Schools: Python While Loops',
              url: 'https://www.w3schools.com/python/python_while_loops.asp',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'pf-mod-2',
        title: 'Modularity, Functions & Basic Data Structures',
        description:
          'Function purity, parameter passing conventions, recursion fundamentals, and standard library collections.',
        level: 'Intermediate',
        order: 2,
        estimatedHours: 14,
        lessons: [
          {
            id: 'pf-les-4',
            title: 'Functions, Pass-by-Value vs. Pass-by-Reference',
            durationMinutes: 45,
            objective:
              'Design modular pure functions and understand how parameters are passed to call stack activation records.',
            explanation:
              'Functions promote code reuse and abstraction. In languages like C++, parameters can be passed by value (creating a copy) or by reference (&, avoiding copies). In Python, arguments are passed by assignment (object references). Pure functions have no side effects.',
            practiceActivity:
              'Implement a string parsing utility with helper functions that validate, sanitize, and format student registration records.',
            resource: {
              title: 'Python Documentation: Defining Functions',
              url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
              type: 'docs',
            },
          },
          {
            id: 'pf-les-5',
            title: 'Recursion Fundamentals & Call Stack Frames',
            durationMinutes: 50,
            objective:
              'Formulate recursive base cases and recursive steps and visualize stack frame push/pop mechanics.',
            explanation:
              'Recursion solves a problem by solving smaller instances of the same problem. Every recursive function must define a base case where recursion terminates without further calls. Missing or unreachable base cases trigger a Stack Overflow error when call memory is exhausted.',
            practiceActivity:
              'Write recursive functions to compute Fibonacci numbers, calculate powers (x^n in O(log n)), and sum nested arrays.',
            resource: {
              title: 'GeeksforGeeks: Introduction to Recursion',
              url: 'https://www.geeksforgeeks.org/introduction-to-recursion-data-structure-and-algorithm-tutorials/',
              type: 'docs',
            },
          },
          {
            id: 'pf-les-6',
            title: 'Error Handling, Exceptions & File I/O Streams',
            durationMinutes: 45,
            objective:
              'Handle unexpected runtime errors gracefully using try-except-finally blocks and read/write persistent files safely.',
            explanation:
              'Exceptions disrupt normal instruction flow when unexpected conditions occur (e.g., FileNotFoundException, ZeroDivisionError). Context managers (like Python’s with statement) ensure file descriptors are released immediately even if an error is raised inside the block.',
            practiceActivity:
              'Create a student grade log processor that reads CSV scores, validates numeric ranges, logs parsing errors to a file, and outputs class statistics.',
            resource: {
              title: 'Python Documentation: Errors and Exceptions',
              url: 'https://docs.python.org/3/tutorial/errors.html',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'pf-mod-3',
        title: 'Developer Tooling, Version Control & Testing',
        description:
          'Git distributed branching workflows, command-line proficiency, unit testing suites, and debugging strategies.',
        level: 'Advanced',
        order: 3,
        estimatedHours: 16,
        lessons: [
          {
            id: 'pf-les-7',
            title: 'Git Version Control: Commits, Branches & Merges',
            durationMinutes: 50,
            objective:
              'Manage source code histories using Git branching strategies, stash staging, and merge conflict resolution.',
            explanation:
              'Git is a distributed version control system that stores snapshots of your repository as a directed acyclic graph (DAG) of commit objects. Feature branching isolates work until tested and reviewed via Pull Requests before merging to main.',
            practiceActivity:
              'Initialize a local git repo, create feature branches, simulate a merge conflict between two branches editing the same line, and resolve it.',
            resource: {
              title: 'Git SCM: Documentation & Book',
              url: 'https://git-scm.com/doc',
              type: 'docs',
            },
          },
          {
            id: 'pf-les-8',
            title: 'Unit Testing Principles & Test-Driven Development (TDD)',
            durationMinutes: 55,
            objective:
              'Write automated unit test assertions and practice red-green-refactor TDD cycles for mission-critical logic.',
            explanation:
              'Unit testing tests isolated components in isolation to verify expected outputs for given inputs. Edge cases (empty lists, negative numbers, boundary limits) are explicitly verified to catch regression bugs early in development.',
            practiceActivity:
              'Write a test suite with 10 unit test cases for a bank account transaction ledger using pytest or Jest.',
            resource: {
              title: 'Python Documentation: unittest framework',
              url: 'https://docs.python.org/3/library/unittest.html',
              type: 'docs',
            },
          },
          {
            id: 'pf-les-9',
            title: 'Debugging Strategies: Breakpoints, Call Stacks & Profiling',
            durationMinutes: 50,
            objective:
              'Debug runtime crashes using step-in/step-over debugger controls and inspect variable states on the stack.',
            explanation:
              'Print-debugging is slow and clutters production code. Interactive debuggers pause execution at breakpoints, letting engineers inspect the call stack, evaluate live expressions, watch memory values, and trace logic branches step-by-step.',
            practiceActivity:
              'Debug an intentionally flawed recursive sorting implementation using VS Code or Chrome DevTools breakpoints to identify the off-by-one bug.',
            resource: {
              title: 'VS Code Documentation: Debugging Guide',
              url: 'https://code.visualstudio.com/docs/editor/debugging',
              type: 'docs',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'placement-prep',
    title: 'Internship & Placement Preparation',
    shortDescription:
      'High-yield preparation for college campus placements, technical interviews, resume engineering, and system design basics.',
    fullDescription:
      'A comprehensive roadmap designed specifically for 3rd and 4th year college students preparing for technical recruiting seasons: coding rounds, technical interviews, resume screening, and behavioral questions.',
    icon: 'Sparkles',
    targetGoal: 'Prepare for internships and placements',
    tags: ['Interviews', 'LeetCode', 'System Design', 'Behavioral', 'Resume'],
    modules: [
      {
        id: 'prep-mod-1',
        title: 'Technical Resume & Screening Foundations',
        description:
          'ATS optimization, project bullet point framing (XYZ formula), and Core CS screening concepts (OS, DBMS, CN).',
        level: 'Beginner',
        order: 1,
        estimatedHours: 12,
        lessons: [
          {
            id: 'prep-les-1',
            title: 'ATS-Friendly Resume Engineering & The Google XYZ Formula',
            durationMinutes: 45,
            objective:
              'Craft a high-impact technical resume using quantified achievement bullets and clean single-column formatting.',
            explanation:
              'Applicant Tracking Systems (ATS) parse resumes for relevant skills and keywords. Resumes must be clear and concise. Every project bullet should follow the Google formula: "Accomplished [X] as measured by [Y], by doing [Z]" to demonstrate measurable impact.',
            practiceActivity:
              'Rewrite 3 of your college course projects into XYZ bullet points with measurable metrics (e.g. latency reduction, user count, test coverage).',
            resource: {
              title: 'Harvard Resume Guide for Computer Science',
              url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/',
              type: 'docs',
            },
          },
          {
            id: 'prep-les-2',
            title: 'Core CS Screening: Operating Systems & Process Concurrency',
            durationMinutes: 60,
            objective:
              'Answer common technical interview questions on processes vs threads, virtual memory, paging, and deadlock conditions.',
            explanation:
              'A process has its own isolated address space, while threads of the same process share heap memory and code. Deadlocks occur when 4 Coffman conditions hold: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Virtual memory abstracts physical RAM using page tables.',
            practiceActivity:
              'Write concise explanations for 5 classical OS interview questions: Semaphores vs Mutexes, Thrashing, Page Replacement, Context Switching overhead, and IPC mechanisms.',
            resource: {
              title: 'GeeksforGeeks: Operating Systems Tutorials',
              url: 'https://www.geeksforgeeks.org/operating-systems/',
              type: 'docs',
            },
          },
          {
            id: 'prep-les-3',
            title: 'Core CS Screening: Computer Networks & HTTP/TCP Handshakes',
            durationMinutes: 55,
            objective:
              'Master the OSI 7-layer model, TCP 3-way handshake, DNS lookup resolution, and TLS encryption handshakes.',
            explanation:
              'When a student types a URL in a browser: DNS resolves domain to IP address -> TCP 3-way handshake (SYN, SYN-ACK, ACK) establishes connection -> TLS handshake exchanges asymmetric keys -> HTTP GET request is transmitted -> Server responds -> Browser parses DOM and CSSOM.',
            practiceActivity:
              'Draw a chronological sequence diagram detailing the complete step-by-step lifecycle of an HTTPS web request from browser to web server.',
            resource: {
              title: 'Cloudflare: What happens when you type a URL?',
              url: 'https://www.cloudflare.com/learning/dns/what-is-dns/',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'prep-mod-2',
        title: 'High-Frequency Coding Patterns & Problem Sets',
        description:
          'Master recurring interview patterns: Sliding Window, Two Pointers, Monotonic Stacks, and Tree BFS/DFS.',
        level: 'Intermediate',
        order: 2,
        estimatedHours: 22,
        lessons: [
          {
            id: 'prep-les-4',
            title: 'Sliding Window Pattern (Fixed & Dynamic Sizes)',
            durationMinutes: 60,
            objective:
              'Solve subarray and substring problems in O(N) linear time instead of naive O(N^2) quadratic nested loops.',
            explanation:
              'The sliding window maintains a contiguous window defined by left and right pointers. When expanding the right pointer, we incorporate elements into our window state; when constraints are violated, we contract the left pointer until validity is restored.',
            practiceActivity:
              'Solve "Longest Substring Without Repeating Characters" and "Minimum Size Subarray Sum" using a dynamic sliding window.',
            resource: {
              title: 'LeetCode Problem: Longest Substring Without Repeating Characters',
              url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
              type: 'docs',
            },
          },
          {
            id: 'prep-les-5',
            title: 'Monotonic Stack & Next Greater Element Patterns',
            durationMinutes: 60,
            objective:
              'Use monotonic increasing or decreasing stacks to find nearest smaller or greater elements in linear time.',
            explanation:
              'A monotonic stack preserves elements in strictly sorted order. When a new incoming element violates monotonicity, elements are popped and processed. Because each element is pushed and popped at most once, total runtime across all steps is O(N).',
            practiceActivity:
              'Solve the Daily Temperatures problem and Next Greater Element I using a monotonic decreasing stack.',
            resource: {
              title: 'LeetCode Problem: Daily Temperatures',
              url: 'https://leetcode.com/problems/daily-temperatures/',
              type: 'docs',
            },
          },
          {
            id: 'prep-les-6',
            title: 'Binary Search On Answer Spaces & Rotated Arrays',
            durationMinutes: 55,
            objective:
              'Apply binary search beyond simple sorted lookups to monotonic feasibility functions in O(log N) time.',
            explanation:
              'Binary search applies whenever a problem exhibits monotonic truth values (e.g. False, False, False, True, True, True). We define a search space [low, high] and evaluate mid with a helper function isFeasible(mid) to halve the candidate space.',
            practiceActivity:
              'Solve "Koko Eating Bananas" and "Search in Rotated Sorted Array" using binary search on answer spaces.',
            resource: {
              title: 'LeetCode Problem: Koko Eating Bananas',
              url: 'https://leetcode.com/problems/koko-eating-bananas/',
              type: 'docs',
            },
          },
        ],
      },
      {
        id: 'prep-mod-3',
        title: 'System Design Basics & Behavioral Interviewing',
        description:
          'Scalability concepts (load balancers, caching, database sharding) and STAR-method behavioral question mastery.',
        level: 'Advanced',
        order: 3,
        estimatedHours: 20,
        lessons: [
          {
            id: 'prep-les-7',
            title: 'System Design Foundations: Scalability, Caching & Load Balancing',
            durationMinutes: 65,
            objective:
              'Design scalable web architectures, evaluate horizontal vs vertical scaling, and configure Redis caching strategies.',
            explanation:
              'Vertical scaling increases single-machine CPU/RAM capacity; horizontal scaling adds more nodes behind a Load Balancer (Round Robin, Least Connections). Caching (Redis/Memcached) sits between web servers and databases to serve hot data with sub-millisecond latency.',
            practiceActivity:
              'Design a URL shortener service (like TinyURL) detailing API endpoints, capacity estimation, base62 hashing, and database schema.',
            resource: {
              title: 'GitHub: System Design Primer',
              url: 'https://github.com/donnemartin/system-design-primer',
              type: 'docs',
            },
          },
          {
            id: 'prep-les-8',
            title: 'Database Sharding, Replication & CAP Theorem',
            durationMinutes: 60,
            objective:
              'Evaluate trade-offs between Consistency, Availability, and Partition Tolerance in distributed architectures.',
            explanation:
              'The CAP Theorem states that a distributed data store can guarantee at most two of Consistency, Availability, and Partition Tolerance. Database replication (leader-follower) offloads read queries. Database sharding partitions tables across nodes by shard key.',
            practiceActivity:
              'Compare trade-offs between choosing a CP system (PostgreSQL with strict synchronous replication) vs an AP system (Cassandra/DynamoDB).',
            resource: {
              title: 'AWS Documentation: What is the CAP Theorem?',
              url: 'https://aws.amazon.com/what-is/cap-theorem/',
              type: 'docs',
            },
          },
          {
            id: 'prep-les-9',
            title: 'Behavioral Interviews: STAR Method & Leadership Principles',
            durationMinutes: 50,
            objective:
              'Structure compelling verbal stories for behavioral questions (Situation, Task, Action, Result).',
            explanation:
              'Behavioral interviews evaluate cultural fit, teamwork, handling failure, and conflict resolution. The STAR structure keeps answers concise and impact-driven: Situation (context, 15%), Task (your responsibility, 15%), Action (what you specifically did, 50%), Result (quantifiable outcome and what you learned, 20%).',
            practiceActivity:
              'Prepare 4 structured STAR stories: A challenging college technical bug, a group project conflict, a missed deadline recovery, and a time you learned a new technology under tight pressure.',
            resource: {
              title: 'The Muse: The STAR Method for Interview Questions',
              url: 'https://www.themuse.com/advice/star-interview-method',
              type: 'docs',
            },
          },
        ],
      },
    ],
  },
]
