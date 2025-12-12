import { TaskState } from './CreateTask'; 

export interface EditTask {
    userId?: string;              
    title?: string;               
    completeDescription?: string; 
    state?: TaskState;            
    expirationDate?: string;      
    comments?: string;            
}


export interface ResponseEditTask {
    id: string;                   
    userId: string;               
    title: string;
    completeDescription?: string; 
    state: TaskState;
    expirationDate: string;
    comments?: string;
}