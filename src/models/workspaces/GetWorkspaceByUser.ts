/**
 * Interfaz que representa un espacio de trabajo asociado a un usuario.
 */
export interface GetWorkspaceByUser {
    // ID del espacio de trabajo
    id: string;
    // Nombre del espacio de trabajo
    name: string;
    // URL de la imagen del espacio de trabajo
    imageUrl: string;
    // Rol del usuario en el espacio de trabajo
    userRole: string;
}
export type WorkspacesByUser = GetWorkspaceByUser[];

