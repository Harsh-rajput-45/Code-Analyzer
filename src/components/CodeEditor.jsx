import React, { useState } from 'react';
import { Play, RotateCcw, Copy, AlertTriangle } from 'lucide-react';

const LANGUAGES = [
    { id: 'cpp', name: 'C++', placeholder: '// Write your C++ solution here\n#include <iostream>\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};' },
    { id: 'python', name: 'Python', placeholder: '# Write your Python solution here\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass' },
    { id: 'java', name: 'Java', placeholder: '// Write your Java solution here\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}' },
    { id: 'javascript', name: 'JavaScript', placeholder: '// Write your JavaScript solution here\n/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};' },
    { id: 'c', name: 'C', placeholder: '// Write your C solution here\n/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    \n}' },
];

const CodeEditor = ({ onSubmit, onCodeChange, showSubmitButton = true }) => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState(LANGUAGES[0]);
    const [error, setError] = useState(null);

    const handleLanguageChange = (langId) => {
        const newLang = LANGUAGES.find(l => l.id === langId);
        setLanguage(newLang);
        setCode('');
        setError(null);
        if (onCodeChange) onCodeChange('', newLang.id);
    };

    const handleCodeUpdate = (newCode) => {
        setCode(newCode);
        if (onCodeChange) onCodeChange(newCode, language.id);
    };

    const validateCode = () => {
        if (!code.trim()) return false;

        // Simple heuristic validation
        let isValid = true;
        if (language.id === 'python' && !code.includes('def ')) isValid = false;
        if ((language.id === 'cpp' || language.id === 'c' || language.id === 'java') && !code.includes(';')) isValid = false;
        if (language.id === 'java' && !code.includes('class ')) isValid = false;

        if (!isValid) {
            setError(`It looks like you might not be writing valid ${language.name} code. Please check your syntax.`);
            return false;
        }
        return true;
    };

    const handleAnalyze = () => {
        setError(null);
        if (validateCode()) {
            onSubmit(code, language.id);
        }
    };

    return (
        <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '300px', position: 'relative' }}>
            {/* Gradient Accent Bar */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'var(--gradient-primary)',
                zIndex: 10
            }} />

            {/* Editor Header */}
            <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(15, 23, 42, 0.5)'
            }}>
                <div className="flex-center" style={{ gap: '1rem' }}>
                    <div className="flex-center" style={{ gap: '0.5rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
                    </div>

                    <select
                        value={language.id}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="hover-lift"
                        style={{
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--glass-border)',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.875rem',
                            outline: 'none',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.id} value={lang.id}>{lang.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex-center" style={{ gap: '1rem' }}>
                    <button
                        className="flex-center hover-scale"
                        style={{
                            gap: '0.5rem',
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'transparent'
                        }}
                        onClick={() => { setCode(''); setError(null); }}
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                    {showSubmitButton && (
                        <button
                            className="flex-center btn-ripple hover-lift"
                            style={{
                                gap: '0.5rem',
                                background: 'var(--gradient-primary)',
                                color: 'white',
                                padding: '0.625rem 1.25rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                boxShadow: '0 4px 12px var(--primary-glow)',
                                opacity: !code.trim() ? 0.5 : 1
                            }}
                            onClick={handleAnalyze}
                            disabled={!code.trim()}
                        >
                            <Play size={16} fill="currentColor" />
                            Analyze Solution
                        </button>
                    )}
                </div>
            </div>

            {/* Editor Area */}
            <div style={{ flex: 1, position: 'relative' }}>
                <textarea
                    value={code}
                    onChange={(e) => handleCodeUpdate(e.target.value)}
                    placeholder={language.placeholder}
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: 'none',
                        padding: '1.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        resize: 'none',
                        outline: 'none',
                        lineHeight: '1.6'
                    }}
                    spellCheck="false"
                />

                {error && (
                    <div className="animate-slide-up" style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        right: '1rem',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid var(--danger)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: 'var(--danger)',
                        fontSize: '0.9rem',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <AlertTriangle size={18} />
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeEditor;
