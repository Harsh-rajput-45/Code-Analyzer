import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('codecoach_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Load history whenever user changes
    useEffect(() => {
        if (user) {
            const storedHistory = localStorage.getItem(`codecoach_history_${user.id}`);
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            } else {
                setHistory([]);
            }
        } else {
            setHistory([]);
        }
    }, [user]);

    const login = (username, password) => {
        // Mock login logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username.length > 2) {
                    const newUser = { id: 1, name: username, photoURL: `https://ui-avatars.com/api/?name=${username}&background=random` };
                    setUser(newUser);
                    localStorage.setItem('codecoach_user', JSON.stringify(newUser));
                    resolve(newUser);
                } else {
                    reject(new Error("Invalid credentials"));
                }
            }, 800);
        });
    };

    const signup = (username, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username && email && password) {
                    const newUser = {
                        id: Date.now(),
                        name: username,
                        email: email,
                        photoURL: `https://ui-avatars.com/api/?name=${username}&background=random`
                    };
                    setUser(newUser);
                    localStorage.setItem('codecoach_user', JSON.stringify(newUser));
                    resolve(newUser);
                } else {
                    reject(new Error("All fields are required"));
                }
            }, 1000);
        });
    };

    const googleLogin = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser = {
                    id: 'google_' + Date.now(),
                    name: 'Google User',
                    email: 'user@gmail.com',
                    photoURL: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
                };
                setUser(newUser);
                localStorage.setItem('codecoach_user', JSON.stringify(newUser));
                resolve(newUser);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        setHistory([]);
        localStorage.removeItem('codecoach_user');
    };

    const saveSubmission = (submission) => {
        if (!user) return;
        const newHistory = [submission, ...history];
        setHistory(newHistory);
        localStorage.setItem(`codecoach_history_${user.id}`, JSON.stringify(newHistory));
    };

    const updateUser = (userData) => {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('codecoach_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, googleLogin, logout, loading, history, saveSubmission, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
