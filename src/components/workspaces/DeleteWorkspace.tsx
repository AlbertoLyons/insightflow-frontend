import { deleteWorkspace } from '../../app/api/workspaces';
import { useRouter } from "next/navigation";
  
type DeleteProps = { workspaceId: string };

export default function DeleteWorkspace({ workspaceId }: DeleteProps) {
    async function deleteWorkspaceById(workspaceId: string) {
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
                onClick={() => {
                deleteWorkspaceById(workspaceId);
                }}
            >
                Eliminar
            </button>
            </div>
        </div>
    </div>
  );
}