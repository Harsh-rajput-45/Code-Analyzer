import React from 'react';
import { ArrowRight, Sparkles, Code2, Brain, TrendingUp, Target } from 'lucide-react';

const Hero = ({ onStart, onNavigate, user }) => {
    return (
        <section style={{
            padding: '4rem 1.5rem',
            maxWidth: '1000px',
            margin: '0 auto',
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <div className="animate-fade-in" style={{ marginBottom: '4rem' }}>
                <h1 style={{
                    fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                    fontWeight: '500',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em',
                    marginBottom: '1rem',
                    background: 'linear-gradient(90deg, #4285f4, #9b72cb, #d96570)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}>
                    Hello, {user?.name || 'Developer'}
                </h1>
                <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem'
                }}>
                    How can I help you prepare today?
                </h2>
            </div>

            <div className="animate-slide-up stagger-1" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '3rem'
            }}>
                {[
                    { icon: Code2, title: 'Analyze Code', desc: 'Get instant feedback on your algorithms', action: onStart },
                    { icon: Brain, title: 'Mock Interview', desc: 'Simulate a real coding interview', action: () => onNavigate('mock-interview') },
                    { icon: TrendingUp, title: 'Track Progress', desc: 'View your learning analytics', action: () => onNavigate('dashboard') },
                    { icon: Target, title: 'Browse Problems', desc: 'Practice with curated challenges', action: () => onNavigate('problems') }
                ].map((card, index) => (
                    <div
                        key={index}
                        onClick={card.action}
                        className="hover-lift"
                        style={{
                            background: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            border: '1px solid transparent'
                        }}
                    >
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--bg-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            color: 'var(--primary)'
                        }}>
                            <card.icon size={20} />
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{card.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{card.desc}</p>
                    </div>
                ))}
            </div>

            <div className="animate-fade-in stagger-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={onStart}
                    className="flex-center hover-lift"
                    style={{
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                        border: '1px solid var(--glass-border-strong)',
                        gap: '0.5rem'
                    }}
                >
                    <Sparkles size={16} color="var(--primary)" />
                    Start a new coding session
                </button>
            </div>
        </section>
    );
};

export default Hero;
