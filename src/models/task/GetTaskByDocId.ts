import { TaskState } from './CreateTask';

export interface ResponseGetTaskByDocument{
    id: string;             
    userId: string;         
    title: string;
    state: TaskState;       
    expirationDate: string; 
}