import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Sparkles, Plus, Loader2 } from 'lucide-react';

export const AIInput: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addComplexTask, isLoading } = useTaskStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        
        await addComplexTask(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <div className="card-pro animate-fade" style={{ padding: '8px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Sparkles size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-dim)' }} />
                    <input 
                        type="text" 
                        placeholder="What needs to be done?" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            padding: '16px 16px 16px 48px',
                            fontSize: '1.1rem',
                            fontWeight: '500'
                        }}
                        required
                    />
                </div>
                
                {title && (
                    <div style={{ padding: '0 8px 8px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <textarea 
                            placeholder="Add details (optional)..." 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ 
                                background: 'rgba(255,255,255,0.02)', 
                                border: 'none',
                                padding: '12px',
                                minHeight: '80px',
                                resize: 'none',
                                fontSize: '0.9rem'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                style={{ 
                                    background: 'var(--brand-primary)',
                                    color: 'var(--bg-dark)',
                                    padding: '8px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={16} /> : <><Plus size={16} /> Create Task</>}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
