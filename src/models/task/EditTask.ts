import { TaskState } from './CreateTask'; 

/**
 * Interfaz de edición de una tarea, todos los campos pueden ser nulos, esto significara que no se realizo ningun cambio.
 */
export interface EditTask {

    //Id de usuario responsable
    userId?: string;        
    
    //Titulo de tarea
    title?: string;  
    
    //Descripcion de tarea
    completeDescription?: string;
    
    //estado de tarea
    state?: TaskState;
    
    //Fecha de finalizacion de tarea
    expirationDate?: string;      

    //Comentarios de la tarea
    comments?: string;            
}


/**
 * Interfaz de respuesta de la edicion de tarea.
 */
export interface ResponseEditTask {
    // Id de tarea
    id: string;   
    
    //Id de usuario responsable
    userId: string;            
    
    //Titulo de tarea
    title: string;

    //Descripcion de tarea
    completeDescription?: string;
    
    //Estado de tarea
    state: TaskState;

    //Fecha de finalizacion de tarea
    expirationDate: string;

    //Comentarios de la tarea
    comments?: string;
}