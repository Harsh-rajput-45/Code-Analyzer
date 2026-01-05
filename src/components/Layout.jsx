import React, { useState, useEffect } from 'react';
import { Code2, Home, BookOpen, LayoutDashboard, Settings, LogOut, Sun, Moon, ChevronLeft, ChevronRight, Plus, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ onNavigate, currentView, isCollapsed, toggleCollapse, isMobile, isOpen, onClose }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    const navItems = [
        { id: 'hero', label: 'Home', icon: Home },
        { id: 'editor', label: 'Analyze Code', icon: Code2 },
        { id: 'mock-interview', label: 'Mock Interview', icon: BookOpen },
        { id: 'dashboard', label: 'Track Progress', icon: LayoutDashboard },
        { id: 'problems', label: 'Browse Problems', icon: Code2 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const sidebarStyle = isMobile ? {
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        width: '280px',
        position: 'fixed',
        zIndex: 100,
        height: '100vh',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isOpen ? 'var(--shadow-xl)' : 'none'
    } : {
        width: isCollapsed ? '80px' : '280px',
        height: '100vh',
        position: 'fixed',
        zIndex: 50,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            {isMobile && isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 90
                    }}
                />
            )}

            <aside
                className="glass-panel"
                style={{
                    ...sidebarStyle,
                    display: 'flex',
                    flexDirection: 'column',
                    top: 0,
                    left: 0,
                    borderRight: '1px solid var(--glass-border)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 0
                }}
            >
                {/* Logo Area */}
                <div style={{
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '80px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={isMobile ? onClose : toggleCollapse}
                            className="hover-scale"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                padding: '0.5rem'
                            }}
                        >
                            <Code2 size={24} color="var(--primary)" />
                        </button>
                        {(!isCollapsed || isMobile) && (
                            <span style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                opacity: 1,
                                transition: 'opacity 0.2s'
                            }}>
                                Code Analyser
                            </span>
                        )}
                    </div>
                    {isMobile && (
                        <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
                            <X size={24} />
                        </button>
                    )}
                </div>

                {/* Home Button */}
                <div style={{ padding: '0 1rem 1rem' }}>
                    <button
                        onClick={() => { onNavigate('hero'); if (isMobile) onClose(); }}
                        className="hover-lift"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            width: '100%',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            justifyContent: (isCollapsed && !isMobile) ? 'center' : 'flex-start'
                        }}
                    >
                        <Home size={20} />
                        {(!isCollapsed || isMobile) && <span>Home</span>}
                    </button>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
                    {(!isCollapsed || isMobile) && <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', padding: '0.5rem 1rem' }}>Menu</div>}

                    {navItems.slice(1).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { onNavigate(item.id); if (isMobile) onClose(); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                color: currentView === item.id ? 'var(--primary)' : 'var(--text-secondary)',
                                background: currentView === item.id ? 'var(--primary-glow)' : 'transparent',
                                transition: 'all 0.2s',
                                width: '100%',
                                justifyContent: (isCollapsed && !isMobile) ? 'center' : 'flex-start',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                            title={(!isCollapsed || isMobile) ? '' : item.label}
                        >
                            <item.icon size={20} />
                            {(!isCollapsed || isMobile) && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {user && (
                        <div
                            className="hover-lift"
                            onClick={() => { onNavigate('settings'); if (isMobile) onClose(); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                justifyContent: (isCollapsed && !isMobile) ? 'center' : 'flex-start',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                flexShrink: 0,
                                overflow: 'hidden'
                            }}>
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    (user.displayName?.[0] || user.name?.[0] || user.email?.[0] || 'U').toUpperCase()
                                )}
                            </div>
                            {(!isCollapsed || isMobile) && (
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {user.displayName || user.name || user.email}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free Plan</div>
                                </div>
                            )}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: (isCollapsed && !isMobile) ? 'center' : 'space-between', padding: '0 0.5rem' }}>
                        <button
                            onClick={toggleTheme}
                            className="hover-scale"
                            style={{
                                padding: '0.5rem',
                                borderRadius: '50%',
                                color: 'var(--text-secondary)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {(!isCollapsed || isMobile) && (
                            <button
                                onClick={logout}
                                className="hover-scale"
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '50%',
                                    color: 'var(--danger)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};
const Layout = ({ children, onNavigate, currentView }) => {
    const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed (Rail Mode)
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(false);
                setIsCollapsed(true); // Ensure collapsed on desktop start
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseEnter = () => {
        if (!isMobile) setIsCollapsed(false);
    };

    const handleMouseLeave = () => {
        if (!isMobile) setIsCollapsed(true);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    position: isMobile ? 'fixed' : 'fixed', // Always fixed for overlay effect on desktop
                    top: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: 50,
                    width: isMobile ? '280px' : (isCollapsed ? '80px' : '280px'),
                    transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden' // Hide overflow content when collapsed
                }}
            >
                <Sidebar
                    onNavigate={onNavigate}
                    currentView={currentView}
                    isCollapsed={isCollapsed}
                    toggleCollapse={() => { }} // Disable manual toggle in rail mode
                    isMobile={isMobile}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </div>

            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 40
                    }}
                />
            )}

            <main style={{
                flex: 1,
                marginLeft: isMobile ? 0 : (isCollapsed ? '80px' : '280px'), // Dynamic margin to prevent overlap
                transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {isMobile && (
                    <div style={{
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid var(--glass-border)',
                        background: 'var(--bg-secondary)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 40
                    }}>
                        <button onClick={() => setIsSidebarOpen(true)} style={{ color: 'var(--text-primary)' }}>
                            <Menu size={24} />
                        </button>
                        <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Gemini Coach</span>
                        <div style={{ width: '24px' }} /> {/* Spacer for centering */}
                    </div>
                )}
                {children}
            </main>
        </div>
    );
};

export default Layout;
