export const problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        topic: "Array",
        status: "unsolved",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
            { input: "nums = [3,3], target = 6", output: "[0,1]" }
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
        ],
        youtubeLink: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
        testCases: [
            { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
            { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
            { input: { nums: [3, 3], target: 6 }, expected: [0, 1] }
        ],
        functionName: "twoSum"
    },
    {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "Medium",
        topic: "Linked List",
        status: "unsolved",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
        examples: [
            { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." }
        ],
        constraints: [
            "The number of nodes in each linked list is in the range [1, 100].",
            "0 <= Node.val <= 9",
            "It is guaranteed that the list represents a number that does not have leading zeros."
        ],
        youtubeLink: "https://www.youtube.com/watch?v=wgFPrzTjm7s"
    },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=wiGpQwVHdE0" },
    { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=q6IEA26hvXc" },
    { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", topic: "Dynamic Programming", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=XYQecbcd6_c" },
    { id: 11, title: "Container With Most Water", difficulty: "Medium", topic: "Two Pointers", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=UuiTKBwPgAo" },
    { id: 15, title: "3Sum", difficulty: "Medium", topic: "Two Pointers", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=jzZsG8n2R9A" },
    { id: 19, title: "Remove Nth Node From End of List", difficulty: "Medium", topic: "Linked List", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=XVuQxVej6y8" },
    { id: 20, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=WTzjTskDFMg" },
    { id: 21, title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=XIdigk956u0" },
    { id: 22, title: "Generate Parentheses", difficulty: "Medium", topic: "Backtracking", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=s9fokUqJ76A" },
    { id: 23, title: "Merge k Sorted Lists", difficulty: "Hard", topic: "Heap", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=kpCesr9SXbY" },
    { id: 33, title: "Search in Rotated Sorted Array", difficulty: "Medium", topic: "Binary Search", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=U8XENwh8Oy8" },
    { id: 42, title: "Trapping Rain Water", difficulty: "Hard", topic: "Dynamic Programming", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=ZI2z5pq0TqA" },
    { id: 46, title: "Permutations", difficulty: "Medium", topic: "Backtracking", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=s7AvT7cGdSo" },
    { id: 48, title: "Rotate Image", difficulty: "Medium", topic: "Matrix", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=fMSJSS7eO1w" },
    { id: 49, title: "Group Anagrams", difficulty: "Medium", topic: "Hash Table", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=vzdQHuLeK28" },
    { id: 53, title: "Maximum Subarray", difficulty: "Easy", topic: "Array", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=5WZl3MMT0Eg" },
    { id: 54, title: "Spiral Matrix", difficulty: "Medium", topic: "Matrix", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=3j8Wo99vsnc" },
    { id: 55, title: "Jump Game", difficulty: "Medium", topic: "Greedy", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=Yan0cv2cLy8" },
    { id: 56, title: "Merge Intervals", difficulty: "Medium", topic: "Sorting", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=44H3cEC2fFM" },
    { id: 62, title: "Unique Paths", difficulty: "Medium", topic: "Dynamic Programming", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=IlEsdxhD4lk" },
    {
        id: 70,
        title: "Climbing Stairs",
        difficulty: "Easy",
        topic: "Dynamic Programming",
        status: "unsolved",
        description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
        examples: [
            { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step\n2. 2 steps" },
            { input: "n = 3", output: "3", explanation: "1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step" }
        ],
        constraints: [
            "1 <= n <= 45"
        ],
        youtubeLink: "https://www.youtube.com/watch?v=Y0lT9Fck7qI",
        testCases: [
            { input: { n: 2 }, expected: 2 },
            { input: { n: 3 }, expected: 3 },
            { input: { n: 5 }, expected: 8 }
        ],
        functionName: "climbStairs"
    },
    { id: 73, title: "Set Matrix Zeroes", difficulty: "Medium", topic: "Matrix", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=T41rL0L3Pnw" },
    { id: 76, title: "Minimum Window Substring", difficulty: "Hard", topic: "Sliding Window", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=jSto0O4AJbM" },
    { id: 78, title: "Subsets", difficulty: "Medium", topic: "Backtracking", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=REOH22Xwdkk" },
    { id: 79, title: "Word Search", difficulty: "Medium", topic: "Backtracking", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=pfiQ_PS1g8E" },
    { id: 84, title: "Largest Rectangle in Histogram", difficulty: "Hard", topic: "Stack", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=zx5Sw9130L0" },
    { id: 91, title: "Decode Ways", difficulty: "Medium", topic: "Dynamic Programming", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=o1hFOSJuFoY" },
    { id: 94, title: "Binary Tree Inorder Traversal", difficulty: "Easy", topic: "Tree", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=g_S5WuasKEA" },
    { id: 98, title: "Validate Binary Search Tree", difficulty: "Medium", topic: "Tree", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=s6ATEkipzow" },
    { id: 100, title: "Same Tree", difficulty: "Easy", topic: "Tree", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=vRbbcKXCxOw" },
    { id: 101, title: "Symmetric Tree", difficulty: "Easy", topic: "Tree", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=K7LyJT79Qpg" },
    { id: 102, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Tree", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=6ZnyEApgFYg" },
    { id: 104, title: "Maximum Depth of Binary Tree", difficulty: "Easy", topic: "Tree", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=hTM3phVI6YQ" },
    { id: 105, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", topic: "Tree", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=ihj4IQGZ2zc" },
    { id: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Array", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=1pkOgXD63yU" },
    { id: 124, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", topic: "Tree", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=Hr5cWU64M_I" },
    {
        id: 125,
        title: "Valid Palindrome",
        difficulty: "Easy",
        topic: "Two Pointers",
        status: "unsolved",
        description: "A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a **palindrome**, or `false` otherwise.",
        examples: [
            { input: "s = \"A man, a plan, a canal: Panama\"", output: "true", explanation: "\"amanaplanacanalpanama\" is a palindrome." },
            { input: "s = \"race a car\"", output: "false", explanation: "\"raceacar\" is not a palindrome." }
        ],
        constraints: [
            "1 <= s.length <= 2 * 10^5",
            "s consists only of printable ASCII characters."
        ],
        youtubeLink: "https://www.youtube.com/watch?v=0dPPXP45i0I",
        testCases: [
            { input: { s: "A man, a plan, a canal: Panama" }, expected: true },
            { input: { s: "race a car" }, expected: false },
            { input: { s: " " }, expected: true }
        ],
        functionName: "isPalindrome"
    },
    { id: 128, title: "Longest Consecutive Sequence", difficulty: "Medium", topic: "Hash Table", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=P6RZZMu_maU" },
    { id: 133, title: "Clone Graph", difficulty: "Medium", topic: "Graph", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=e5tNvT1iuge" },
    { id: 139, title: "Word Break", difficulty: "Medium", topic: "Dynamic Programming", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=Sx9NNgInc3A" },
    { id: 141, title: "Linked List Cycle", difficulty: "Easy", topic: "Linked List", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=gBTe7lFR3vc" },
    { id: 152, title: "Maximum Product Subarray", difficulty: "Medium", topic: "Dynamic Programming", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=lXVy6YWFcRM" },
    { id: 198, title: "House Robber", difficulty: "Medium", topic: "Dynamic Programming", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=73r3KWiEvyk" },
    { id: 200, title: "Number of Islands", difficulty: "Medium", topic: "Graph", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=__98uL6wst8" },
    { id: 206, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=G0_I-ZF0S38" },
    { id: 207, title: "Course Schedule", difficulty: "Medium", topic: "Graph", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=EgI5nU9etnU" },
    { id: 208, title: "Implement Trie (Prefix Tree)", difficulty: "Medium", topic: "Trie", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=T0hzP86u244" },
    { id: 215, title: "Kth Largest Element in an Array", difficulty: "Medium", topic: "Heap", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=FrWqpU2in0I" },
    { id: 217, title: "Contains Duplicate", difficulty: "Easy", topic: "Array", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=3OamzN90kPg" },
    {
        id: 226,
        title: "Invert Binary Tree",
        difficulty: "Easy",
        topic: "Tree",
        status: "unsolved",
        description: "Given the `root` of a binary tree, invert the tree, and return its root.",
        examples: [
            { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
            { input: "root = [2,1,3]", output: "[2,3,1]" }
        ],
        constraints: [
            "The number of nodes in the tree is in the range [0, 100].",
            "-100 <= Node.val <= 100"
        ],
        youtubeLink: "https://www.youtube.com/watch?v=OnSn2XEQ4MY",
        testCases: [
            { input: { root: [4, 2, 7, 1, 3, 6, 9] }, expected: [4, 7, 2, 9, 6, 3, 1] },
            { input: { root: [2, 1, 3] }, expected: [2, 3, 1] }
        ],
        functionName: "invertTree"
    },
    { id: 230, title: "Kth Smallest Element in a BST", difficulty: "Medium", topic: "Tree", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=5LUXSvjmGCw" },
    { id: 238, title: "Product of Array Except Self", difficulty: "Medium", topic: "Array", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=bNvIQI2wAjk" },
    { id: 239, title: "Sliding Window Maximum", difficulty: "Hard", topic: "Sliding Window", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=DfljaUwZsOk" },
    { id: 242, title: "Valid Anagram", difficulty: "Easy", topic: "Hash Table", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=9UtInBqnCgA" },
    { id: 268, title: "Missing Number", difficulty: "Easy", topic: "Bit Manipulation", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=WnPLSRLSANE" },
    { id: 295, title: "Find Median from Data Stream", difficulty: "Hard", topic: "Heap", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=itmhHWaHupI" },
    { id: 300, title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "Dynamic Programming", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=cjWnW0hdF1Y" },
    { id: 322, title: "Coin Change", difficulty: "Medium", topic: "Dynamic Programming", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=H9bfqozjoqs" },
    { id: 347, title: "Top K Frequent Elements", difficulty: "Medium", topic: "Heap", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=YPTqKIgVk-k" },
    { id: 371, title: "Sum of Two Integers", difficulty: "Medium", topic: "Bit Manipulation", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=gVUrDV4tZfY" },
    { id: 417, title: "Pacific Atlantic Water Flow", difficulty: "Medium", topic: "Graph", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=s-VkcjHqkGI" },
    { id: 424, title: "Longest Repeating Character Replacement", difficulty: "Medium", topic: "Sliding Window", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=gqXU1UyA8pk" },
    { id: 435, title: "Non-overlapping Intervals", difficulty: "Medium", topic: "Greedy", status: "unsolved", youtubeLink: "https://www.youtube.com/watch?v=nONCGxWoUfM" },
];
