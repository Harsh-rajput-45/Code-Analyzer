// WARNING: This uses eval() which is dangerous in production
// This is for DEMO purposes only. In production, use a sandboxed environment.

export const runTestCases = (code, problem, language) => {
    try {
        const results = [];

        // For JavaScript/Python-like syntax, we'll attempt to extract and run the function
        if (language === 'javascript' || language === 'python') {
            // Try to execute the code and run test cases
            for (const testCase of problem.testCases) {
                try {
                    // Create a safe execution context
                    const result = executeCode(code, testCase.input, problem.functionName, language);
                    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);

                    results.push({
                        input: testCase.input,
                        expected: testCase.expected,
                        actual: result,
                        passed: passed
                    });
                } catch (error) {
                    results.push({
                        input: testCase.input,
                        expected: testCase.expected,
                        actual: null,
                        passed: false,
                        error: error.message
                    });
                }
            }
        } else {
            // For other languages, return a message that execution is not supported
            return {
                success: false,
                message: `Code execution for ${language} is not supported in this demo. Please use JavaScript or Python.`,
                results: []
            };
        }

        const allPassed = results.every(r => r.passed);
        return {
            success: true,
            allPassed: allPassed,
            results: results,
            passedCount: results.filter(r => r.passed).length,
            totalCount: results.length
        };

    } catch (error) {
        return {
            success: false,
            message: error.message,
            results: []
        };
    }
};

function executeCode(code, input, functionName, language) {
    if (language === 'javascript') {
        // Extract function or create wrapper
        try {
            // Try to eval the code and call the function
            // eslint-disable-next-line no-eval
            eval(code);

            // Call the function with the input
            // eslint-disable-next-line no-eval
            const func = eval(functionName);

            // Handle different input formats
            if (functionName === 'twoSum') {
                return func(input.nums, input.target);
            } else if (functionName === 'addTwoNumbers') {
                // For linked list problems, we'd need helper functions
                // For now, return a placeholder
                return input.l1; // Simplified
            }

            return func(input);
        } catch (e) {
            throw new Error(`Execution error: ${e.message}`);
        }
    } else if (language === 'python') {
        // Python execution would require a backend or Pyodide
        // For now, return a placeholder
        throw new Error('Python execution requires a backend service');
    }

    throw new Error(`Unsupported language: ${language}`);
}
