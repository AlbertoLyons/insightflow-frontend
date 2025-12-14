//Tipos permitidos para el estado de tarea.
export type TaskState = 'Pendiente' | 'En Progreso' | 'Completado';

/**
 * Interfaz para la creacion de una tarea
 */
export interface CreateTask {
    //Id de documento
    documentId: string;
    
    //Id de usuario responsable.
    userId: string;           

    //Titulo de Tarea
    title: string;

    //Descripcion de tarea.
    completeDescription?: string;
    
    //Estado de tarea
    state: TaskState;
    
    //Fecha de finalizacion de tarea
    expirationDate: string;   
}


/**
 * Interfaz de respuesta de una craacion de tarea
 */
export interface ResponseCreateTask {
    //Id de tarea
    id: string;
    
    //Id de documento
    documentId: string;

    //Id de usuario responsable
    userId: string;

    //Titulo de tarea
    title: string;

    //Descipcion de tarea
    completeDescription?: string;

    //Estado de tarea
    state: TaskState;
    
    //Fecha de finalizacion de tarea
    expirationDate: string;
}