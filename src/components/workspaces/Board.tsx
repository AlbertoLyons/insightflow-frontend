import React from 'react';
import { WorkspacesByUser } from '@/src/models/workspaces/GetWorkspaceByUser';
import Card from './Card';
/**
 * Props para el componente Board que contiene una lista de espacios de trabajo.
 */
interface BoardProps {
  workspaces: WorkspacesByUser;
}
/**
 * Componente de tablero que muestra una lista de espacios de trabajo en tarjetas.
 * @param {BoardProps} props - Props que contienen la lista de espacios de trabajo. 
 * @returns {JSX.Element} Elemento JSX que representa el tablero de espacios de trabajo. 
 */
export default function Board({ workspaces }: BoardProps) {
  return (
    // Contenedor principal del tablero
    <div style={{ display: 'flex', gap: '20px', padding: '20px', overflowX: 'auto' }}>
      <div
        style={{
          maxWidth: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          display: "flex",
          gap: "1rem",
          paddingBottom: "10px"
        }}
      >
        {/* Mapeo de espacios de trabajo a tarjetas */}
        {workspaces.map((workspace) => (
          <Card key={workspace.id} workspace={workspace} />
        ))}
      </div>
    </div>
  );
}
