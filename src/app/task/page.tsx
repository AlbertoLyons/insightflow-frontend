"use client";

import { useState, useEffect } from 'react';
import TaskCard from '@/src/components/task/TaskDocumentCard';
import { ResponseGetTaskByDocument } from '@/src/models/task/GetTaskByDocId'; 
import { getTaskByDocumentId, editTask } from '../api/Tasks'; 
import { TaskState } from '@/src/models/task/CreateTask';

export default function TasksPage() {
    const documentId = "11111111-1111-1111-1111-111111111111"; 
    
    const [tasks, setTasks] = useState<ResponseGetTaskByDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [draggedTask, setDraggedTask] = useState<ResponseGetTaskByDocument | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const data = await getTaskByDocumentId(documentId);
                setTasks(data);
            } catch (error) {
                console.error('Error al cargar tareas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [documentId]);

    // Filtrar tareas por estado
    const pendingTasks = tasks.filter(task => task.state === 'Pendiente');
    const inProgressTasks = tasks.filter(task => task.state === 'En Progreso');
    const completedTasks = tasks.filter(task => task.state === 'Completado');

    // Handlers para Drag and Drop
    const handleDragStart = (task: ResponseGetTaskByDocument) => {
        setDraggedTask(task);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent, newState: TaskState) => {
        e.preventDefault();
        
        if (!draggedTask || draggedTask.state === newState) {
            setDraggedTask(null);
            return;
        }

        try {
            
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === draggedTask.id 
                        ? { ...task, state: newState }
                        : task
                )
            );

            
            await editTask(draggedTask.id, {
                state: newState,
                userId: undefined,
                title: undefined,
                completeDescription: undefined,
                expirationDate: undefined,
                comments: undefined
            });

        } catch (error) {
            console.error('Error al actualizar tarea:', error);
            
            
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === draggedTask.id 
                        ? { ...task, state: draggedTask.state }
                        : task
                )
            );
            
            alert('Error al mover la tarea');
        } finally {
            setDraggedTask(null);
        }
    };

    const handleDragEnd = () => {
        setDraggedTask(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 h-32">
                {/* Información del documento */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Columna: Pendiente */}
                <div 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'Pendiente')}
                >
                    <div className="mb-4 pb-3 border-b-2 border-yellow-500">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                            Pendiente
                            <span className="ml-auto text-sm font-normal text-gray-500">
                                ({pendingTasks.length})
                            </span>
                        </h2>
                    </div>
                    
                    <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
                        {isLoading ? (
                            <p className="text-center text-gray-500 py-4">Cargando...</p>
                        ) : pendingTasks.length === 0 ? (
                            <p className="text-center text-gray-400 py-8">No hay tareas pendientes</p>
                        ) : (
                            pendingTasks.map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={() => handleDragStart(task)}
                                    onDragEnd={handleDragEnd}
                                    className="cursor-move"
                                >
                                    <TaskCard task={task} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Columna: En Progreso */}
                <div 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'En Progreso')}
                >
                    <div className="mb-4 pb-3 border-b-2 border-blue-500">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            En Progreso
                            <span className="ml-auto text-sm font-normal text-gray-500">
                                ({inProgressTasks.length})
                            </span>
                        </h2>
                    </div>
                    
                    <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
                        {isLoading ? (
                            <p className="text-center text-gray-500 py-4">Cargando...</p>
                        ) : inProgressTasks.length === 0 ? (
                            <p className="text-center text-gray-400 py-8">No hay tareas en progreso</p>
                        ) : (
                            inProgressTasks.map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={() => handleDragStart(task)}
                                    onDragEnd={handleDragEnd}
                                    className="cursor-move"
                                >
                                    <TaskCard task={task} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Columna: Completado */}
                <div 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'Completado')}
                >
                    <div className="mb-4 pb-3 border-b-2 border-green-500">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            Completado
                            <span className="ml-auto text-sm font-normal text-gray-500">
                                ({completedTasks.length})
                            </span>
                        </h2>
                    </div>
                    
                    <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
                        {isLoading ? (
                            <p className="text-center text-gray-500 py-4">Cargando...</p>
                        ) : completedTasks.length === 0 ? (
                            <p className="text-center text-gray-400 py-8">No hay tareas completadas</p>
                        ) : (
                            completedTasks.map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={() => handleDragStart(task)}
                                    onDragEnd={handleDragEnd}
                                    className="cursor-move"
                                >
                                    <TaskCard task={task} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}