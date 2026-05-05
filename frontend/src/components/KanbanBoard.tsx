import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { Status } from '../types';
import { useTaskStore } from '../store/useTaskStore';
import { TaskCard } from './TaskCard';

const COLUMNS = [
    { id: Status.TODO, title: 'To Do' },
    { id: Status.IN_PROGRESS, title: 'In Progress' },
    { id: Status.DONE, title: 'Done' },
];

export const KanbanBoard: React.FC = () => {
    const { tasks, updateTaskStatus } = useTaskStore();

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        updateTaskStatus(parseInt(draggableId), destination.droppableId as Status);
    };

    const getColumnDotColor = (status: Status) => {
        switch (status) {
            case Status.TODO: return '#a1a1aa';
            case Status.IN_PROGRESS: return '#3b82f6';
            case Status.DONE: return '#22c55e';
            default: return '#52525b';
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2rem' }}>
                {COLUMNS.map(column => (
                    <div key={column.id} className="kanban-column">
                        <div className="kanban-column-header">
                            <div className="column-dot" style={{ backgroundColor: getColumnDotColor(column.id) }}></div>
                            <h2 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {column.title}
                            </h2>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginLeft: 'auto', fontWeight: '500' }}>
                                {tasks.filter(t => t.status === column.id).length}
                            </span>
                        </div>
                        
                        <Droppable droppableId={column.id}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{ minHeight: '500px' }}
                                >
                                    {tasks
                                        .filter(t => t.status === column.id)
                                        .map((task, index) => (
                                            <TaskCard key={task.id} task={task} index={index} />
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};
