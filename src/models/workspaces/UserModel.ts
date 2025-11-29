/**
 * Interfaz que representa un usuario en el sistema para los espacios de trabajo.
 */
export interface UserModel {
    // ID del usuario
    id: string;
    // Nombre del usuario
    name: string;
    // Rol del usuario en el espacio de trabajo
    role: string;
}
// Tipo que representa una lista de usuarios
export type Users = UserModel[];