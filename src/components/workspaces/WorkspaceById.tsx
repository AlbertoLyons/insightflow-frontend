import { GetWorkspaceById } from "@/src/models/workspaces/GetWorkspaceById";
/**
 * Props para el componente WorkspaceById.
 */
type WorkspaceByIdProps = {  workspace: GetWorkspaceById, userRole: string };
/**
 * Componente que muestra los detalles de un espacio de trabajo específico.
 * @param {WorkspaceByIdProps} props - Props del componente que contienen el espacio de trabajo y el rol del usuario. 
 * @returns {JSX.Element} Componente de detalles del espacio de trabajo.
 */
export default function WorkspaceById({ workspace, userRole }: WorkspaceByIdProps) {
    return (
        // Contenedor principal con detalles del espacio de trabajo
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h2 style={{ fontWeight: 'bold' }}>{workspace.name}</h2>
            <p style={{ fontWeight: 'bold' }}>Tu rol: {userRole}</p>
            <h3 style={{ fontWeight: 'bold' }}>Fecha de creación: {workspace.createdAt}</h3>
            <h3 style={{ fontWeight: 'bold' }}>Usuarios trabajando en este espacio:</h3>
            {/* Listado de usuarios asociados al espacio de trabajo */}
            <div>
                {workspace.users.map((user) => (
                    <div key={user.id} style={{ marginBottom: '5px' }}>
                        <span style={{ fontWeight: 'bold' }}>{user.name}</span> - <span>{user.role}</span> - ID: <span>{user.id}</span>
                    </div>
                ))}
            </div>
            <h3 style={{ fontWeight: "bold" }}>Ícono asociado:</h3>
            <img style={{ width: "150px", height: "auto" }} src={workspace.url} alt={workspace.name} />
        </div>
    );
}