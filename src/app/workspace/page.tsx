import { GetWorkspaceByUser } from "@/src/models/workspaces/GetWorkspaceByUser";
import { getWorkspaces } from "@/src/app/api/workspaces";
import NavBar from "@/src/components/workspaces/NavBar";
import WorkspacesComponent from "@/src/components/workspaces/WorkspacesPage";

// Caché de los workspaces
const workspacesCache: { data: GetWorkspaceByUser[] | null } = { data: null };
/**
 * Componente de la página de workspaces.
 * @returns {JSX.Element} Elemento JSX que representa la página de workspaces.
 */
export default async function WorkspacesPage() {
  // Espacios de trabajo
  let workspaces: GetWorkspaceByUser[] = [];
  // Obtener workspaces desde la API
  try {
    workspaces = await getWorkspaces();
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    workspaces = [];
  }
  // Actualizar caché
  workspacesCache.data = workspaces;

  return (
    // Componentes de la página de workspaces
    <main style={{ backgroundColor: "#ffffff" }}>
      <WorkspacesComponent workspaces={workspaces} />
    </main>
  );
}
