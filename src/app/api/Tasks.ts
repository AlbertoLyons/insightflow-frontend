import { CreateTask, ResponseCreateTask } from "@/src/models/task/CreateTask";
import { EditTask,ResponseEditTask } from "@/src/models/task/EditTask";
import { ResponseGetTask } from "@/src/models/task/GetTask";
import { ResponseGetTaskByDocument } from "@/src/models/task/GetTaskByDocId";
import { ToggleTaskResponse } from "@/src/models/task/ToggleTrashCan";
import { headers } from "next/headers";

const TASKS_URL = process.env.NEXT_PUBLIC_TASKS_URL;

export async function createTask(task:CreateTask): Promise<ResponseCreateTask>
{
    const response = await fetch(`${TASKS_URL}/tasks`, {

        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.message  || 'Error al crear Tarea')
    }

    const data = await response.json()
    return data.Task;
   
}

export async function getTaskById(taskId: string): Promise<ResponseGetTask>
{
    const response = await fetch(`${TASKS_URL}/tasks/${taskId}`);

    if(!response.ok)
    {
        throw new Error("Error: Tarea no encontrada");
    }

    const data = await response.json();
    return data.Task;
}

export async function getTaskByDocumentId(documentId: string) : Promise<ResponseGetTaskByDocument[]>
{
    try
    {
        const response = await fetch(`${TASKS_URL}/documents/${documentId}/tasks`, {

            cache: 'no-store',

        });

        if(!response.ok)
        {
            throw new Error("Error al obtener tareas")
        }

        const data = await response.json();

        return data.Tasks || [];

    }catch(error)
    {
        console.error("Error al obtener tareas por id", error);
        return [];
    }
} 

export async function editTask(taskId: string, request: EditTask) : Promise<ResponseEditTask>
{
    const response = await fetch(`${TASKS_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(request),
    });

    if(!response.ok)
    {
        throw new Error("Error al editar tarea.")
    }
    
    const data = await response.json();
    return data.Task;
    
}

export async function toggleTrashCan(taskId:string) : Promise<ToggleTaskResponse>{

    const response = await fetch(`${TASKS_URL}/tasks/${taskId}`, {

        method: 'PATCH',
    });
    
    if(!response.ok)
    {
        throw new Error(" Error al cambiar estado de papelera");
    }

    const data = await response.json();
    return data;
 
}
