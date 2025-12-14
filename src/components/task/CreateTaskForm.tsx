"use client";
import { useState, useEffect} from "react";
import { CreateTask,TaskState } from "@/src/models/task/CreateTask";
import { createTask } from "@/src/app/api/Tasks";
import { getUsers } from "@/src/app/api/users";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSucces: () => void;
    documentId: string;
}

interface User {
    id: string;
    fullName: string;
}

const initial_state = {
    title: "",
    description: "",
    comments: "",
    state: "",
    expirationDate: "",
    userId: ""
}

export default function CreateTaskModal({ isOpen, onClose, onSucces, documentId }: Props) {
    const [formData, setFormData] = useState(initial_state);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [snackbar, setSnackbar] = useState<{message: string, show: boolean}>({message: "", show: false});

    // Usuarios para el dropdown
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const fetchUsers = async () => {
                setIsLoadingUsers(true);
                try {
                    const userList = await getUsers();
                    setAvailableUsers(userList);
                } catch (error) {
                    console.error("Error al cargar usuarios", error);
                    showSnackbar("Error al cargar usuarios");
                } finally {
                    setIsLoadingUsers(false);
                }
            };
            fetchUsers();
        }
    }, [isOpen]);

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
            setErrors(prev => ({ ...prev, [name]: "" }))
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const [year, month, day] = formData.expirationDate.split('-');
            const FormatDate = `${day}/${month}/${year}`;

            const newTask: CreateTask = {
                documentId: documentId,
                userId: formData.userId,
                title: formData.title,
                completeDescription: formData.description,
                state: formData.state as TaskState,
                expirationDate: FormatDate
            };

            await createTask(newTask);

            // Mostrar modal de éxito
            setShowSuccess(true);

        } catch (error) {
            console.error(error);
            showSnackbar("Error al crear la tarea");
        } finally {
            setIsLoading(false);
        }
    }

    const handleSuccessClose = () => {
        setShowSuccess(false);
        setFormData(initial_state);
        setErrors({});
        onSucces();
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    // Modal de éxito
    if (showSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
                    {/* Icono de ticket */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        ¡Tarea Creada con Éxito!
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
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
                    
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Nueva Tarea</h2>
                        <p className="text-gray-500 text-sm">Completa los campos para crear una nueva tarea</p>
                    </div>

                    <div className="space-y-5">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange}
                                placeholder="Ingresa el título de la tarea"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                                    errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange}
                                placeholder="Describe los detalles de la tarea"
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Responsable</label>
                            <select 
                                name="userId" 
                                value={formData.userId} 
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                                    errors.userId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">-- Seleccionar Responsable --</option>
                                {isLoadingUsers 
                                    ? <option disabled>Cargando...</option> 
                                    : availableUsers.map(u => (
                                        <option key={u.id} value={u.id}>{u.fullName}</option>
                                      ))
                                }
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                                <select 
                                    name="state" 
                                    value={formData.state} 
                                    onChange={handleChange}
                                    className={`w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                                        errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">-- Seleccionar --</option>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="En Progreso">En Progreso</option>
                                    <option value="Completado">Completado</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Vencimiento</label>
                                <input 
                                    type="date" 
                                    name="expirationDate" 
                                    value={formData.expirationDate} 
                                    onChange={handleChange}
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                                        errors.expirationDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium transition"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="button"
                                onClick={handleSubmit} 
                                disabled={isLoading} 
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
                            >
                                {isLoading ? "Guardando..." : "Crear Tarea"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {snackbar.show && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-60 animate-slide-up">
                    <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]">
                        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{snackbar.message}</span>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slide-up {
                    from {
                        transform: translate(-50%, 100px);
                        opacity: 0;
                    }
                    to {
                        transform: translate(-50%, 0);
                        opacity: 1;
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </>
    );
}