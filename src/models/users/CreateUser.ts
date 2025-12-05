/**
 * Interfaz para la creacion de un usuario
 */
export interface createUser {
  // Nombre completo del usuario
  fullName: string;
  // Correo electronico del usuario
  email: string;
  // Apodo del usuario
  nickName: string;
  // Fecha de nacimiento del usuario
  birthDate: string;
  // Direccion del usuario
  address: string;
  // Numero de telefono del usuario
  phoneNumber: number;
  // Contraseña del usuario
  password: string;
}
