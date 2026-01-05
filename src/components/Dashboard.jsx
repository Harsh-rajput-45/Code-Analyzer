import React, { useState } from 'react';
import { Trophy, Flame, Clock, Target, Calendar, ArrowRight, X, Code2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, history } = useAuth();
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Calculate stats
    const totalSolved = history.length;
    const uniqueSolved = new Set(history.map(h => h.problemTitle)).size;

    // Calculate streak (simplified version)
    const streak = 1;

    // Calculate difficulty breakdown
    const difficultyStats = history.reduce((acc, curr) => {
        acc[curr.difficulty] = (acc[curr.difficulty] || 0) + 1;
        return acc;
    }, { Easy: 0, Medium: 0, Hard: 0 });

    const recentActivity = [...history].reverse().slice(0, 5);

    // Calculate time spent
    const [timeSpent, setTimeSpent] = useState('0m');

    React.useEffect(() => {
        const updateDisplayTime = () => {
            if (!user) return;
            const totalMs = parseInt(localStorage.getItem(`codecoach_time_spent_${user.id}`) || '0', 10);
            const hours = Math.floor(totalMs / (1000 * 60 * 60));
            const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));

            if (hours > 0) {
                setTimeSpent(`${hours}h ${minutes}m`);
            } else {
                setTimeSpent(`${minutes}m`);
            }
        };

        updateDisplayTime();
        const interval = setInterval(updateDisplayTime, 60000); // Update every minute in UI
        return () => clearInterval(interval);
    }, [user]);

    return (
        <div className="container" style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
            <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Welcome back, <span className="gradient-text">{user?.name || 'Developer'}</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>Here's your progress overview</p>
            </div>

            {/* Stats Grid */}
            <div className="animate-slide-up stagger-1" style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(66, 133, 244, 0.1)', color: '#4285f4' }}>
                        <Trophy size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{uniqueSolved}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Problems Solved</div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(217, 101, 112, 0.1)', color: '#d96570' }}>
                        <Flame size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{streak}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Day Streak</div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(155, 114, 203, 0.1)', color: '#9b72cb' }}>
                        <Clock size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{timeSpent}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Time Spent</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '2rem' }}>
                {/* Recent Activity */}
                <div className="glass-panel animate-slide-up stagger-2" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={20} /> Recent Activity
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedSubmission(item)}
                                    className="hover-lift"
                                    style={{
                                        padding: '1rem',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{item.problemTitle}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            {new Date(item.date).toLocaleDateString()} • {item.language}
                                        </div>
                                    </div>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: 'var(--radius-full)',
                                        background: item.difficulty === 'Easy' ? 'var(--success-light)' : item.difficulty === 'Medium' ? 'var(--warning-light)' : 'var(--danger-light)',
                                        color: item.difficulty === 'Easy' ? 'var(--success)' : item.difficulty === 'Medium' ? 'var(--warning)' : 'var(--danger)',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        {item.difficulty}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                                No activity yet. Start solving problems!
                            </div>
                        )}
                    </div>
                </div>

                {/* Difficulty Breakdown */}
                <div className="glass-panel animate-slide-up stagger-3" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Target size={20} /> Difficulty Breakdown
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { label: 'Easy', count: difficultyStats.Easy, color: 'var(--success)', bg: 'var(--success-light)' },
                            { label: 'Medium', count: difficultyStats.Medium, color: 'var(--warning)', bg: 'var(--warning-light)' },
                            { label: 'Hard', count: difficultyStats.Hard, color: 'var(--danger)', bg: 'var(--danger-light)' }
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    <span style={{ fontWeight: '500' }}>{stat.label}</span>
                                    <span style={{ color: 'var(--text-secondary)' }}>{stat.count} solved</span>
                                </div>
                                <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${totalSolved ? (stat.count / totalSolved) * 100 : 0}%`,
                                        background: stat.color,
                                        borderRadius: '4px',
                                        transition: 'width 1s ease-out'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Submission Details Modal */}
            {selectedSubmission && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }} onClick={() => setSelectedSubmission(null)}>
                    <div
                        onClick={e => e.stopPropagation()}
                        className="glass-panel animate-scale-in"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            padding: '0',
                            background: 'var(--bg-secondary)'
                        }}
                    >
                        <div style={{
                            padding: '1.5rem',
                            borderBottom: '1px solid var(--glass-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'sticky',
                            top: 0,
                            background: 'var(--bg-secondary)',
                            zIndex: 10
                        }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>{selectedSubmission.problemTitle}</h2>
                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    <span>{new Date(selectedSubmission.date).toLocaleString()}</span>
                                    <span>•</span>
                                    <span style={{ textTransform: 'capitalize' }}>{selectedSubmission.language}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedSubmission(null)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Code2 size={20} /> Submitted Code
                                </h3>
                                <pre style={{
                                    background: 'var(--bg-primary)',
                                    padding: '1.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    overflowX: 'auto',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.9rem',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    {selectedSubmission.code}
                                </pre>
                            </div>

                            {selectedSubmission.result && (
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CheckCircle size={20} /> Analysis Result
                                    </h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div className="glass-panel" style={{ padding: '1rem', background: 'var(--bg-tertiary)' }}>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Time Complexity</div>
                                            <div style={{ fontWeight: '600', color: 'var(--primary)' }}>{selectedSubmission.result.complexity?.time || 'N/A'}</div>
                                        </div>
                                        <div className="glass-panel" style={{ padding: '1rem', background: 'var(--bg-tertiary)' }}>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Space Complexity</div>
                                            <div style={{ fontWeight: '600', color: 'var(--secondary)' }}>{selectedSubmission.result.complexity?.space || 'N/A'}</div>
                                        </div>
                                    </div>

                                    {selectedSubmission.result.strengths && (
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--success)' }}>Strengths</h4>
                                            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                                {selectedSubmission.result.strengths.map((s, i) => (
                                                    <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {selectedSubmission.result.weaknesses && (
                                        <div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--warning)' }}>Areas for Improvement</h4>
                                            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                                {selectedSubmission.result.weaknesses.map((w, i) => (
                                                    <li key={i} style={{ marginBottom: '0.25rem' }}>{w}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
