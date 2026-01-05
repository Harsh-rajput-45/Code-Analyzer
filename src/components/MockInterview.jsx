import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Clock, AlertCircle, ArrowRight, StopCircle, Check, X } from 'lucide-react';
import { problems } from '../services/problemData';
import { mcqQuestions } from '../services/mcqData';
import CodeEditor from './CodeEditor';
import { analyzeCode } from '../services/aiService';
import { runTestCases } from '../services/codeExecutor';

const MockInterview = ({ onComplete }) => {
    const [status, setStatus] = useState('intro'); // 'intro', 'active', 'completed'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
    const [interviewQuestions, setInterviewQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [mcqSelection, setMcqSelection] = useState(null);
    const [showMcqFeedback, setShowMcqFeedback] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [selectedTime, setSelectedTime] = useState(30); // Default 30 minutes

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        let timer;
        if (status === 'active' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleEndInterview();
        }
        return () => clearInterval(timer);
    }, [status, timeLeft]);

    const startInterview = () => {
        console.log("Starting interview...");
        console.log("Problems:", problems?.length);
        console.log("MCQs:", mcqQuestions?.length);

        if (!problems || problems.length === 0 || !mcqQuestions || mcqQuestions.length === 0) {
            console.error("Questions data missing");
            return;
        }

        // Select 3 random coding problems
        const shuffledProblems = [...problems].sort(() => 0.5 - Math.random());
        const selectedProblems = shuffledProblems.slice(0, 3);

        // Select MCQs (using all 5 for now as per plan)
        const selectedMcqs = [...mcqQuestions];

        // Combine questions: MCQs first, then Coding
        const allQuestions = [...selectedMcqs, ...selectedProblems];
        console.log("All Questions:", allQuestions);

        setInterviewQuestions(allQuestions);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setMcqSelection(null);
        setShowMcqFeedback(false);
        setTimeLeft(selectedTime * 60);
        setStatus('active');
    };

    const handleEndInterview = () => {
        setStatus('completed');
    };

    const handleMcqSubmit = () => {
        if (mcqSelection === null) return;

        setShowMcqFeedback(true);

        setAnswers(prev => ({
            ...prev,
            [interviewQuestions[currentQuestionIndex].id]: {
                type: 'mcq',
                selected: mcqSelection,
                correct: mcqSelection === interviewQuestions[currentQuestionIndex].correctAnswer
            }
        }));
    };

    const handleNextQuestion = () => {
        setMcqSelection(null);
        setShowMcqFeedback(false);
        nextQuestion();
    };

    const handleCodeSubmit = async (code, language) => {
        setLoading(true);
        try {
            // 1. Run Test Cases
            const currentProblem = interviewQuestions[currentQuestionIndex];
            let testResults = { allPassed: false, results: [] };

            if (currentProblem.testCases) {
                testResults = await runTestCases(code, language, currentProblem.testCases, currentProblem.functionName);
            }

            // 2. AI Analysis
            const analysis = await analyzeCode(code, language);

            setAnswers(prev => ({
                ...prev,
                [currentProblem.id]: {
                    type: 'code',
                    code,
                    language,
                    testResults,
                    analysis
                }
            }));

            // Don't auto-advance for coding questions, let user decide or maybe just save
            // But for now, let's keep auto-advance or maybe just show success
            // User asked for "Next Question button", so maybe we shouldn't auto-advance here?
            // The request said "next question button should be their that user can se the both questions"
            // So I will remove auto-advance from here and rely on the manual navigation buttons I'll add.
            // But wait, if they submit, maybe they want to move on? 
            // I'll keep it as is for now but add explicit navigation buttons in the render.
            // Actually, I'll remove nextQuestion() call here to allow them to review their result.
            // nextQuestion(); 
            alert("Solution Submitted! You can move to the next question.");

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < interviewQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleEndInterview();
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setMcqSelection(null); // Reset selection state for UI
            setShowMcqFeedback(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (status === 'intro') {
        return (
            <div className="container" style={{ maxWidth: '800px', marginTop: '4rem', padding: isMobile ? '1rem' : '0 1.5rem' }}>
                <div className="glass-panel" style={{ padding: isMobile ? '1.5rem' : '3rem', textAlign: 'center' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <Clock size={40} color="var(--primary)" />
                    </div>
                    <h1 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Mock Interview Session</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Simulate a real technical interview. You'll face a mix of multiple-choice questions and coding challenges.
                    </p>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Select Duration:</label>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            {[30, 45, 60, 90].map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    style={{
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: 'var(--radius-full)',
                                        border: selectedTime === time ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                                        background: selectedTime === time ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-secondary)',
                                        color: selectedTime === time ? 'var(--primary)' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    {time} Minutes
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
                        <div className="glass-panel" style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>20 MCQs</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Test your theoretical knowledge</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>3 Coding Problems</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Solve algorithmic challenges</div>
                        </div>
                    </div>

                    <button
                        onClick={startInterview}
                        className="btn-ripple hover-lift"
                        style={{
                            background: 'var(--gradient-primary)',
                            color: 'white',
                            padding: '1rem 3rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            border: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: isMobile ? '100%' : 'auto',
                            justifyContent: 'center'
                        }}
                    >
                        Start Interview <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'completed') {
        const score = Object.values(answers).reduce((acc, curr) => {
            if (curr.type === 'mcq' && curr.correct) return acc + 1;
            if (curr.type === 'code' && curr.testResults?.allPassed) return acc + 1;
            return acc;
        }, 0);

        return (
            <div className="container" style={{ maxWidth: '800px', marginTop: '4rem', padding: isMobile ? '1rem' : '0 1.5rem' }}>
                <div className="glass-panel" style={{ padding: isMobile ? '1.5rem' : '3rem', textAlign: 'center' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'var(--success-light)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <CheckCircle size={40} color="var(--success)" />
                    </div>
                    <h1 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Interview Completed</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        You scored {score} out of {interviewQuestions.length}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                        {interviewQuestions.map((q, idx) => {
                            const ans = answers[q.id];
                            const isSkipped = !ans;
                            const isPassed = ans?.correct || ans?.testResults?.allPassed;

                            let statusColor = 'var(--text-secondary)';
                            let statusBg = 'var(--bg-tertiary)';
                            let statusText = 'Skipped';

                            if (!isSkipped) {
                                if (isPassed) {
                                    statusColor = 'var(--success)';
                                    statusBg = 'var(--success-light)';
                                    statusText = 'Passed';
                                } else {
                                    statusColor = 'var(--danger)';
                                    statusBg = 'var(--danger-light)';
                                    statusText = 'Failed';
                                }
                            }

                            return (
                                <div key={q.id} className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '0.5rem' : '0' }}>
                                        <h3 style={{ fontWeight: '600' }}>{idx + 1}. {q.title}</h3>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: 'var(--radius-full)',
                                            background: statusBg,
                                            color: statusColor,
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            alignSelf: isMobile ? 'flex-start' : 'auto'
                                        }}>
                                            {statusText}
                                        </span>
                                    </div>
                                    {ans?.type === 'code' && (
                                        <div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                                Time Complexity: {ans.analysis?.complexity?.time || 'N/A'}
                                            </div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                Space Complexity: {ans.analysis?.complexity?.space || 'N/A'}
                                            </div>
                                        </div>
                                    )}
                                    {ans?.type === 'mcq' && (
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            Selected: {String.fromCharCode(65 + ans.selected)}
                                            {!ans.correct && ` (Correct: ${String.fromCharCode(65 + q.correctAnswer)})`}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setStatus('intro')}
                        className="hover-lift"
                        style={{
                            marginTop: '2rem',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            padding: '1rem 2rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--glass-border-strong)',
                            fontWeight: '600',
                            width: isMobile ? '100%' : 'auto'
                        }}
                    >
                        Start New Session
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = interviewQuestions[currentQuestionIndex];

    if (status === 'active' && !currentQuestion) {
        return (
            <div className="container flex-center" style={{ height: '100%', flex: 1 }}>
                <div className="animate-spin" style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid var(--bg-tertiary)',
                    borderTopColor: 'var(--primary)',
                    borderRadius: '50%'
                }} />
            </div>
        );
    }

    const isMcq = currentQuestion?.type === 'mcq';

    return (
        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
                padding: isMobile ? '1rem' : '1rem 2rem',
                borderBottom: '1px solid var(--glass-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-secondary)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h2 style={{ fontSize: isMobile ? '1rem' : '1.25rem', fontWeight: '600' }}>Question {currentQuestionIndex + 1} of {interviewQuestions.length}</h2>
                    <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        background: currentQuestion.difficulty === 'Easy' ? 'var(--success-light)' : currentQuestion.difficulty === 'Medium' ? 'var(--warning-light)' : 'var(--danger-light)',
                        color: currentQuestion.difficulty === 'Easy' ? 'var(--success)' : currentQuestion.difficulty === 'Medium' ? 'var(--warning)' : 'var(--danger)',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                    }}>{currentQuestion.difficulty}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: timeLeft < 300 ? 'var(--danger)' : 'var(--text-primary)', fontWeight: '600' }}>
                        <Clock size={20} />
                        {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={handleEndInterview}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--danger)',
                            background: 'transparent',
                            border: '1px solid var(--danger)',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer'
                        }}
                    >
                        <StopCircle size={18} /> {isMobile ? '' : 'End Interview'}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: (isMobile || isMcq) ? 'column' : 'row', overflow: 'hidden' }}>
                {isMcq ? (
                    <div className="container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem', overflowY: 'auto', width: '100%' }}>
                        <div className="glass-panel" style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
                            <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>{currentQuestion.title}</h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>{currentQuestion.description}</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                {currentQuestion.options.map((option, idx) => {
                                    let borderColor = 'var(--glass-border)';
                                    let backgroundColor = 'var(--bg-tertiary)';
                                    let textColor = 'var(--text-primary)';

                                    if (showMcqFeedback) {
                                        if (idx === currentQuestion.correctAnswer) {
                                            borderColor = 'var(--success)';
                                            backgroundColor = 'rgba(16, 185, 129, 0.2)'; // success-light with more opacity
                                            textColor = 'var(--success)';
                                        } else if (idx === mcqSelection) {
                                            borderColor = 'var(--danger)';
                                            backgroundColor = 'rgba(239, 68, 68, 0.2)'; // danger-light with more opacity
                                            textColor = 'var(--danger)';
                                        }
                                    } else if (mcqSelection === idx) {
                                        borderColor = 'var(--primary)';
                                        backgroundColor = 'rgba(99, 102, 241, 0.2)'; // primary with more opacity
                                        textColor = 'var(--primary)';
                                    }

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => !showMcqFeedback && setMcqSelection(idx)}
                                            className={!showMcqFeedback && mcqSelection !== idx ? "hover-lift" : ""}
                                            style={{
                                                padding: '1.25rem',
                                                borderRadius: 'var(--radius-md)',
                                                border: `2px solid ${borderColor}`,
                                                background: backgroundColor,
                                                color: textColor,
                                                cursor: showMcqFeedback ? 'default' : 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontWeight: mcqSelection === idx ? '600' : '400'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '50%',
                                                    border: `2px solid ${textColor}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '700'
                                                }}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                {option}
                                            </div>
                                            {showMcqFeedback && idx === currentQuestion.correctAnswer && <CheckCircle size={20} color="var(--success)" />}
                                            {showMcqFeedback && idx === mcqSelection && idx !== currentQuestion.correctAnswer && <X size={20} color="var(--danger)" />}
                                        </div>
                                    );
                                })}
                            </div>

                            {!showMcqFeedback ? (
                                <button
                                    onClick={handleMcqSubmit}
                                    disabled={mcqSelection === null}
                                    className="btn-ripple hover-lift"
                                    style={{
                                        background: 'var(--gradient-primary)',
                                        color: 'white',
                                        padding: '0.75rem 2rem',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: '600',
                                        border: 'none',
                                        opacity: mcqSelection === null ? 0.5 : 1,
                                        width: '100%',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    Submit Answer
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextQuestion}
                                    className="btn-ripple hover-lift"
                                    style={{
                                        background: 'var(--success)',
                                        color: 'white',
                                        padding: '0.75rem 2rem',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: '600',
                                        border: 'none',
                                        width: '100%',
                                        marginBottom: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {currentQuestionIndex < interviewQuestions.length - 1 ? 'Next Question' : 'Finish Interview'} <ArrowRight size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Problem Description */}
                        <div style={{ flex: 1, padding: isMobile ? '1rem' : '2rem', overflowY: 'auto', borderRight: isMobile ? 'none' : '1px solid var(--glass-border)', borderBottom: isMobile ? '1px solid var(--glass-border)' : 'none', height: isMobile ? '50%' : 'auto' }}>
                            <h1 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>{currentQuestion.title}</h1>
                            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                {currentQuestion.description}
                            </div>

                            {currentQuestion.examples && (
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Examples</h3>
                                    {currentQuestion.examples.map((ex, i) => (
                                        <div key={i} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                                                <strong>Input:</strong> {ex.input}<br />
                                                <strong>Output:</strong> {ex.output}
                                                {ex.explanation && (
                                                    <>
                                                        <br /><strong>Explanation:</strong> {ex.explanation}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {currentQuestion.constraints && (
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Constraints</h3>
                                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                        {currentQuestion.constraints.map((c, i) => (
                                            <li key={i} style={{ marginBottom: '0.5rem' }}>{c}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Editor */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: isMobile ? '50%' : 'auto' }}>
                            <CodeEditor
                                onSubmit={handleCodeSubmit}
                                showSubmitButton={true}
                            />

                            {/* Navigation Buttons for Coding Questions */}
                            <div style={{
                                padding: '1rem',
                                borderTop: '1px solid var(--glass-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                background: 'var(--bg-secondary)'
                            }}>
                                <button
                                    onClick={prevQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--glass-border)',
                                        background: currentQuestionIndex === 0 ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                                        color: currentQuestionIndex === 0 ? 'var(--text-tertiary)' : 'var(--text-primary)',
                                        cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    Previous
                                </button>

                                <button
                                    onClick={nextQuestion}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--glass-border)',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {currentQuestionIndex < interviewQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MockInterview;
