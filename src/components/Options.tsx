"use client";

import React, { useState } from 'react';
import { deleteWorkspace } from '../app/api/workspaces';
import { useRouter } from "next/navigation";

type OptionsProps = { workspaceId: string };

export default function Options({ workspaceId }: OptionsProps) { 
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    async function deleteWorkspaceById(workspaceId: string) {
        try {
        await deleteWorkspace(workspaceId);
        console.log(`Workspace with ID ${workspaceId} deleted successfully.`);
        router.refresh();
        } catch (error) {
        console.error('Error deleting workspace:', error);
        }
    }

    return (
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
                onClick={() => console.log("Editar:", workspaceId)}
                >
                Editar
                </button>
            </div>
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
                onClick={() => setShowModal(true)}
                >
                Eliminar
                </button>
            </div>
            {showModal && (
            <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "#333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            }}
            >
            <div
                style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "300px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
                }}
            >
                <h3 style={{ color: "red" }}>¿Eliminar espacio de trabajo?</h3>
                <p>Esta acción no se puede deshacer.</p>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                    style={{
                    padding: "6px 12px",
                    backgroundColor: "#7f8c8d",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                    }}
                    onClick={() => setShowModal(false)}
                >
                    Cancelar
                </button>

                <button
                    style={{
                    padding: "6px 12px",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                    }}
                    onClick={() => {
                    deleteWorkspaceById(workspaceId);
                    setShowModal(false);
                    }}
                >
                    Eliminar
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
  );
}