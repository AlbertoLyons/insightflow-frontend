import { useState, useEffect } from 'react';
import { ResponseGetTaskByDocument } from '@/src/models/task/GetTaskByDocId';
import { getUserById } from '@/src/app/api/users';

interface Props {
    task: ResponseGetTaskByDocument;
}

export default function TaskCard({ task }: Props) {
    const [userName, setUserName] = useState<string>('');
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        const fetchUserName = async () => {
            setIsLoadingUser(true);
            try {
                const user = await getUserById(task.userId);
                setUserName(user.fullName || user.fullName || 'Usuario desconocido');
            } catch (error) {
                console.error('Error al cargar usuario:', error);
                setUserName('Usuario desconocido');
            } finally {
                setIsLoadingUser(false);
            }
        };

        if (task.userId) {
            fetchUserName();
        }
    }, [task.userId]);
    
    
    const getStateColor = (state: string) => {
        switch (state) {
            case 'Pendiente':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'En Progreso':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'Completado':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer">
            
            {/* Título con línea decorativa */}
            <div className="mb-4 pb-3 border-b-2 border-gray-800">
                <h5 className="text-xl font-bold text-gray-900 leading-tight">
                    {task.title}
                </h5>
            </div>

            {/* Información de la tarea */}
            <div className="space-y-3">
                
                {/* Responsable */}
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm text-gray-700">
                        <span className="font-medium">Responsable:</span>{' '}
                        {isLoadingUser ? (
                            <span className="text-gray-400">Cargando...</span>
                        ) : (
                            userName
                        )}
                    </span>
                </div>

                {/* Estado */}
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">Estado:</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStateColor(task.state)}`}>
                        {task.state}
                    </span>
                </div>

                {/* Fecha de vencimiento */}
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-700">
                        <span className="font-medium">Vencimiento:</span> {task.expirationDate}
                    </span>
                </div>

            </div>
        </div>
    );
}