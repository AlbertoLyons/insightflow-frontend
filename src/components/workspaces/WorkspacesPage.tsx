"use client";

import { useState } from 'react';
import { GetWorkspaceByUser } from '@/src/models/workspaces/GetWorkspaceByUser';
import { getWorkspaceById } from '@/src/app/api/workspaces';
import Board from '@/src/components/workspaces/Board';
import WorkspaceById from './WorkspaceById';

/**
 * Props para el componente WorkspacesPage.
 */
type WorkspacesPageProps = { workspaces: GetWorkspaceByUser[] };
/**
 * Componente de la página de espacios de trabajo.
 * @param {WorkspacesPageProps} props - Props del componente que contienen la lista de espacios de trabajo. 
 * @returns {JSX.Element} Componente de la página de espacios de trabajo.
 */
export default function WorkspacesPage({ workspaces }: WorkspacesPageProps) {
    // Estado para manejar la visibilidad de los modales de búsqueda y resultados
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showSearchedModal, setShowSearchedModal] = useState(false);
    /**
     * TODO: Temporalmente se usa un userId hardcodeado
    */
    const userId = "b3850a65-61d9-4417-8b03-de3a700d7064";
    const [userRoleInWorkspace, setUserRoleInWorkspace] = useState("");
    const [workspaceFound, setWorkspaceFound] = useState<any>(null);
    /**
     * TODO: Se tiene que reemplazar por obtener el userId del usuario logueado
     */
    // Estado para manejar el campo de entrada del ID del espacio de trabajo
    const [idField, setIdField] = useState('');
    /**
     * Función para manejar la búsqueda de un espacio de trabajo por ID.
     * @param id 
     * @returns {Promise<void>}
     */
    async function handleSearchWorkspace(id: string) {
        // Validar que el campo no esté vacío
        if (id.trim() === '') {
            alert('Por favor, ingrese un ID de espacio de trabajo válido.');
            return;
        }
        // Intentar obtener el espacio de trabajo por ID
        try {
            const workspace = await getWorkspaceById(id);
            // Manejar el caso donde no se encuentra el espacio de trabajo
            if (!workspace) {
                alert('Espacio de trabajo no encontrado.');
                return;
            }
            // Formatear la información del espacio de trabajo
            let role = workspace.users.find((u: any) => u.id === userId)?.role;
            if (role === "Owner") {
                role = "Propietario";
            }
            // Formatear la fecha de creación al formato "dd/mm/yyyy, hh:mm"
            const formattedDate = new Date(workspace.createdAt).toLocaleString("es-CL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            // Actualizar el estado con la información formateada
            workspace.createdAt = formattedDate;
            setUserRoleInWorkspace(role ?? "");
            // Filtrar el usuario actual del listado de usuarios para no mostrarlo
            workspace.users = workspace.users.filter((u: any) => u.id !== userId);
            // Establece el espacio de trabajo encontrado en el estado
            setWorkspaceFound(workspace);
            
        } catch (error) {
            alert('Error al buscar el espacio de trabajo. Por favor, verifique el ID e intente nuevamente.');
            return;
        }
        // Mostrar el modal de resultados de búsqueda
        setShowSearchedModal(true);
    }

    return (
        // Contenedor principal de la página de espacios de trabajo
        <div style= {{
            backgroundColor: '#f2f6ffff',
            padding: '10px',
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '500'
        }}>
        <button style={{
            padding: '10px 20px',
            backgroundColor: '#001b5aff',
            color: '#ffffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '600',
        }}
        // Abrir el modal de búsqueda al hacer clic
        onClick={() => setShowSearchModal(true)}
        >
        Buscar espacio de trabajo
        </button>
        {/* Modal de búsqueda de espacio de trabajo */}
        {showSearchModal && (
            <div style={{
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
                }}>
                <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "80vw",        
                    maxWidth: "900px",   
                    maxHeight: "80vh",
                    overflowY: "auto",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                    }}
                    >
                    <div style= {{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h3 style={{ color: "#001b5aff", fontWeight: 'bold' }}>Buscar espacio de trabajo</h3>
                        <button 
                        // Cerrar el modal de búsqueda al hacer clic
                        onClick={() => setShowSearchModal(false)}
                        style={{
                        color: "white",
                        backgroundColor: "#e74c3c",
                        padding: "8px 12px",
                        borderRadius: "8%",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        }}
                        >
                            ✕
                        </button>
                    </div>
                    <div>
                        <div className="idField" style={{
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'center',
                        }}>
                        <label style= {{ color: "#000000ff", fontStyle: 'bold', marginTop: '20px' }}>
                            Ingrese el ID del espacio de trabajo a buscar
                        </label>
                        <input style= {{ width: '345px', marginLeft: '10px', color: '#001b5aff', padding: '5px', borderRadius: '5px', border: '1px solid #001b5aff' }} 
                            value={idField}
                            // Actualizar el estado del campo ID al cambiar
                            onChange={(e) => setIdField(e.target.value)}
                        />
                        <button style={{
                            padding: '10px 20px',
                            marginTop: '15px',
                            backgroundColor: '#001b5aff',
                            color: '#ffffffff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: '600',
                        }}
                        // Manejar la búsqueda al hacer clic
                        onClick={() => handleSearchWorkspace(idField)}
                        >
                        Buscar
                        </button>
                    </div>
                    {/* Modal de resultados de búsqueda */}
                    {showSearchedModal && (
                        <div style={{ marginTop: '15px' }}>
                            <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Resultados de la búsqueda:</h1>
                            <WorkspaceById workspace={ workspaceFound } userRole={ userRoleInWorkspace } />
                        </div>
                    )}
                </div>
            </div>
        </div>
        )}
        {/* Contenedor principal de la página de espacios de trabajo */}
        <Board workspaces={workspaces ?? []} />
        </div>
    );
}