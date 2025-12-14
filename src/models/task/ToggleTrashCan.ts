/**
 * Interfaz de respuesta del metodo implementado como Soft Delete
 */
export interface ToggleTaskResponse {
    //Mensaje de exito
    message: string;

    //Indica si la tarea esta activa o no
    isActive: boolean;
}