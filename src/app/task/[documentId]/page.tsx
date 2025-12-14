"use client";

import { useState, useEffect } from 'react';
import TaskCard from '@/src/components/task/TaskDocumentCard';
import CreateTaskModal from '@/src/components/task/CreateTaskForm';
import { ResponseGetTaskByDocument } from '@/src/models/task/GetTaskByDocId'; 
import { getTaskByDocumentId, editTask, toggleTrashCan } from '../../api/Tasks'; 
import { TaskState } from '@/src/models/task/CreateTask';

export default function TasksPage() {
    const documentId = "11111111-1111-1111-1111-111111111111"; 
    
    const [tasks, setTasks] = useState<ResponseGetTaskByDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [draggedTask, setDraggedTask] = useState<ResponseGetTaskByDocument | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrashOpen, setIsTrashOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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

    useEffect(() => {
        fetchTasks();
    }, [documentId]);

    // Filtrar tareas activas e inactivas
    const activeTasks = tasks.filter(task => task.isActive);
    const deletedTasks = tasks.filter(task => !task.isActive);
    
    const pendingTasks = activeTasks.filter(task => task.state === 'Pendiente');
    const inProgressTasks = activeTasks.filter(task => task.state === 'En Progreso');
    const completedTasks = activeTasks.filter(task => task.state === 'Completado');

    // Handlers para Drag and Drop
    const handleDragStart = (task: ResponseGetTaskByDocument) => {
        // No permitir drag si hay modal abierto
        if (isModalOpen || isTrashOpen) {
            return;
        }
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

    // Drop en trash can
    const handleDropInTrash = async (e: React.DragEvent) => {
        e.preventDefault();
        
        if (!draggedTask) return;

        try {
            // Actualizar optimistamente
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === draggedTask.id 
                        ? { ...task, isActive: false }
                        : task
                )
            );

            await toggleTrashCan(draggedTask.id);

        } catch (error) {
            console.error('Error al eliminar tarea:', error);
            
            // Revertir
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === draggedTask.id 
                        ? { ...task, isActive: true }
                        : task
                )
            );
            
            alert('Error al eliminar la tarea');
        } finally {
            setDraggedTask(null);
        }
    };

    const handleDragEnd = () => {
        setDraggedTask(null);
    };

    // Restaurar tarea
    const handleRestoreTask = async (taskId: string) => {
        try {
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === taskId 
                        ? { ...task, isActive: true }
                        : task
                )
            );

            await toggleTrashCan(taskId);
            setOpenMenuId(null);

        } catch (error) {
            console.error('Error al restaurar tarea:', error);
            
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === taskId 
                        ? { ...task, isActive: false }
                        : task
                )
            );
            
            alert('Error al restaurar la tarea');
        }
    };

    // Handlers para el modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSuccessModal = () => fetchTasks();

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            
            {/* Rectángulo superior con botones */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 h-32 flex items-center justify-between">
                <div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsTrashOpen(!isTrashOpen)}
                        onDragOver={handleDragOver}
                        onDrop={handleDropInTrash}
                        className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm relative"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {deletedTasks.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-red-600">
                                {deletedTasks.length}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={handleOpenModal}
                        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nueva Tarea
                    </button>
                </div>
            </div>

            {isTrashOpen && (
                <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">Papelera</h3>
                        <button onClick={() => setIsTrashOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 overflow-y-auto h-[calc(100vh-100px)]">
                        {deletedTasks.length === 0 ? (
                            <p className="text-center text-gray-400 py-8">No hay tareas eliminadas</p>
                        ) : (
                            <div className="space-y-3">
                                {deletedTasks.map(task => (
                                    <div key={task.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition relative">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800 mb-1">{task.title}</h4>
                                                <p className="text-xs text-gray-500">Vencimiento: {task.expirationDate}</p>
                                            </div>
                                            
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}
                                                    className="p-1 hover:bg-gray-200 rounded-full transition"
                                                >
                                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="5" r="2"/>
                                                        <circle cx="12" cy="12" r="2"/>
                                                        <circle cx="12" cy="19" r="2"/>
                                                    </svg>
                                                </button>

                                                {openMenuId === task.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                                        <button
                                                            onClick={() => handleRestoreTask(task.id)}
                                                            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                            Restaurar
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isTrashOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setIsTrashOpen(false)}
                />
            )}


            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSucces={handleSuccessModal}
                documentId={documentId}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
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
                                    draggable={!isModalOpen && !isTrashOpen}
                                    onDragStart={() => handleDragStart(task)}
                                    onDragEnd={handleDragEnd}
                                    className="cursor-move"
                                >
                                    <TaskCard task={task} onTaskUpdated={fetchTasks} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

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
                                    draggable={!isModalOpen && !isTrashOpen}
                                    onDragStart={() => handleDragStart(task)}
                                    onDragEnd={handleDragEnd}
                                    className="cursor-move"
                                >
                                    <TaskCard task={task} onTaskUpdated={fetchTasks} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

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
                                    draggable={!isModalOpen && !isTrashOpen}
                                    onDragStart={() => handleDragStart(task)}
                                    onDragEnd={handleDragEnd}
                                    className="cursor-move"
                                >
                                    <TaskCard task={task} onTaskUpdated={fetchTasks} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}