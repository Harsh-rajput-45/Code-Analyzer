import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Code2, ArrowRight, Loader2, Mail, Lock, User } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, signup, googleLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isLogin) {
                await login(username, password);
            } else {
                await signup(username, email, password);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)',
            position: 'relative',
            overflowY: 'auto',
            padding: '2rem'
        }}>
            {/* Background Decor */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                opacity: 0.2,
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                opacity: 0.2,
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />

            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div className="flex-center" style={{ flexDirection: 'column', marginBottom: '2rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem'
                    }}>
                        <Code2 size={32} color="white" />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                        {isLogin ? 'Sign in to continue your learning journey' : 'Join us and start mastering algorithms'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Username
                        </label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--bg-tertiary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--bg-tertiary)'}
                            />
                        </div>
                    </div>

                    {!isLogin && (
                        <div className="animate-slide-up">
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--bg-tertiary)',
                                        color: 'var(--text-primary)',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--bg-tertiary)'}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--bg-tertiary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--bg-tertiary)'}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-center"
                        style={{
                            marginTop: '1rem',
                            width: '100%',
                            padding: '0.875rem',
                            background: 'var(--primary)',
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            fontSize: '1rem',
                            opacity: isLoading ? 0.7 : 1,
                            transition: 'background 0.2s',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => !isLoading && (e.currentTarget.style.background = 'var(--primary-hover)')}
                        onMouseOut={(e) => !isLoading && (e.currentTarget.style.background = 'var(--primary)')}
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></>}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--bg-tertiary)' }} />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--bg-tertiary)' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="flex-center"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--bg-tertiary)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                fontWeight: '500',
                                gap: '0.75rem',
                                transition: 'background 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '18px' }} />
                            Continue with Google
                        </button>
                        <button
                            type="button"
                            className="flex-center"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--bg-tertiary)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                fontWeight: '500',
                                gap: '0.75rem',
                                transition: 'background 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                        >
                            <Code2 size={18} color="#ffa116" />
                            Continue with LeetCode
                        </button>
                    </div>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            color: 'var(--primary)',
                            fontWeight: '500',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        {isLogin ? 'Create one' : 'Sign in'}
                    </button>
                </div>
            </div>
            <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animate-slide-up {
            animation: slideUp 0.3s ease-out forwards;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default Login;
