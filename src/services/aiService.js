import { initializeGemini, hasApiKey } from '../config/gemini';

// Mock analysis fallback
const mockAnalyzeCode = async (code, languageId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let timeComplexity = "O(n)";
            let complexityReason = "Linear iteration detected.";

            const codeLines = code.toLowerCase();
            const forLoops = (code.match(/for\s*\(/g) || []).length;
            const whileLoops = (code.match(/while\s*\(/g) || []).length;
            const totalLoops = forLoops + whileLoops;
            const nestedLoopPattern = /for\s*\([^)]*\)\s*\{[^}]*for\s*\(/g;
            const nestedLoops = (code.match(nestedLoopPattern) || []).length;
            const hasSorting = codeLines.includes('.sort(') || codeLines.includes('sort(');
            const hasHashMap = codeLines.includes('map') || codeLines.includes('set') || codeLines.includes('object') || codeLines.includes('{}');
            const hasRecursion = /function\s+(\w+)[^{]*\{[^}]*\1\s*\(/g.test(code);

            // Determine time complexity
            if (nestedLoops > 0) {
                timeComplexity = "O(n²)";
                complexityReason = "Nested loops detected - quadratic time complexity.";
            } else if (hasSorting) {
                timeComplexity = "O(n log n)";
                complexityReason = "Sorting operation detected - typically O(n log n).";
            } else if (hasRecursion) {
                timeComplexity = "O(2^n) or O(n)";
                complexityReason = "Recursive function detected - complexity depends on recursion depth.";
            } else if (totalLoops === 0 && hasHashMap) {
                timeComplexity = "O(n)";
                complexityReason = "Hash map operations with single pass - linear time.";
            } else if (totalLoops === 0) {
                timeComplexity = "O(1)";
                complexityReason = "No loops detected - constant time operations.";
            }

            // Determine space complexity
            let spaceComplexity = "O(1)";
            let spaceReason = "Constant space usage.";
            const hasArray = codeLines.includes('[]') || codeLines.includes('array');
            const hasMap = codeLines.includes('new map') || codeLines.includes('new set') || codeLines.includes('{}');

            if (hasMap || (hasArray && codeLines.includes('push'))) {
                spaceComplexity = "O(n)";
                spaceReason = "Additional data structure used - linear space.";
            } else if (hasRecursion) {
                spaceComplexity = "O(n)";
                spaceReason = "Recursion uses call stack - linear space.";
            }

            // Build strengths based on code patterns
            const strengths = [];
            if (hasHashMap) {
                strengths.push("Efficient use of hash map for O(1) lookups.");
            }
            if (code.includes('//') || code.includes('/*')) {
                strengths.push("Good code documentation with comments.");
            }
            if (code.length > 50 && code.length < 500) {
                strengths.push("Code is concise and readable.");
            }
            if (codeLines.includes('if') && codeLines.includes('return')) {
                strengths.push("Proper handling of conditional logic.");
            }
            if (strengths.length === 0) {
                strengths.push("Code structure is clear and readable.", "Logical approach to solving the problem.");
            }

            // Build weaknesses based on code patterns
            const weaknesses = [];
            if (!codeLines.includes('null') && !codeLines.includes('undefined')) {
                weaknesses.push("Consider edge cases like null or undefined inputs.");
            }
            if (!codeLines.includes('length') && (codeLines.includes('array') || codeLines.includes('[]'))) {
                weaknesses.push("Consider checking array length before operations.");
            }
            if (nestedLoops > 0) {
                weaknesses.push("Nested loops can be optimized using hash maps or two-pointer technique.");
            }
            if (weaknesses.length === 0) {
                weaknesses.push("Consider adding more descriptive variable names for better readability.");
            }

            // Build coding habits
            const habits = [];
            if (!code.includes("//") && !code.includes("/*")) {
                habits.push({ type: "warning", message: "Consider adding comments to explain your approach." });
            } else {
                habits.push({ type: "success", message: "Good job adding comments!" });
            }

            if (code.split('\n').length > 20) {
                habits.push({ type: "warning", message: "Consider breaking down large functions into smaller, reusable ones." });
            } else {
                habits.push({ type: "success", message: "Function length is appropriate and maintainable." });
            }

            if (hasHashMap) {
                habits.push({ type: "success", message: "Great use of data structures for optimization!" });
            }

            resolve({
                strengths: strengths,
                weaknesses: weaknesses,
                complexity: {
                    time: timeComplexity,
                    reason: complexityReason,
                    space: spaceComplexity,
                    spaceReason: spaceReason
                },
                habits: habits,
                nextChallenge: {
                    id: 2,
                    title: "Add Two Numbers",
                    difficulty: "Medium",
                    reason: "Great job! Try handling linked lists next to expand your skills."
                },
                roadmap: [
                    { title: "Master Arrays", status: "completed" },
                    { title: "Hash Maps & Sets", status: "in-progress", resource: "https://www.youtube.com/watch?v=RBSGKlAvoiM" },
                    { title: "Two Pointers Technique", status: "locked" },
                    { title: "Linked Lists", status: "locked" }
                ],
                usingMock: true
            });
        }, 1500); // Slightly longer delay for more realistic feel
    });
};

// Gemini API analysis
const geminiAnalyzeCode = async (code, languageId) => {
    const model = initializeGemini();
    if (!model) {
        throw new Error('Gemini API not initialized');
    }

    const prompt = `You are an expert code reviewer and algorithm analyst. Analyze the following ${languageId || 'code'} and provide a detailed analysis in JSON format.

Code:
\`\`\`${languageId || ''}
${code}
\`\`\`

Provide your analysis in this EXACT JSON format (no markdown, just pure JSON):
{
  "complexity": {
    "time": "O(...)",
    "reason": "Explanation of time complexity",
    "space": "O(...)",
    "spaceReason": "Explanation of space complexity"
  },
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "habits": [
    {"type": "success", "message": "positive habit"},
    {"type": "warning", "message": "area to improve"}
  ]
}

Be precise with complexity analysis. You MUST provide:
- Time Complexity in Big O notation (e.g., O(n), O(n log n))
- Space Complexity in Big O notation
- Detailed reasoning for both, explaining WHICH loops or structures cause this complexity
- Consider best/average/worst cases if they differ significantly`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response (handle markdown code blocks)
        let jsonText = text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '');
        }

        const analysis = JSON.parse(jsonText);

        // Add default values for missing fields
        return {
            strengths: analysis.strengths || [],
            weaknesses: analysis.weaknesses || [],
            complexity: analysis.complexity || { time: "O(n)", reason: "Unable to determine", space: "O(1)", spaceReason: "Unable to determine" },
            habits: analysis.habits || [],
            nextChallenge: {
                id: 2,
                title: "Add Two Numbers",
                difficulty: "Medium",
                reason: "Continue building your skills with linked lists."
            },
            roadmap: [
                { title: "Master Arrays", status: "completed" },
                { title: "Hash Maps & Sets", status: "in-progress", resource: "https://www.youtube.com/watch?v=RBSGKlAvoiM" },
                { title: "Two Pointers Technique", status: "locked" },
                { title: "Linked Lists", status: "locked" }
            ],
            usingMock: false
        };
    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
};

// Main export function with fallback
export const analyzeCode = async (code, languageId) => {
    // Check if Gemini API is available
    if (hasApiKey()) {
        try {
            console.log('Using Gemini API for analysis...');
            return await geminiAnalyzeCode(code, languageId);
        } catch (error) {
            console.warn('Gemini API failed, falling back to mock analysis:', error.message);
            return await mockAnalyzeCode(code, languageId);
        }
    } else {
        console.log('No API key found, using mock analysis');
        return await mockAnalyzeCode(code, languageId);
    }
};
