import { GetWorkspaceByUser } from '@/src/models/workspaces/GetWorkspaceByUser';
import { getWorkspaces } from '@/src/app/api/workspaces';
import NavBar from '@/src/components/workspaces/NavBar';
import WorkspacesComponent from '@/src/components/workspaces/WorkspacesPage';

const workspacesCache: { data: GetWorkspaceByUser[] | null } = { data: null };

export default async function WorkspacesPage() {
    let workspaces: GetWorkspaceByUser[] = [];
    try {
        workspaces = await getWorkspaces();
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        workspaces = [];
    }
    workspacesCache.data = workspaces;

  return (
    <main style={{ backgroundColor: '#f2f6ffff' }}>
      <NavBar />
      <WorkspacesComponent workspaces={workspaces} />
    </main>
  );
}