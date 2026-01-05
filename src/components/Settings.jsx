import React, { useState } from 'react';
import { User, Bell, Save, Shield, Mail, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ImageCropper from './ImageCropper';

const Settings = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState(user?.displayName || user?.name || user?.email?.split('@')[0] || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [showCropper, setShowCropper] = useState(false);
    const [tempImage, setTempImage] = useState(null);

    // Mock States
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        updates: true
    });

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            updateUser({ displayName, photoURL });
            setLoading(false);
            alert('Settings saved successfully!');
        }, 1000);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempImage(reader.result);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
        // Reset input value so same file can be selected again
        e.target.value = '';
    };

    const handleCropComplete = (croppedImage) => {
        setPhotoURL(croppedImage);
        setShowCropper(false);
        setTempImage(null);
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setTempImage(null);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="container" style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>Settings</h1>

            <div style={{ display: 'flex', gap: '2rem', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
                {/* Sidebar */}
                <div className="glass-panel" style={{ width: window.innerWidth < 768 ? '100%' : '250px', padding: '1rem', height: 'fit-content' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                width: '100%',
                                padding: '0.75rem 1rem',
                                border: 'none',
                                background: activeTab === tab.id ? 'var(--primary-glow)' : 'transparent',
                                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontWeight: '500',
                                marginBottom: '0.5rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="glass-panel" style={{ flex: 1, padding: '2rem' }}>
                    {activeTab === 'profile' && (
                        <div className="animate-slide-up">
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <User size={24} color="var(--primary)" /> Profile Information
                            </h2>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'var(--gradient-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    overflow: 'hidden'
                                }}>
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        (user?.displayName?.[0] || user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{user?.displayName || user?.name || user?.email?.split('@')[0] || 'User'}</div>
                                    <div style={{ color: 'var(--text-secondary)' }}>Free Plan Member</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Email Address</label>
                                    <div style={{
                                        padding: '0.75rem 1rem',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                        <Mail size={18} />
                                        {user?.email}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Display Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user?.displayName || user?.name || user?.email?.split('@')[0]}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'transparent',
                                            border: '1px solid var(--glass-border-strong)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Profile Picture</label>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <label
                                            className="hover-lift"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.75rem 1rem',
                                                background: 'var(--bg-tertiary)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: 'var(--radius-md)',
                                                cursor: 'pointer',
                                                color: 'var(--text-primary)',
                                                fontWeight: '500'
                                            }}
                                        >
                                            <Upload size={18} />
                                            Upload Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="animate-slide-up">
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Shield size={24} color="var(--primary)" /> Security
                            </h2>

                            <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '500px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'transparent',
                                            border: '1px solid var(--glass-border-strong)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'transparent',
                                            border: '1px solid var(--glass-border-strong)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'transparent',
                                            border: '1px solid var(--glass-border-strong)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="animate-slide-up">
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Bell size={24} color="var(--primary)" /> Notifications
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {Object.entries(notifications).map(([key, value]) => (
                                    <div key={key} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '1rem',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: 'var(--radius-md)'
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>{key} Notifications</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Receive updates via {key}</div>
                                        </div>
                                        <button
                                            onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                                            style={{
                                                width: '48px',
                                                height: '24px',
                                                background: value ? 'var(--primary)' : 'var(--bg-elevated)',
                                                borderRadius: '12px',
                                                position: 'relative',
                                                transition: 'background 0.2s'
                                            }}
                                        >
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                background: 'white',
                                                borderRadius: '50%',
                                                position: 'absolute',
                                                top: '2px',
                                                left: value ? '26px' : '2px',
                                                transition: 'left 0.2s'
                                            }} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="btn-ripple hover-lift"
                            style={{
                                background: 'var(--gradient-primary)',
                                color: 'white',
                                padding: '0.75rem 2rem',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '600',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                        </button>
                    </div>
                    {showCropper && (
                        <ImageCropper
                            imageSrc={tempImage}
                            onCropComplete={handleCropComplete}
                            onCancel={handleCropCancel}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
