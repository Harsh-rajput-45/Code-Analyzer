import { useState } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import CodeEditor from './components/CodeEditor'
import AnalysisDashboard from './components/AnalysisDashboard'
import ProblemBrowser from './components/ProblemBrowser'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProblemWorkspace from './components/ProblemWorkspace'
import Settings from './components/Settings'
import { analyzeCode } from './services/aiService'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

import MockInterview from './components/MockInterview'
import TimeTracker from './components/TimeTracker';

function AuthenticatedApp() {
  const [view, setView] = useState('hero'); // 'hero', 'editor', 'analysis', 'problems', 'dashboard', 'mock-interview'
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentProblem, setCurrentProblem] = useState(null);
  const { user, loading: authLoading, saveSubmission } = useAuth();

  if (authLoading) return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
  if (!user) return <Login />;

  const handleStart = () => {
    setView('editor');
    setCurrentProblem(null);
  };

  const handleNavigate = (newView) => {
    setView(newView);
  };

  const handleAnalyze = async (code, language) => {
    setLoading(true);
    try {
      const result = await analyzeCode(code);
      setAnalysisResult(result);

      // Save submission to history
      saveSubmission({
        problemTitle: currentProblem ? currentProblem.title : "Custom Solution",
        difficulty: currentProblem ? currentProblem.difficulty : "Medium",
        language: language,
        code: code,
        date: new Date().toISOString(),
        result: result
      });

      setView('analysis');
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setView('editor');
  };

  const handleSelectProblem = (problem) => {
    setCurrentProblem(problem);
    setView('editor');
  };

  const handleMarkComplete = (problemId) => {
    // Update problem status in localStorage
    const savedProblems = JSON.parse(localStorage.getItem('completedProblems') || '[]');
    if (!savedProblems.includes(problemId)) {
      savedProblems.push(problemId);
      localStorage.setItem('completedProblems', JSON.stringify(savedProblems));
    }

    // Update current problem status
    if (currentProblem && currentProblem.id === problemId) {
      setCurrentProblem({ ...currentProblem, status: 'solved' });
    }

    alert('🎉 Problem marked as complete!');
  };

  return (
    <Layout onNavigate={handleNavigate} currentView={view}>
      {view === 'hero' && (
        <Hero onStart={handleStart} onNavigate={handleNavigate} user={user} />
      )}

      {view === 'dashboard' && (
        <Dashboard />
      )}

      {view === 'problems' && (
        <ProblemBrowser onSelect={handleSelectProblem} />
      )}

      {view === 'mock-interview' && (
        <MockInterview onComplete={() => setView('dashboard')} />
      )}

      {view === 'editor' && (
        <div style={{ height: '100%' }}>
          {currentProblem ? (
            <ProblemWorkspace
              problem={currentProblem}
              onSubmit={handleAnalyze}
              loading={loading}
              onMarkComplete={handleMarkComplete}
            />
          ) : (
            <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem', height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Paste Your <span className="gradient-text">Solution</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  We'll analyze your code for patterns, efficiency, and style.
                </p>
              </div>

              {loading ? (
                <div className="glass-panel" style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.5rem'
                }}>
                  <div className="loading-spinner" style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid var(--bg-tertiary)',
                    borderTop: '4px solid var(--primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>Analyzing your code logic...</p>
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              ) : (
                <div className="glass-panel" style={{ flex: 1, overflow: 'hidden', padding: '0' }}>
                  <CodeEditor onSubmit={handleAnalyze} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {
        view === 'analysis' && (
          <div className="container" style={{ marginTop: '2rem' }}>
            <AnalysisDashboard analysis={analysisResult} onReset={handleReset} />
          </div>
        )
      }

      {
        view === 'settings' && (
          <Settings />
        )
      }
    </Layout >
  )
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TimeTracker />
        <AuthenticatedApp />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App
