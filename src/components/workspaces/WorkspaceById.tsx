import { GetWorkspaceById } from "@/src/models/workspaces/GetWorkspaceById";

type WorkspaceByIdProps = {  workspace: GetWorkspaceById, userRole: string };
export default function WorkspaceById({ workspace, userRole }: WorkspaceByIdProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h2 style={{ fontWeight: 'bold' }}>{workspace.name}</h2>
            <p style={{ fontWeight: 'bold' }}>Tu rol: {userRole}</p>
            <h3 style={{ fontWeight: 'bold' }}>Fecha de creación: {workspace.createdAt}</h3>
            <h3 style={{ fontWeight: 'bold' }}>Usuarios trabajando en este espacio:</h3>
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