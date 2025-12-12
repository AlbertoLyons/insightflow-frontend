import { TaskState } from './CreateTask';

export interface ResponseGetTask{
    userId: string;              
    title: string;
    completeDescription?: string; 
    state: TaskState;            
    expirationDate: string;      
    comments?: string;           
}