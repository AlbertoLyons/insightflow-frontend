/**
 * Interfaz para la creación de un espacio de trabajo.
 */
export interface createWorkspace {
    // Nombre del espacio de trabajo
    name: string;
    // Descripción del espacio de trabajo
    description: string;
    // Temática del espacio de trabajo
    topic: string;
    // Imagen del espacio de trabajo
    image: File[];
    // ID del propietario del espacio de trabajo
    ownerId: string;
    // Nombre del propietario del espacio de trabajo
    ownerName: string;
}
export type CreateWorkspace = createWorkspace;

