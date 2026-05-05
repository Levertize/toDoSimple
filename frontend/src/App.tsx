import React, { useEffect } from 'react';
import { KanbanBoard } from './components/KanbanBoard';
import { AIInput } from './components/AIInput';
import { useTaskStore } from './store/useTaskStore';
import './styles/global.css';
import { LayoutDashboard } from 'lucide-react';

function App() {
  const { fetchTasks, isLoading, error } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="app-container">
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>toDoComplex</h1>
        <p className="sub-heading">Experience the future of productivity with Gemini AI</p>
      </header>

      <main>
        <div style={{ maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <AIInput />
        </div>

        {error && (
          <div className="glass-panel" style={{ 
            border: '1px solid rgba(255, 69, 58, 0.3)', 
            color: '#ff453a', 
            marginBottom: '2rem', 
            textAlign: 'center',
            padding: '1rem' 
          }}>
            {error}
          </div>
        )}

        <KanbanBoard />
      </main>

      <footer style={{ marginTop: '6rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
        <p>Built with ❤️ and Glassmorphism by Gemini</p>
      </footer>
    </div>
  );
}

export default App;
