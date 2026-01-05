import React, { useState } from 'react';
import { Play, Youtube, ExternalLink, CheckCircle, XCircle, Check } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { runTestCases } from '../services/codeExecutor';

const ProblemWorkspace = ({ problem, onSubmit, loading, onMarkComplete }) => {
    const [activeTab, setActiveTab] = useState('description');
    const [testResults, setTestResults] = useState(null);
    const [runningTests, setRunningTests] = useState(false);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!problem) return null;

    const handleRunTests = () => {
        if (!code.trim() || !problem.testCases) return;

        setRunningTests(true);
        setTestResults(null);

        setTimeout(() => {
            const results = runTestCases(code, problem, language);
            setTestResults(results);
            setRunningTests(false);
        }, 500);
    };

    const handleCodeChange = (newCode, newLanguage) => {
        setCode(newCode);
        setLanguage(newLanguage);
    };

    return (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: 'calc(100vh - 4rem)', gap: '1rem' }}>
            {/* Left Panel: Problem Description */}
            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: isMobile ? '50%' : 'auto' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--bg-tertiary)', background: 'rgba(0,0,0,0.1)' }}>
                    <button onClick={() => setActiveTab('description')} style={{ padding: '1rem', borderBottom: activeTab === 'description' ? '2px solid var(--primary)' : 'none', color: activeTab === 'description' ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: '500', flex: 1 }}>
                        Description
                    </button>
                    <button onClick={() => setActiveTab('testcases')} style={{ padding: '1rem', borderBottom: activeTab === 'testcases' ? '2px solid var(--primary)' : 'none', color: activeTab === 'testcases' ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: '500', flex: 1 }}>
                        Test Results
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {activeTab === 'description' && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '0.5rem' : '0' }}>
                                <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: '700' }}>{problem.id}. {problem.title}</h2>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', background: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.1)' : problem.difficulty === 'Medium' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: problem.difficulty === 'Easy' ? 'var(--success)' : problem.difficulty === 'Medium' ? 'var(--warning)' : 'var(--danger)' }}>
                                        {problem.difficulty}
                                    </span>
                                    {problem.status === 'solved' && (
                                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <CheckCircle size={12} /> Solved
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                                {problem.description ? problem.description.split('\n').map((line, i) => <p key={i} style={{ marginBottom: '1rem' }}>{line}</p>) : <p>No description available.</p>}
                            </div>

                            {problem.examples && problem.examples.length > 0 && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Examples</h3>
                                    {problem.examples.map((ex, i) => (
                                        <div key={i} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                                            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-primary)' }}>Input:</strong> {ex.input}</div>
                                            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-primary)' }}>Output:</strong> {ex.output}</div>
                                            {ex.explanation && <div><strong style={{ color: 'var(--text-primary)' }}>Explanation:</strong> {ex.explanation}</div>}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {problem.constraints && problem.constraints.length > 0 && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Constraints</h3>
                                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                        {problem.constraints.map((c, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{c}</li>)}
                                    </ul>
                                </div>
                            )}

                            {problem.youtubeLink && (
                                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--bg-tertiary)' }}>
                                    <a href={problem.youtubeLink} target="_blank" rel="noopener noreferrer" className="flex-center" style={{ gap: '0.5rem', color: '#ef4444', fontWeight: '600', textDecoration: 'none', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)', width: 'fit-content' }}>
                                        <Youtube size={20} /> Watch Video Solution <ExternalLink size={14} />
                                    </a>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'testcases' && (
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Test Results</h3>

                            {!testResults && !runningTests && (
                                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                    <p>Click "Run Tests" to see results</p>
                                </div>
                            )}

                            {runningTests && (
                                <div style={{ textAlign: 'center', padding: '3rem' }}>
                                    <div className="loading-spinner" style={{ width: '32px', height: '32px', border: '3px solid var(--bg-tertiary)', borderTop: '3px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Running tests...</p>
                                </div>
                            )}

                            {testResults && (
                                <div>
                                    {testResults.success ? (
                                        <>
                                            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: testResults.allPassed ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                {testResults.allPassed ? <CheckCircle size={24} color="var(--success)" /> : <XCircle size={24} color="var(--danger)" />}
                                                <div>
                                                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{testResults.allPassed ? 'All Tests Passed!' : 'Some Tests Failed'}</div>
                                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{testResults.passedCount} / {testResults.totalCount} test cases passed</div>
                                                </div>
                                            </div>

                                            {testResults.results.map((result, i) => (
                                                <div key={i} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', marginBottom: '1rem', border: `1px solid ${result.passed ? 'var(--success)' : 'var(--danger)'}`, borderLeft: `4px solid ${result.passed ? 'var(--success)' : 'var(--danger)'}` }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                                        {result.passed ? <Check size={16} color="var(--success)" /> : <XCircle size={16} color="var(--danger)" />}
                                                        <strong>Test Case {i + 1}</strong>
                                                    </div>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                                                        <div style={{ marginBottom: '0.5rem' }}><strong>Input:</strong> {JSON.stringify(result.input)}</div>
                                                        <div style={{ marginBottom: '0.5rem' }}><strong>Expected:</strong> <span style={{ color: 'var(--success)' }}>{JSON.stringify(result.expected)}</span></div>
                                                        <div><strong>Actual:</strong> <span style={{ color: result.passed ? 'var(--success)' : 'var(--danger)' }}>{JSON.stringify(result.actual)}</span></div>
                                                        {result.error && <div style={{ marginTop: '0.5rem', color: 'var(--danger)' }}><strong>Error:</strong> {result.error}</div>}
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
                                            <strong>Error:</strong> {testResults.message}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Code Editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', height: isMobile ? '50%' : 'auto' }}>
                <CodeEditor
                    onSubmit={(c, l) => onSubmit(c, l)}
                    onCodeChange={handleCodeChange}
                    showSubmitButton={false}
                />

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={handleRunTests}
                        disabled={!code.trim() || runningTests || !problem.testCases}
                        className="flex-center hover-lift"
                        style={{
                            flex: 1,
                            padding: '0.875rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)',
                            fontWeight: '600',
                            gap: '0.5rem',
                            opacity: !code.trim() || runningTests || !problem.testCases ? 0.5 : 1
                        }}
                    >
                        <Play size={18} /> Run Code
                    </button>

                    <button
                        onClick={() => onSubmit(code, language)}
                        disabled={!code.trim() || loading}
                        className="flex-center btn-ripple hover-lift"
                        style={{
                            flex: 1,
                            padding: '0.875rem',
                            background: 'var(--gradient-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            gap: '0.5rem',
                            opacity: !code.trim() || loading ? 0.5 : 1,
                            boxShadow: '0 4px 12px var(--primary-glow)'
                        }}
                    >
                        {loading ? (
                            <div className="animate-spin" style={{ width: '18px', height: '18px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} />
                        ) : (
                            <CheckCircle size={18} />
                        )}
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProblemWorkspace;
