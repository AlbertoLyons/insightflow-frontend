"use client";
import { useState, useEffect } from 'react';
import { ResponseGetTask } from '@/src/models/task/GetTask';
import { getTaskById, editTask } from '@/src/app/api/Tasks';
import { getUserById } from '@/src/app/api/users';
import { getUsers } from '@/src/app/api/users';
import { TaskState } from '@/src/models/task/CreateTask';

interface Props {
    taskId: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface User {
    id: string;
    fullName: string;
}

export default function TaskDetailsModal({ taskId, isOpen, onClose, onSuccess }: Props) {
    const [task, setTask] = useState<ResponseGetTask | null>(null);
    const [userName, setUserName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [snackbar, setSnackbar] = useState<{message: string, show: boolean}>({message: "", show: false});
    
    // Form data para edición
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        state: "",
        expirationDate: "",
        userId: "",
        comments: ""
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);

    useEffect(() => {
        if (isOpen && taskId) {
            fetchTaskDetails();
            fetchUsers();
        }
    }, [isOpen, taskId]);

    const fetchTaskDetails = async () => {
        setIsLoading(true);
        try {
            const taskData = await getTaskById(taskId);
            setTask(taskData);
            
            // Cargar nombre del usuario
            const user = await getUserById(taskData.userId);
            setUserName(user.fullName || 'Usuario desconocido');

            // Inicializar form data
            const [day, month, year] = taskData.expirationDate.split('/');
            setFormData({
                title: taskData.title,
                description: taskData.completeDescription || "",
                state: taskData.state,
                expirationDate: `${year}-${month}-${day}`,
                userId: taskData.userId,
                comments: taskData.comments || ""
            });

        } catch (error) {
            console.error('Error al cargar tarea:', error);
            showSnackbar('Error al cargar los detalles de la tarea');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const userList = await getUsers();
            setAvailableUsers(userList);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    const showSnackbar = (message: string) => {
        setSnackbar({message, show: true});
        setTimeout(() => {
            setSnackbar({message: "", show: false});
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        let isValid = true;

        if (!formData.userId) {
            newErrors.userId = "Responsable requerido";
            isValid = false;
        }

        if (!formData.title.trim()) {
            newErrors.title = "Título requerido";
            isValid = false;
        }

        if (!formData.state.trim()) {
            newErrors.state = "Estado requerido";
            isValid = false;
        }

        if (!formData.expirationDate) {
            newErrors.expirationDate = "Fecha de vencimiento requerida";
            isValid = false;
        }

        if (!isValid) {
            const firstError = Object.values(newErrors)[0];
            showSnackbar(firstError);
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsSaving(true);
        try {
            const [year, month, day] = formData.expirationDate.split('-');
            const formatDate = `${day}/${month}/${year}`;

            await editTask(taskId, {
                title: formData.title,
                userId: formData.userId,
                completeDescription: formData.description,
                state: formData.state as TaskState,
                expirationDate: formatDate,
                comments: formData.comments
            });

            setShowSuccess(true);

        } catch (error) {
            console.error('Error al guardar:', error);
            showSnackbar('Error al guardar los cambios');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        setIsEditing(false);
        onSuccess();
        onClose();
    };

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

    if (!isOpen) return null;

    if (showSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        ¡Tarea Actualizada con Éxito!
                    </h3>
                    <button
                        onClick={handleSuccessClose}
                        className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                    
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {isEditing ? 'Editar Tarea' : 'Detalles de la Tarea'}
                        </h2>
                        <div className="flex items-center gap-2">
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                    title="Editar tarea"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            )}
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1">
                        {isLoading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Cargando...</p>
                            </div>
                        ) : task && (
                            <div className="space-y-5">
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="title" 
                                            value={formData.title} 
                                            onChange={handleChange}
                                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                                                errors.title ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                    ) : (
                                        <div className="text-xl font-bold text-gray-900 pb-3 border-b-2 border-gray-800">
                                            {task.title}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                    {isEditing ? (
                                        <textarea 
                                            name="description" 
                                            value={formData.description} 
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                                        />
                                    ) : (
                                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                            {task.completeDescription || 'Sin descripción'}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Responsable</label>
                                    {isEditing ? (
                                        <select 
                                            name="userId" 
                                            value={formData.userId} 
                                            onChange={handleChange}
                                            className={`w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                                                errors.userId ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            {availableUsers.map(u => (
                                                <option key={u.id} value={u.id}>{u.fullName}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {userName}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                                        {isEditing ? (
                                            <select 
                                                name="state" 
                                                value={formData.state} 
                                                onChange={handleChange}
                                                className={`w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                                                    errors.state ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="En Progreso">En Progreso</option>
                                                <option value="Completado">Completado</option>
                                            </select>
                                        ) : (
                                            <span className={`inline-block px-3 py-2 text-sm font-semibold rounded-full border ${getStateColor(task.state)}`}>
                                                {task.state}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Vencimiento</label>
                                        {isEditing ? (
                                            <input 
                                                type="date" 
                                                name="expirationDate" 
                                                value={formData.expirationDate} 
                                                onChange={handleChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                                                    errors.expirationDate ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {task.expirationDate}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Comentarios</label>
                                    {isEditing ? (
                                        <textarea 
                                            name="comments" 
                                            value={formData.comments} 
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                                        />
                                    ) : (
                                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                            {task.comments || 'Sin comentarios'}
                                        </p>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>

                    <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                        {isEditing ? (
                            <>
                                <button 
                                    onClick={() => {
                                        setIsEditing(false);
                                        fetchTaskDetails(); 
                                    }}
                                    className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium transition"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition"
                                >
                                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={onClose}
                                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition"
                            >
                                Cerrar
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {snackbar.show && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-60">
                    <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{snackbar.message}</span>
                    </div>
                </div>
            )}
        </>
    );
}