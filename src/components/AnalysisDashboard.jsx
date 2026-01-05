import React from 'react';
import { CheckCircle, AlertTriangle, ArrowRight, BookOpen, Clock, Zap, Award } from 'lucide-react';

const AnalysisDashboard = ({ analysis, onSolveNext }) => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!analysis) return null;

    return (
        <div className="container" style={{ maxWidth: '1000px', marginTop: '2rem', paddingBottom: '4rem' }}>
            {/* Demo Mode Indicator */}
            {analysis.usingMock && (
                <div className="animate-slide-down" style={{
                    padding: '1rem 1.5rem',
                    marginBottom: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(99, 102, 241, 0.2)'
                    }}>
                        <BookOpen size={20} color="var(--primary)" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Demo Mode Active</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            You're viewing mock analysis results. Add your Gemini API key in Settings for real AI-powered code analysis.
                        </div>
                    </div>
                </div>
            )}

            {/* Header Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                        <Clock size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Time Complexity</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{analysis.complexity?.time || "N/A"}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{analysis.complexity?.reason}</div>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
                        <Zap size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Space Complexity</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{analysis.complexity?.space || "N/A"}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{analysis.complexity?.spaceReason || ""}</div>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', color: 'var(--warning)' }}>
                        <Award size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Code Quality</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Good</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '2rem' }}>
                {/* Main Feedback */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Strengths */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <CheckCircle className="text-success" size={24} color="var(--success)" />
                            Strengths
                        </h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {analysis.strengths.map((strength, index) => (
                                <li key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', marginTop: '0.6rem' }} />
                                    <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <AlertTriangle className="text-warning" size={24} color="var(--warning)" />
                            Areas for Improvement
                        </h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {analysis.weaknesses.map((weakness, index) => (
                                <li key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warning)', marginTop: '0.6rem' }} />
                                    <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{weakness}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Code Habits */}
                    {analysis.habits && analysis.habits.length > 0 && (
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <BookOpen size={24} color="var(--primary)" />
                                Code Habits
                            </h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {analysis.habits.map((habit, index) => (
                                    <li key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                                        {habit.type === 'success' ? <CheckCircle size={18} color="var(--success)" /> : <AlertTriangle size={18} color="var(--warning)" />}
                                        <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{habit.message}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Sidebar: Next Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Next Challenge */}
                    <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>Recommended Challenge</h3>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{analysis.nextChallenge.title}</div>
                            <span style={{
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.75rem',
                                borderRadius: 'var(--radius-full)',
                                background: 'rgba(234, 179, 8, 0.2)',
                                color: 'var(--warning)',
                                fontWeight: '600'
                            }}>
                                {analysis.nextChallenge.difficulty}
                            </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                            {analysis.nextChallenge.reason}
                        </p>
                        <button
                            onClick={() => onSolveNext(analysis.nextChallenge.id)}
                            className="flex-center"
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '600',
                                gap: '0.5rem',
                                transition: 'transform 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Start Challenge <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* Learning Roadmap */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Your Learning Path</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {analysis.roadmap.map((step, index) => (
                                <div key={index} style={{ display: 'flex', gap: '1rem', position: 'relative', paddingBottom: index === analysis.roadmap.length - 1 ? 0 : '2rem' }}>
                                    {index !== analysis.roadmap.length - 1 && (
                                        <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '0', width: '2px', background: 'var(--bg-tertiary)' }} />
                                    )}
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: step.status === 'completed' ? 'var(--success)' : step.status === 'in-progress' ? 'var(--primary)' : 'var(--bg-tertiary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        zIndex: 1
                                    }}>
                                        {step.status === 'completed' && <CheckCircle size={14} color="white" />}
                                        {step.status === 'in-progress' && <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: step.status === 'locked' ? 'var(--text-muted)' : 'var(--text-primary)', marginBottom: '0.25rem' }}>{step.title}</div>
                                        {step.resource && (
                                            <a href={step.resource} className="flex-center" style={{ gap: '0.25rem', fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none' }}>
                                                <BookOpen size={12} /> View Resource
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisDashboard;
