import { deleteWorkspace } from '../../app/api/workspaces';
/**
 * Props para el componente DeleteWorkspace que representa la confirmación de eliminación de un espacio de trabajo.
 */  
type DeleteProps = { workspaceId: string };

/**
 * Componente que representa la confirmación de eliminación de un espacio de trabajo.
 * @param {DeleteProps} props - Props que contienen el ID del espacio de trabajo a eliminar.
 * @returns {JSX.Element} Elemento JSX que representa la confirmación de eliminación.
 */
export default function DeleteWorkspace({ workspaceId }: DeleteProps) {
    /**
     * Función para eliminar un espacio de trabajo por su ID.
     * @param workspaceId ID del espacio de trabajo a eliminar
     */
    async function deleteWorkspaceById(workspaceId: string) {
        // Llama a la función de eliminación del espacio de trabajo
        try {
            await deleteWorkspace(workspaceId);
            console.log(`Workspace with ID ${workspaceId} deleted successfully.`);
            alert('Espacio de trabajo eliminado con éxito. Refrescando la página.');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting workspace:', error);
        }
    }
  return (
    // Contenido del modal de confirmación
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
        }}
        >
        <div style={{
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
            <button style={{
                padding: "6px 12px",
                backgroundColor: "#7f8c8d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
                }}
                // Cierra el modal sin eliminar
                onClick={() => window.location.reload()}
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
                // Llama a la función para eliminar el espacio de trabajo
                onClick={() => {deleteWorkspaceById(workspaceId);}}
            >
                Eliminar
            </button>
            </div>
        </div>
    </div>
  );
}