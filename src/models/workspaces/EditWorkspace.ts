/**
 * Interfaz para la edición de un espacio de trabajo.
 */
export interface editWorkspace {
    // Nombre del espacio de trabajo
    name: string;
    // Imagen del espacio de trabajo (opcional)
    image?: File[];
}
export type EditWorkspaceModel = editWorkspace;