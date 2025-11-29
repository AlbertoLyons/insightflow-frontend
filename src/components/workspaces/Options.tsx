"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import EditWorkspace from '@/src/components/workspaces/EditWorkspace';
import DeleteWorkspace from './DeleteWorkspace';

type OptionsProps = { workspaceId: string, name?: string, imageUrl?: string };

export default function Options({ workspaceId, name, imageUrl }: OptionsProps) { 
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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
                onClick={() => setShowEditModal(true)}
                >
                Editar
                </button>
            </div>
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
                onClick={() => setShowDeleteModal(true)}
                >
                Eliminar
                </button>
            </div>
            {showDeleteModal && (
                <DeleteWorkspace workspaceId={workspaceId} />
        )}
        </div>
  );
}