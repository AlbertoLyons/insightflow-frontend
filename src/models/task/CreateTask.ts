export type TaskState = 'Pendiente' | 'En Progreso' | 'Completado';

export interface CreateTask {
    documentId: string;       
    userId: string;           
    title: string;
    completeDescription?: string; 
    state: TaskState;         
    expirationDate: string;   
}


export interface ResponseCreateTask {
    id: string;               
    documentId: string;
    userId: string;
    title: string;
    completeDescription?: string;
    state: TaskState;         
    expirationDate: string;
}