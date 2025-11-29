"use client";

import { useState } from 'react';
import EditWorkspace from '@/src/components/workspaces/EditWorkspace';
import DeleteWorkspace from './DeleteWorkspace';
/**
 * Props para el componente Options.
 */
type OptionsProps = { workspaceId: string, name?: string, imageUrl?: string };
/**
 * Opciones para editar o eliminar un espacio de trabajo.
 * Utiliza el lado del cliente para manejar el estado de los modales.
 * @param {OptionsProps} props - Props del componente que contienen el ID, nombre e imagen del espacio de trabajo. 
 * @returns {JSX.Element} Componente de opciones.
 */
export default function Options({ workspaceId, name, imageUrl }: OptionsProps) {
    // Estado para mostrar u ocultar los modales de edición y eliminación 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        // Contenedor de opciones con botones para editar y eliminar
        <div style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem", justifyContent: "center" }}>
            <div>
                <button
                style={{
                    color: "white",
                    backgroundColor: "#f1c40f",
                    padding: "4px 8px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px"
                }}
                // Abrir el modal de edición al hacer clic
                onClick={() => setShowEditModal(true)}
                >
                Editar
                </button>
            </div>
            {/* Mostrar el modal de edición si showEditModal es true */}
            {showEditModal && (
                <div>
                    <EditWorkspace workspaceId={workspaceId} name={name} imageUrl={imageUrl} />
                </div>
            )}
            <div>
                <button
                style={{
                    color: "white",
                    backgroundColor: "#e74c3c", 
                    padding: "4px 8px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px"
                }}
                // Abrir el modal de eliminación al hacer clic
                onClick={() => setShowDeleteModal(true)}
                >
                Eliminar
                </button>
            </div>
            {/* Mostrar el modal de eliminación si showDeleteModal es true */}
            {showDeleteModal && (
                <DeleteWorkspace workspaceId={workspaceId} />
        )}
        </div>
  );
}