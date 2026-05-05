import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../types';
import { Priority, Status } from '../types';
import { useTaskStore } from '../store/useTaskStore';
import { Trash2, CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface Props {
    task: Task;
    index: number;
}

export const TaskCard: React.FC<Props> = ({ task, index }) => {
    const { deleteTask, toggleSubtask } = useTaskStore();

    const getStatusColor = () => {
        switch (task.status) {
            case Status.TODO: return '#a1a1aa';
            case Status.IN_PROGRESS: return '#3b82f6';
            case Status.DONE: return '#22c55e';
            default: return '#52525b';
        }
    };

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="card-pro animate-fade"
                    style={{
                        ...provided.draggableProps.style,
                        marginBottom: '0.75rem',
                        padding: '1rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ 
                                fontSize: '0.65rem', 
                                padding: '2px 6px', 
                                borderRadius: '4px', 
                                background: 'rgba(255,255,255,0.05)',
                                color: getStatusColor(),
                                border: `1px solid ${getStatusColor()}20`,
                                textTransform: 'uppercase',
                                fontWeight: '700'
                            }}>
                                {task.status.replace('_', ' ')}
                            </span>
                        </div>
                        <button 
                            onClick={() => deleteTask(task.id)}
                            style={{ 
                                background: 'transparent', 
                                color: 'var(--text-dim)',
                                padding: '4px',
                                borderRadius: '4px' 
                            }}
                            className="hover-bg"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>

                    <h3 style={{ fontSize: '0.95rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                        {task.title}
                    </h3>
                    
                    {task.description && (
                        <p style={{ 
                            color: 'var(--text-muted)', 
                            fontSize: '0.85rem', 
                            lineHeight: '1.5',
                            marginBottom: '1rem'
                        }}>
                            {task.description}
                        </p>
                    )}

                    {task.subtasks.length > 0 && (
                        <div style={{ 
                            marginTop: '0.75rem', 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            {task.subtasks.map(st => (
                                <div 
                                    key={st.id} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        fontSize: '0.8rem',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => toggleSubtask(task.id, st.id, !st.is_completed)}
                                >
                                    {st.is_completed ? 
                                        <CheckCircle size={14} color="#22c55e" /> : 
                                        <Circle size={14} color="var(--text-dim)" />
                                    }
                                    <span style={{ 
                                        color: st.is_completed ? 'var(--text-dim)' : 'var(--text-muted)',
                                        textDecoration: st.is_completed ? 'line-through' : 'none'
                                    }}>
                                        {st.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};
