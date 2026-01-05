export const mcqQuestions = [
    {
        id: 'mcq1',
        type: 'mcq',
        title: "Time Complexity Analysis",
        difficulty: "Easy",
        description: "What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
        options: [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n log n)"
        ],
        correctAnswer: 2 // Index of correct answer
    },
    {
        id: 'mcq2',
        type: 'mcq',
        title: "Data Structures",
        difficulty: "Medium",
        description: "Which data structure is best suited for implementing a LIFO (Last In First Out) system?",
        options: [
            "Queue",
            "Stack",
            "Linked List",
            "Array"
        ],
        correctAnswer: 1
    },
    {
        id: 'mcq3',
        type: 'mcq',
        title: "Algorithm Design",
        difficulty: "Medium",
        description: "Which sorting algorithm has the best worst-case time complexity?",
        options: [
            "Quick Sort",
            "Bubble Sort",
            "Merge Sort",
            "Insertion Sort"
        ],
        correctAnswer: 2
    },
    {
        id: 'mcq4',
        type: 'mcq',
        title: "System Design",
        difficulty: "Hard",
        description: "In a distributed system, what does the CAP theorem stand for?",
        options: [
            "Consistency, Availability, Partition Tolerance",
            "Consistency, Authenticity, Partition Tolerance",
            "Consistency, Availability, Performance",
            "Concurrency, Availability, Partition Tolerance"
        ],
        correctAnswer: 0
    },
    {
        id: 'mcq5',
        type: 'mcq',
        title: "JavaScript Event Loop",
        difficulty: "Hard",
        description: "What is the output of: console.log('A'); setTimeout(() => console.log('B'), 0); console.log('C');",
        options: [
            "A, B, C",
            "A, C, B",
            "B, A, C",
            "C, A, B"
        ],
        correctAnswer: 1
    }
];
