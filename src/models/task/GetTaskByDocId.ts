import { TaskState } from './CreateTask';

/**
 * Interfaz de respuesta para las tareas de un documento
 */
export interface ResponseGetTaskByDocument{

    //Id de tarea
    id: string;  
    
    //Id de usuario responsable
    userId: string;         

    //Titulo de tarea
    title: string;

    //Estado de tarea
    state: TaskState;
    
    //Fecha de finalizacion de tarea
    expirationDate: string; 

    //Indica si una tarea esta activa
    isActive: boolean;
}