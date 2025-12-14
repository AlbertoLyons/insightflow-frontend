import { TaskState } from './CreateTask';

/**
 * Interfaz de respuesta para la obtencion de una tarea
 */
export interface ResponseGetTask{

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

    //Indica si una tarea esta activa
    isActive: boolean;     
}