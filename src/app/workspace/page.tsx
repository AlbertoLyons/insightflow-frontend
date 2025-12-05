import WorkspacesComponent from "@/src/components/workspaces/WorkspacesPage";

/**
 * Componente de la página de workspaces.
 * @returns {JSX.Element} Elemento JSX que representa la página de workspaces.
 */
export default async function WorkspacesPage() {
  return (
    <main style={{ backgroundColor: "#ffffff" }}>
      <WorkspacesComponent  />
    </main>
  );
}
