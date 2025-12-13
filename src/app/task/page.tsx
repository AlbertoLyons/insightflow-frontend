"use client";

import { useState, useEffect } from 'react';
import TaskCard from '@/src/components/task/TaskDocumentCard';
import { ResponseGetTaskByDocument } from '@/src/models/task/GetTaskByDocId'; 
import { getTaskByDocumentId } from '../api/Tasks'; 

export default function TasksPage() {
    // DocumentId hardcodeado por ahora
    const documentId = "11111111-1111-1111-1111-111111111111"; 
    
    const [tasks, setTasks] = useState<ResponseGetTaskByDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 h-32">
                
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Columna: Pendiente */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
                                <TaskCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </div>

                {/* Columna: En Progreso */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
                                <TaskCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </div>

                {/* Columna: Completado */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
                                <TaskCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}