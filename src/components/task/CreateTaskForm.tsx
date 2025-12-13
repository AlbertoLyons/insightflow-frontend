"use client";
import { useState, useEffect} from "react";
import { CreateTask,TaskState } from "@/src/models/task/CreateTask";
import { createTask } from "@/src/app/api/Tasks";
import { getUsers } from "@/src/app/api/users";
import { user } from "@/src/models/users";

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

    // Usuarios para el dropdown
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const fetchUsers = async () => {
                setIsLoadingUsers(true);
                try {
                    const userList = await getUsers(); // Tu función existente
                    setAvailableUsers(userList);
                } catch (error) {
                    console.error("Error al cargar usuarios", error);
                } finally {
                    setIsLoadingUsers(false);
                }
            };
            fetchUsers();
        }
    }, [isOpen]);

    // ✅ CORRECCIÓN PRINCIPAL: Manejar eventos de cambio 
    // ANTES: setFormData(prev => ({...prev, [name]: "Value"})); ❌
    // AHORA: setFormData(prev => ({...prev, [name]: value})); ✅
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // ← LÍNEA CORREGIDA
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    };

    // Validación de formulario
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

        setErrors(newErrors);
        return isValid;
    };

    // Enviar datos
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
                documentId: "11111111-1111-1111-1111-111111111111", //harcodeada para pruebas, cambar para que reciba por parametros
                userId: formData.userId,
                title: formData.title,
                completeDescription: formData.description,
                state: formData.state as TaskState,
                expirationDate: FormatDate
            };

            await createTask(newTask);

            // Limpiar formulario
            setFormData(initial_state);
            setErrors({});
            onSucces();
            onClose();

        } catch (error) {
            console.error(error);
            alert("Error al crear la tarea");
        } finally {
            setIsLoading(false);
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Nueva Tarea</h2>
                    <p className="text-gray-500 text-sm">Completa los campos para crear una nueva tarea</p>
                </div>

                <div className="space-y-5">
                    
                    {/* TÍTULO */}
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
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* DESCRIPCIÓN */}
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

                    {/* RESPONSABLE */}
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
                        {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* ESTADO */}
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
                            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                        </div>

                        {/* FECHA */}
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
                            {errors.expirationDate && <p className="text-red-500 text-xs mt-1">{errors.expirationDate}</p>}
                        </div>
                    </div>

                    {/* BOTONES */}
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
    );
}