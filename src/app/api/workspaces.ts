import { GetWorkspaceByUser } from '@/src/models/workspaces/GetWorkspaceByUser';
import { CreateWorkspace } from '@/src/models/workspaces/CreateWorkspace';
import { EditWorkspaceModel } from '@/src/models/workspaces/EditWorkspace';
import { GetWorkspaceById } from '@/src/models/workspaces/GetWorkspaceById';

/**
 * Módulo de funciones para interactuar con el servicio de workspaces.
 */

// URL base del servicio de workspaces
const WORKSPACE_URL = process.env.NEXT_PUBLIC_WORKSPACES_URL;
/**
 * Función para obtener los workspaces de un usuario.
 * @returns {Promise<GetWorkspaceByUser[]>} - Lista de workspaces del usuario.
 */
async function getWorkspaces(): Promise<GetWorkspaceByUser[]> {
  /**
   * TODO: Temporalmente se usa un userId hardcodeado
   */
  const userId: string = "a08799f8-746f-46b4-8134-2ef211fe705a";
  /**
   * TODO Se tiene que reemplazar por obtener el userId del usuario logueado
   */
  // Realizar la petición al servicio de workspaces
  const response = await fetch(WORKSPACE_URL + 'workspaces?userId=' + userId);
  // Obtener la lista de workspaces
  const workspaces: GetWorkspaceByUser[] = await response.json();
  for (const workspace of workspaces) {
    if (workspace.userRole === 'Owner') {
      workspace.userRole = 'Propietario';
    }
  }
  // Devolver la lista de workspaces
  return workspaces;
}
export { getWorkspaces };
/**
 * Función para eliminar un workspace por su ID.
 * @param workspaceId 
 * @returns {Promise<void>}
 */
async function deleteWorkspace(workspaceId: string): Promise<void> {
  // Realizar la petición al servicio de workspaces
  const response = await fetch(WORKSPACE_URL + 'workspaces/' + workspaceId, {
    method: 'DELETE',
  });
  // Verificar si la respuesta es correcta
  if (!response.ok) {
    throw new Error('Error deleting workspace');
  }
  // Devolver void
  return;
}
export { deleteWorkspace };
/**
 * Función para crear un nuevo workspace.
 * @param workspace 
 * @returns {Promise<void>}
 */
async function createWorkspace(workspace: CreateWorkspace): Promise<void> {
  // Crear un FormData para enviar los datos del workspace
  const formData = new FormData();
  // Agregar los campos al FormData
  formData.append('Name', workspace.name);
  formData.append('Description', workspace.description);
  formData.append('Topic', workspace.topic);
  formData.append('Image', workspace.image[0]);
  formData.append('OwnerId', workspace.ownerId);
  formData.append('OwnerName', workspace.ownerName);
  // Realizar la petición al servicio de workspaces
  const response = await fetch(WORKSPACE_URL + 'workspaces', {
    method: 'POST',
    body: formData
  });
  // Verificar si la respuesta es correcta
  if (!response.ok) {
    throw new Error('Error creating workspace');
  }
  // Devolver void
  return;
};
export { createWorkspace };
/**
 * Función para editar un workspace.
 * @param workspaceId 
 * @param workspace 
 * @returns {Promise<void>}
 */
async function editWorkspace(workspaceId: string, workspace: EditWorkspaceModel): Promise<void> {
  // Crear un FormData para enviar los datos del workspace
  const formData = new FormData();
  // Agregar los campos al FormData
  formData.append('Name', workspace.name);
  // Agregar la imagen solo si no es nula
  if (workspace.image!.length > 0) {
    formData.append('Image', workspace.image![0]);
  }
  // Realizar la petición al servicio de workspaces
  const response = await fetch(WORKSPACE_URL + 'workspaces/' + workspaceId, {
    method: 'PATCH',
    body: formData
  });
  // Verificar si la respuesta es correcta
  if (!response.ok) {
    throw new Error('Error editing workspace');
  }
  // Devolver void
  return;
}
export { editWorkspace };
/**
 * Función para obtener un workspace por su ID.
 * @param workspaceId 
 * @returns {Promise<GetWorkspaceById>}
 */
async function getWorkspaceById(workspaceId: string): Promise<GetWorkspaceById> {
  // Realizar la petición al servicio de workspaces
  const response = await fetch(WORKSPACE_URL + 'workspaces/' + workspaceId);
  // Verificar si la respuesta es correcta
  if (!response.ok) {
    throw new Error('Error fetching workspace by ID');
  }
  // Obtener el workspace
  const workspace: GetWorkspaceById = await response.json();
  // Devolver el workspace
  return workspace;
}
export { getWorkspaceById };