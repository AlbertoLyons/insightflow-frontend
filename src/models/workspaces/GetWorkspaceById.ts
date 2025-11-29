import { UserModel } from "./UserModel";

/**
 * Interfaz que representa la obtención de un espacio de trabajo por su ID.
 */
export interface getWorkspaceById {
    // Nombre del espacio de trabajo
    name: string;
    // URL de la imagen del espacio de trabajo
    url: string;
    // Usuarios asociados al espacio de trabajo
    users: UserModel[];
    // Fecha de creación del espacio de trabajo
    createdAt: string;
}
export type GetWorkspaceById = getWorkspaceById;
