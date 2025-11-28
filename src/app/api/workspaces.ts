import { GetWorkspaceByUser } from '@/src/models/GetWorkspaceByUser';
import { CreateWorkspace } from '@/src/models/CreateWorkspace';

const WORKSPACE_URL = process.env.NEXT_PUBLIC_WORKSPACES_URL;

async function getWorkspaces(): Promise<GetWorkspaceByUser[]> {
  // Temporalmente se usa un userId hardcodeado
  const userId: string = "b3850a65-61d9-4417-8b03-de3a700d7064";
  // Se tiene que reemplazar por obtener el userId del usuario logueado
  const response = await fetch(WORKSPACE_URL + 'workspaces?userId=' + userId);
  const workspaces: GetWorkspaceByUser[] = await response.json();
  for (const workspace of workspaces) {
    if (workspace.userRole === 'Owner') {
      workspace.userRole = 'Propietario';
    }
  }
  return workspaces;
}
export { getWorkspaces };

async function deleteWorkspace(workspaceId: string): Promise<void> {
  const response = await fetch(WORKSPACE_URL + 'workspaces/' + workspaceId, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting workspace');
  }
  return;
}
export { deleteWorkspace };

async function createWorkspace(workspace: CreateWorkspace): Promise<void> {
  const formData = new FormData();
  formData.append('Name', workspace.name);
  formData.append('Description', workspace.description);
  formData.append('Topic', workspace.topic);
  formData.append('Image', workspace.image[0]);
  formData.append('OwnerId', workspace.ownerId);
  formData.append('OwnerName', workspace.ownerName);
  
  const response = await fetch(WORKSPACE_URL + 'workspaces', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Error creating workspace');
  }
  return;
};
export { createWorkspace };