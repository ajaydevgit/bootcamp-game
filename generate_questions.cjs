const fs = require('fs');

const rawQuestions = [
  // Day 1
  {
    "question": "What is the main goal of placement coding?",
    "options": {
      "A": "Code obfuscation",
      "B": "Solve coding problems",
      "C": "UI design",
      "D": "Hardware optimization"
    },
    "answer": "B",
    "explanation": "Placement coding focuses on solving programming problems efficiently."
  },
  {
    "question": "Which skill is most important in coding interviews?",
    "options": {
      "A": "Problem solving",
      "B": "Web styling",
      "C": "Typing speed",
      "D": "Database management"
    },
    "answer": "A",
    "explanation": "Interviewers mainly test your problem-solving ability."
  },
  {
    "question": "Which language is commonly used for placement coding?",
    "options": {
      "A": "HTML",
      "B": "CSS",
      "C": "C++",
      "D": "SQL"
    },
    "answer": "C",
    "explanation": "C++ is widely used because of its speed and STL support."
  },
  {
    "question": "What does Big-O notation describe?",
    "options": {
      "A": "File size",
      "B": "Memory address",
      "C": "Algorithm efficiency",
      "D": "Screen resolution"
    },
    "answer": "C",
    "explanation": "Big-O measures how runtime or space grows with input size."
  },
  {
    "question": "Which time complexity is fastest for large inputs?",
    "options": {
      "A": "O(1)",
      "B": "O(n²)",
      "C": "O(n)",
      "D": "O(n log n)"
    },
    "answer": "A",
    "explanation": "Constant time does not grow with input size."
  },
  {
    "question": "Linear search has average time complexity of?",
    "options": {
      "A": "O(log n)",
      "B": "O(n)",
      "C": "O(1)",
      "D": "O(n²)"
    },
    "answer": "B",
    "explanation": "Linear search may check each element once."
  },
  {
    "question": "Binary search requires the array to be?",
    "options": {
      "A": "Sorted",
      "B": "Empty",
      "C": "Random",
      "D": "Reversed only"
    },
    "answer": "A",
    "explanation": "Binary search works correctly only on sorted data."
  },
  {
    "question": "What is the time complexity of binary search?",
    "options": {
      "A": "O(n)",
      "B": "O(n²)",
      "C": "O(log n)",
      "D": "O(1)"
    },
    "answer": "C",
    "explanation": "Binary search halves the search space each step."
  },
  {
    "question": "Which complexity grows the slowest?",
    "options": {
      "A": "O(n log n)",
      "B": "O(log n)",
      "C": "O(n²)",
      "D": "O(n)"
    },
    "answer": "B",
    "explanation": "Logarithmic growth is very slow compared to linear or quadratic."
  },
  {
    "question": "Which complexity is generally worst?",
    "options": {
      "A": "O(log n)",
      "B": "O(1)",
      "C": "O(n)",
      "D": "O(n²)"
    },
    "answer": "D",
    "explanation": "Quadratic time grows much faster than linear or logarithmic."
  },
  {
    "question": "An array stores elements in what way?",
    "options": {
      "A": "Sequentially",
      "B": "Randomly",
      "C": "As trees",
      "D": "As graphs"
    },
    "answer": "A",
    "explanation": "Array elements are stored in contiguous order."
  },
  {
    "question": "Array indexing usually starts from?",
    "options": {
      "A": "1",
      "B": "-1",
      "C": "0",
      "D": "2"
    },
    "answer": "C",
    "explanation": "Most programming languages use zero-based indexing."
  },
  {
    "question": "Which operation is O(1) in an array?",
    "options": {
      "A": "Random access",
      "B": "Linear search",
      "C": "Insert at middle",
      "D": "Delete first element"
    },
    "answer": "A",
    "explanation": "Access by index takes constant time."
  },
  {
    "question": "What does an array index represent?",
    "options": {
      "A": "Element position",
      "B": "Element value",
      "C": "Array size",
      "D": "Data type"
    },
    "answer": "A",
    "explanation": "The index identifies an element's position."
  },
  {
    "question": "Which data type stores multiple similar values?",
    "options": {
      "A": "Array",
      "B": "Float",
      "C": "Character",
      "D": "Boolean"
    },
    "answer": "A",
    "explanation": "Arrays hold many values of the same type."
  },
  {
    "question": "Finding the largest array element usually takes?",
    "options": {
      "A": "O(1)",
      "B": "O(log n)",
      "C": "O(n)",
      "D": "O(n²)"
    },
    "answer": "C",
    "explanation": "Every element may need to be checked once."
  },
  {
    "question": "A string is mainly a sequence of?",
    "options": {
      "A": "Numbers",
      "B": "Characters",
      "C": "Arrays",
      "D": "Pointers"
    },
    "answer": "B",
    "explanation": "Strings are collections of characters."
  },
  {
    "question": "Which string is a palindrome?",
    "options": {
      "A": "code",
      "B": "hello",
      "C": "level",
      "D": "world"
    },
    "answer": "C",
    "explanation": "A palindrome reads the same forward and backward."
  },
  {
    "question": "What does concatenation mean?",
    "options": {
      "A": "Substring extraction",
      "B": "String matching",
      "C": "Join strings",
      "D": "Reverse text"
    },
    "answer": "C",
    "explanation": "Concatenation combines strings together."
  },
  {
    "question": "How many characters are in 'cat'?",
    "options": {
      "A": "2",
      "B": "4",
      "C": "5",
      "D": "3"
    },
    "answer": "D",
    "explanation": "The word 'cat' contains three characters."
  },
  {
    "question": "Which function usually returns string length?",
    "options": {
      "A": "sort()",
      "B": "length()",
      "C": "push()",
      "D": "pop()"
    },
    "answer": "B",
    "explanation": "Many languages provide a length function or method."
  },
  {
    "question": "Which operation checks two strings are equal?",
    "options": {
      "A": "Comparison",
      "B": "Concatenation",
      "C": "Reversal",
      "D": "Insertion"
    },
    "answer": "A",
    "explanation": "Comparison determines whether strings match."
  },
  {
    "question": "Which complexity represents constant time?",
    "options": {
      "A": "O(n)",
      "B": "O(log n)",
      "C": "O(1)",
      "D": "O(n²)"
    },
    "answer": "C",
    "explanation": "O(1) means execution time stays constant."
  },
  {
    "question": "Which search is better for sorted arrays?",
    "options": {
      "A": "Linear search",
      "B": "Binary search",
      "C": "Random search",
      "D": "Exhaustive search"
    },
    "answer": "B",
    "explanation": "Binary search efficiently uses sorted order."
  },
  {
    "question": "Which is a mutable collection in many languages?",
    "options": {
      "A": "Array",
      "B": "Integer",
      "C": "Boolean",
      "D": "Character"
    },
    "answer": "A",
    "explanation": "Arrays can often be modified after creation."
  },
  {
    "question": "Which notation ignores constants and lower terms?",
    "options": {
      "A": "ASCII",
      "B": "Unicode",
      "C": "Big-O",
      "D": "UTF-8"
    },
    "answer": "C",
    "explanation": "Big-O focuses on dominant growth rates."
  },
  {
    "question": "What is the first index of 'apple'?",
    "options": {
      "A": "1",
      "B": "0",
      "C": "5",
      "D": "-1"
    },
    "answer": "B",
    "explanation": "Strings are usually zero-indexed."
  },
  {
    "question": "Which operation reverses a string's order?",
    "options": {
      "A": "Append",
      "B": "Slice",
      "C": "Reverse",
      "D": "Compare"
    },
    "answer": "C",
    "explanation": "Reverse changes character order from end to start."
  },
  {
    "question": "Which interview topic often uses arrays?",
    "options": {
      "A": "Pattern problems",
      "B": "Network architecture",
      "C": "Machine learning",
      "D": "Hardware design"
    },
    "answer": "A",
    "explanation": "Many coding interview questions involve arrays."
  },
  {
    "question": "Why analyze time complexity?",
    "options": {
      "A": "Measure speed growth",
      "B": "Change language",
      "C": "Increase storage",
      "D": "Reduce typing"
    },
    "answer": "A",
    "explanation": "Time complexity estimates how runtime scales with input size."
  },

  // Day 2
  {
    "question": "Binary search works on which type of array?",
    "options": {
      "A": "Sorted",
      "B": "Random",
      "C": "Empty",
      "D": "Circular"
    },
    "answer": "A",
    "explanation": "Binary search requires the array to be sorted."
  },
  {
    "question": "What is the average time complexity of binary search?",
    "options": {
      "A": "O(n)",
      "B": "O(log n)",
      "C": "O(n²)",
      "D": "O(1)"
    },
    "answer": "B",
    "explanation": "Binary search halves the search space each step."
  },
  {
    "question": "Linear search checks elements in what order?",
    "options": {
      "A": "Random",
      "B": "Middle first",
      "C": "One by one",
      "D": "Last first"
    },
    "answer": "C",
    "explanation": "Linear search scans elements sequentially."
  },
  {
    "question": "Which search does not require sorting?",
    "options": {
      "A": "Binary search",
      "B": "Linear search",
      "C": "Jump search",
      "D": "Interpolation search"
    },
    "answer": "B",
    "explanation": "Linear search works on both sorted and unsorted data."
  },
  {
    "question": "What is the worst-case time of linear search?",
    "options": {
      "A": "O(log n)",
      "B": "O(1)",
      "C": "O(n)",
      "D": "O(n log n)"
    },
    "answer": "C",
    "explanation": "It may inspect every element once."
  },
  {
    "question": "Which sorting algorithm repeatedly swaps adjacent elements?",
    "options": {
      "A": "Merge Sort",
      "B": "Bubble Sort",
      "C": "Quick Sort",
      "D": "Selection Sort"
    },
    "answer": "B",
    "explanation": "Bubble Sort compares and swaps neighboring elements."
  },
  {
    "question": "Which sorting algorithm selects the minimum element each pass?",
    "options": {
      "A": "Selection Sort",
      "B": "Insertion Sort",
      "C": "Heap Sort",
      "D": "Merge Sort"
    },
    "answer": "A",
    "explanation": "Selection Sort places the smallest remaining element first."
  },
  {
    "question": "Which sorting algorithm is based on divide and conquer?",
    "options": {
      "A": "Bubble Sort",
      "B": "Insertion Sort",
      "C": "Merge Sort",
      "D": "Counting Sort"
    },
    "answer": "C",
    "explanation": "Merge Sort recursively divides and merges arrays."
  },
  {
    "question": "Which sort is usually fastest on nearly sorted arrays?",
    "options": {
      "A": "Insertion Sort",
      "B": "Bubble Sort",
      "C": "Selection Sort",
      "D": "Heap Sort"
    },
    "answer": "A",
    "explanation": "Insertion Sort performs well when data is nearly sorted."
  },
  {
    "question": "What is the best-case time of Bubble Sort with optimization?",
    "options": {
      "A": "O(n²)",
      "B": "O(log n)",
      "C": "O(n)",
      "D": "O(1)"
    },
    "answer": "C",
    "explanation": "An already sorted array needs only one pass."
  },
  {
    "question": "What does a hash function produce?",
    "options": {
      "A": "Index",
      "B": "Database connection",
      "C": "Pointer",
      "D": "API request"
    },
    "answer": "A",
    "explanation": "A hash function maps data to an index or key."
  },
  {
    "question": "What is a hash collision?",
    "options": {
      "A": "Two keys share one index",
      "B": "Array overflow",
      "C": "Infinite loop",
      "D": "Stack overflow"
    },
    "answer": "A",
    "explanation": "A collision happens when different keys map to the same location."
  },
  {
    "question": "Which data structure uses hashing?",
    "options": {
      "A": "Hash table",
      "B": "Queue",
      "C": "Stack",
      "D": "Heap"
    },
    "answer": "A",
    "explanation": "Hash tables store data using hash functions."
  },
  {
    "question": "Average lookup in a good hash table is?",
    "options": {
      "A": "O(n)",
      "B": "O(log n)",
      "C": "O(1)",
      "D": "O(n²)"
    },
    "answer": "C",
    "explanation": "Hash tables typically provide constant-time average lookup."
  },
  {
    "question": "Which is a common collision handling method?",
    "options": {
      "A": "Chaining",
      "B": "Recursion",
      "C": "Sorting",
      "D": "Traversal"
    },
    "answer": "A",
    "explanation": "Chaining stores multiple items in the same bucket."
  },
  {
    "question": "Recursion means a function?",
    "options": {
      "A": "Calls itself",
      "B": "Deletes itself",
      "C": "Compiles code",
      "D": "Uses threads"
    },
    "answer": "A",
    "explanation": "A recursive function invokes itself."
  },
  {
    "question": "What prevents infinite recursion?",
    "options": {
      "A": "Loop condition",
      "B": "Base case",
      "C": "Hash table",
      "D": "Pointer reference"
    },
    "answer": "B",
    "explanation": "The base case stops further recursive calls."
  },
  {
    "question": "Recursion mainly uses which memory structure?",
    "options": {
      "A": "Heap",
      "B": "Queue",
      "C": "Stack",
      "D": "Array"
    },
    "answer": "C",
    "explanation": "Recursive calls are managed through the call stack."
  },
  {
    "question": "Factorial is a classic example of?",
    "options": {
      "A": "Hashing",
      "B": "Sorting",
      "C": "Recursion",
      "D": "Searching"
    },
    "answer": "C",
    "explanation": "Factorial is commonly implemented recursively."
  },
  {
    "question": "Missing a base case may cause?",
    "options": {
      "A": "Stack overflow",
      "B": "Hash collision",
      "C": "Deadlock",
      "D": "Compilation error"
    },
    "answer": "A",
    "explanation": "Infinite recursive calls can overflow the call stack."
  },
  {
    "question": "Which algorithm repeatedly inserts elements into the correct position?",
    "options": {
      "A": "Insertion Sort",
      "B": "Quick Sort",
      "C": "Merge Sort",
      "D": "Selection Sort"
    },
    "answer": "A",
    "explanation": "Insertion Sort builds the sorted portion one element at a time."
  },
  {
    "question": "Which search starts from the middle element?",
    "options": {
      "A": "Binary search",
      "B": "Linear search",
      "C": "Depth-first search",
      "D": "Breadth-first search"
    },
    "answer": "A",
    "explanation": "Binary search begins by checking the middle."
  },
  {
    "question": "Hashing is mainly used for?",
    "options": {
      "A": "Fast lookup",
      "B": "Memory allocation",
      "C": "Garbage collection",
      "D": "Data compression"
    },
    "answer": "A",
    "explanation": "Hashing enables quick insertion and retrieval."
  },
  {
    "question": "Which sorting algorithm compares adjacent elements?",
    "options": {
      "A": "Bubble Sort",
      "B": "Merge Sort",
      "C": "Quick Sort",
      "D": "Heap Sort"
    },
    "answer": "A",
    "explanation": "Bubble Sort repeatedly compares neighboring values."
  },
  {
    "question": "Binary search reduces the search space by?",
    "options": {
      "A": "Half",
      "B": "One item",
      "C": "Ten percent",
      "D": "Double"
    },
    "answer": "A",
    "explanation": "Each step discards half of the remaining elements."
  },
  {
    "question": "Which technique stores key-value pairs efficiently?",
    "options": {
      "A": "Hashing",
      "B": "Recursion",
      "C": "Sorting",
      "D": "Traversal"
    },
    "answer": "A",
    "explanation": "Hashing is commonly used for key-value storage."
  },
  {
    "question": "Quick Sort chooses a?",
    "options": {
      "A": "Pivot",
      "B": "Root node",
      "C": "Leaf node",
      "D": "Hash bucket"
    },
    "answer": "A",
    "explanation": "Quick Sort partitions data around a pivot."
  },
  {
    "question": "Which problem is commonly solved recursively?",
    "options": {
      "A": "Tree traversal",
      "B": "Network request parsing",
      "C": "File compression",
      "D": "Process scheduling"
    },
    "answer": "A",
    "explanation": "Recursive traversal naturally fits tree structures."
  },
  {
    "question": "Which sorting algorithm divides before merging?",
    "options": {
      "A": "Merge Sort",
      "B": "Bubble Sort",
      "C": "Selection Sort",
      "D": "Insertion Sort"
    },
    "answer": "A",
    "explanation": "Merge Sort splits arrays before combining them."
  },
  {
    "question": "What is the first thing to check in a recursive function?",
    "options": {
      "A": "Base case",
      "B": "Time complexity",
      "C": "Variable scope",
      "D": "Memory allocation"
    },
    "answer": "A",
    "explanation": "The base case ensures recursion eventually stops."
  },

  // Day 3
  {
    "question": "Dynamic Programming mainly avoids what?",
    "options": {
      "A": "Sorting arrays",
      "B": "Repeated calculations",
      "C": "Compilation errors",
      "D": "Input parsing"
    },
    "answer": "B",
    "explanation": "DP stores previous results to avoid recomputation."
  },
  {
    "question": "What is the first step in many DP solutions?",
    "options": {
      "A": "Choose a base case",
      "B": "Sort the array",
      "C": "Build a tree",
      "D": "Create a graph"
    },
    "answer": "A",
    "explanation": "Base cases define the simplest subproblems."
  },
  {
    "question": "Which DP technique stores answers in a table?",
    "options": {
      "A": "Memoization",
      "B": "Backtracking",
      "C": "Tabulation",
      "D": "Hashing"
    },
    "answer": "C",
    "explanation": "Tabulation fills a table iteratively."
  },
  {
    "question": "Memoization is usually associated with?",
    "options": {
      "A": "Recursion",
      "B": "Sorting",
      "C": "Binary search",
      "D": "Greedy algorithms"
    },
    "answer": "A",
    "explanation": "Memoization caches recursive results."
  },
  {
    "question": "Which condition makes DP useful?",
    "options": {
      "A": "Overlapping subproblems",
      "B": "Random inputs",
      "C": "Unique answers only",
      "D": "No recursion allowed"
    },
    "answer": "A",
    "explanation": "DP works well when subproblems repeat."
  },
  {
    "question": "In a mock coding test, read what first?",
    "options": {
      "A": "Library docs",
      "B": "Problem statement",
      "C": "Compiler version",
      "D": "Network status"
    },
    "answer": "B",
    "explanation": "Understanding the problem is the first priority."
  },
  {
    "question": "Before coding, you should identify?",
    "options": {
      "A": "Input and output formats",
      "B": "Variable naming conventions",
      "C": "Maximum memory limits",
      "D": "IDE theme configuration"
    },
    "answer": "A",
    "explanation": "Clear input and output understanding prevents mistakes."
  },
  {
    "question": "What should you test after coding?",
    "options": {
      "A": "Only maximum constraints",
      "B": "Performance benchmarks",
      "C": "Sample cases",
      "D": "Syntax compilation"
    },
    "answer": "C",
    "explanation": "Sample cases verify basic correctness."
  },
  {
    "question": "If stuck in an assessment, what is best?",
    "options": {
      "A": "Skip and return later",
      "B": "Restart from scratch",
      "C": "Guess output formats",
      "D": "Rewrite in another language"
    },
    "answer": "A",
    "explanation": "Moving on can save valuable time."
  },
  {
    "question": "Why should variable names be meaningful?",
    "options": {
      "A": "Better code readability",
      "B": "Reduced memory usage",
      "C": "Faster execution time",
      "D": "Shorter compile time"
    },
    "answer": "A",
    "explanation": "Clear names make code easier to understand."
  },
  {
    "question": "During interviews, explain your approach before?",
    "options": {
      "A": "Closing the session",
      "B": "Writing code",
      "C": "Running benchmarks",
      "D": "Optimizing memory"
    },
    "answer": "B",
    "explanation": "Discussing the plan shows your thinking process."
  },
  {
    "question": "What should you clarify if confused?",
    "options": {
      "A": "Problem constraints",
      "B": "Language versions",
      "C": "Operating system",
      "D": "Screen resolution"
    },
    "answer": "A",
    "explanation": "Clarifying constraints avoids wrong assumptions."
  },
  {
    "question": "Which strategy helps reduce bugs?",
    "options": {
      "A": "Write and test in steps",
      "B": "Code without checking",
      "C": "Skip edge cases",
      "D": "Ignore output logs"
    },
    "answer": "A",
    "explanation": "Incremental testing catches errors early."
  },
  {
    "question": "What should you discuss after solving?",
    "options": {
      "A": "Time and space complexity",
      "B": "Code formatting style",
      "C": "Typing speed metric",
      "D": "System architecture"
    },
    "answer": "A",
    "explanation": "Interviewers often ask about efficiency."
  },
  {
    "question": "Which algorithm is best for sorted search?",
    "options": {
      "A": "Linear search",
      "B": "Binary search",
      "C": "Bubble sort",
      "D": "Depth First Search"
    },
    "answer": "B",
    "explanation": "Binary search efficiently searches sorted data."
  },
  {
    "question": "Which algorithm finds minimum paths in weighted graphs?",
    "options": {
      "A": "Dijkstra's Algorithm",
      "B": "Bubble Sort",
      "C": "Linear Search",
      "D": "Selection Sort"
    },
    "answer": "A",
    "explanation": "Dijkstra's algorithm finds shortest paths with non-negative weights."
  },
  {
    "question": "Which technique is useful for repeated lookups?",
    "options": {
      "A": "Hashing",
      "B": "Bubble Sort",
      "C": "Linear scan",
      "D": "Nested loops"
    },
    "answer": "A",
    "explanation": "Hashing provides fast average lookup time."
  },
  {
    "question": "Which algorithm is ideal for finding an item in an unsorted array?",
    "options": {
      "A": "Binary search",
      "B": "Linear search",
      "C": "Merge sort",
      "D": "Heap sort"
    },
    "answer": "B",
    "explanation": "Linear search works without sorting."
  },
  {
    "question": "Which approach often reduces time by storing results?",
    "options": {
      "A": "Memoization",
      "B": "Standard output",
      "C": "Code formatting",
      "D": "Variable copying"
    },
    "answer": "A",
    "explanation": "Memoization saves computed values for reuse."
  },
  {
    "question": "Space optimization means using?",
    "options": {
      "A": "Less memory",
      "B": "More loop iterations",
      "C": "Longer variable names",
      "D": "Extra configuration files"
    },
    "answer": "A",
    "explanation": "The goal is to reduce memory usage."
  },
  {
    "question": "Time optimization focuses on?",
    "options": {
      "A": "Reducing execution time",
      "B": "Increasing allocated RAM",
      "C": "Changing programming languages",
      "D": "Adding code comments"
    },
    "answer": "A",
    "explanation": "It aims to make programs run faster."
  },
  {
    "question": "Removing unnecessary nested loops usually improves?",
    "options": {
      "A": "Runtime complexity",
      "B": "Network latency",
      "C": "Display refresh rate",
      "D": "Keyboard response time"
    },
    "answer": "A",
    "explanation": "Fewer repeated operations reduce execution time."
  },
  {
    "question": "Which is usually faster than O(n²)?",
    "options": {
      "A": "O(n log n)",
      "B": "O(n³)",
      "C": "O(2ⁿ)",
      "D": "O(n!)"
    },
    "answer": "A",
    "explanation": "O(n log n) grows slower than quadratic time."
  },
  {
    "question": "Edge cases are?",
    "options": {
      "A": "Special boundary inputs",
      "B": "Compiler syntax errors",
      "C": "Code documentation comments",
      "D": "IDE shortcuts"
    },
    "answer": "A",
    "explanation": "Edge cases test unusual or boundary conditions."
  },
  {
    "question": "What should you avoid in interviews?",
    "options": {
      "A": "Panicking",
      "B": "Explaining your logic",
      "C": "Writing test cases",
      "D": "Clarifying requirements"
    },
    "answer": "A",
    "explanation": "Staying calm helps you think clearly."
  },
  {
    "question": "Which DP method fills states from smallest upward?",
    "options": {
      "A": "Tabulation",
      "B": "Hashing",
      "C": "Greedy approach",
      "D": "DFS traversal"
    },
    "answer": "A",
    "explanation": "Tabulation builds solutions iteratively."
  },
  {
    "question": "Which data structure is often used for fast membership checks?",
    "options": {
      "A": "Hash Set",
      "B": "Stack",
      "C": "Queue",
      "D": "Linked List"
    },
    "answer": "A",
    "explanation": "Hash sets usually provide constant-time lookups."
  },
  {
    "question": "What is a good habit before submitting code?",
    "options": {
      "A": "Review code logic",
      "B": "Delete all comments",
      "C": "Rename variables randomly",
      "D": "Restart the IDE"
    },
    "answer": "A",
    "explanation": "A quick review can catch simple mistakes."
  },
  {
    "question": "When memory is limited, prefer?",
    "options": {
      "A": "Lower space complexity",
      "B": "More memory allocations",
      "C": "Deep copying objects",
      "D": "Duplicating data structures"
    },
    "answer": "A",
    "explanation": "Reducing memory consumption is important under constraints."
  },
  {
    "question": "Choosing the right algorithm mainly improves?",
    "options": {
      "A": "Execution efficiency",
      "B": "Code styling",
      "C": "Editor performance",
      "D": "Syntax highlighting"
    },
    "answer": "A",
    "explanation": "A suitable algorithm leads to faster and more efficient solutions."
  }
];

fs.writeFileSync('c:\\Users\\HP\\Desktop\\dsabootcamp\\src\\data\\questions.json', JSON.stringify(rawQuestions, null, 2));
console.log('Successfully wrote refined questions to questions.json');
