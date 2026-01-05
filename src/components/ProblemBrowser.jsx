import React, { useState, useMemo } from 'react';
import { CheckCircle, Circle, ArrowRight, Search, Filter } from 'lucide-react';
import { problems } from '../services/problemData';

const ProblemBrowser = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('All');
    const [completedProblems, setCompletedProblems] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load completed problems from localStorage
    React.useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('completedProblems') || '[]');
        setCompletedProblems(saved);
    }, []);

    const filteredProblems = useMemo(() => {
        return problems.map(prob => ({
            ...prob,
            status: completedProblems.includes(prob.id) ? 'solved' : 'unsolved'
        })).filter(prob => {
            const matchesSearch = prob.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prob.topic.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDifficulty = difficultyFilter === 'All' || prob.difficulty === difficultyFilter;
            return matchesSearch && matchesDifficulty;
        });
    }, [searchTerm, difficultyFilter, completedProblems]);

    const toggleProblemStatus = (e, problemId) => {
        e.stopPropagation(); // Prevent row click
        let newCompleted;
        if (completedProblems.includes(problemId)) {
            newCompleted = completedProblems.filter(id => id !== problemId);
        } else {
            newCompleted = [...completedProblems, problemId];
        }
        setCompletedProblems(newCompleted);
        localStorage.setItem('completedProblems', JSON.stringify(newCompleted));
    };

    return (
        <div className="container" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
            <div className="flex-center animate-fade-in" style={{ justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Popular <span className="gradient-text">Problems</span></h2>

                <div className="flex-center" style={{ gap: '1rem' }}>
                    {/* Search */}
                    <div className="glass-panel" style={{
                        position: 'relative',
                        padding: '0.625rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        width: '300px',
                        transition: 'all var(--transition-base)'
                    }}>
                        <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
                        <input
                            type="text"
                            placeholder="Search problems or topics..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                width: '100%',
                                fontSize: '0.875rem'
                            }}
                        />
                    </div>

                    {/* Filter */}
                    <div className="glass-panel" style={{ position: 'relative' }}>
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="hover-lift"
                            style={{
                                appearance: 'none',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                padding: '0.625rem 2.5rem 0.625rem 1rem',
                                cursor: 'pointer',
                                outline: 'none',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}
                        >
                            <option value="All">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <Filter size={16} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ overflow: 'hidden' }}>
                {!isMobile && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '50px 50px minmax(200px, 1fr) 100px 140px 100px',
                        gap: '1rem',
                        padding: '1rem 1.5rem',
                        borderBottom: '1px solid var(--bg-tertiary)',
                        color: 'var(--text-muted)',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                    }}>
                        <span>Status</span>
                        <span>#</span>
                        <span>Title</span>
                        <span>Difficulty</span>
                        <span>Topic</span>
                        <span>Action</span>
                    </div>
                )}

                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {filteredProblems.length > 0 ? (
                        filteredProblems.map((prob) => (
                            <div key={prob.id} className="problem-row" style={{
                                display: isMobile ? 'flex' : 'grid',
                                gridTemplateColumns: '50px 50px minmax(200px, 1fr) 100px 140px 100px',
                                gap: isMobile ? '0' : '1rem',
                                justifyContent: isMobile ? 'space-between' : 'initial',
                                padding: '1.25rem 1.5rem',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                alignItems: 'center',
                                transition: 'all var(--transition-base)',
                                cursor: 'pointer'
                            }}>
                                {!isMobile && (
                                    <>
                                        <span
                                            onClick={(e) => toggleProblemStatus(e, prob.id)}
                                            style={{ cursor: 'pointer' }}
                                            className="hover-scale"
                                        >
                                            {prob.status === 'solved' ?
                                                <CheckCircle size={18} color="var(--success)" /> :
                                                <Circle size={18} color="var(--text-muted)" />
                                            }
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>{prob.id}</span>
                                    </>
                                )}

                                {isMobile ? (
                                    <div>
                                        <div style={{ fontWeight: '500', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{prob.title}</div>
                                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                                            <span style={{
                                                color: prob.difficulty === 'Easy' ? 'var(--success)' : prob.difficulty === 'Medium' ? 'var(--warning)' : 'var(--danger)',
                                                fontWeight: '600'
                                            }}>{prob.difficulty}</span>
                                            <span style={{ color: 'var(--text-muted)' }}>•</span>
                                            <span style={{ color: 'var(--text-muted)' }}>{prob.topic}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <span style={{ fontWeight: '500', fontSize: '0.9375rem' }}>{prob.title}</span>
                                )}

                                {!isMobile && (
                                    <>
                                        <span style={{
                                            color: prob.difficulty === 'Easy' ? 'var(--success)' : prob.difficulty === 'Medium' ? 'var(--warning)' : 'var(--danger)',
                                            fontSize: '0.875rem',
                                            fontWeight: '600'
                                        }}>{prob.difficulty}</span>
                                        <span style={{
                                            background: 'var(--bg-tertiary)',
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem',
                                            width: 'fit-content',
                                            fontWeight: '500'
                                        }}>{prob.topic}</span>
                                    </>
                                )}

                                <button
                                    onClick={() => onSelect(prob)}
                                    className="hover-scale"
                                    style={{
                                        color: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isMobile ? <ArrowRight size={20} /> : <>Solve <ArrowRight size={14} /></>}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No problems found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
            <style>{`
        .problem-row:hover {
          background: rgba(99, 102, 241, 0.05);
          border-left: 3px solid var(--primary);
        }
      `}</style>
        </div>
    );
};

export default ProblemBrowser;
