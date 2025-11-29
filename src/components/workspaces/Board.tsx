import React from 'react';
import { WorkspacesByUser } from '@/src/models/workspaces/GetWorkspaceByUser';
import Card from './Card';

interface BoardProps {
  workspaces: WorkspacesByUser;
}

export default function Board({ workspaces }: BoardProps) {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', overflowX: 'auto', backgroundColor: '#f2f6ffff' }}>
      <div
        style={{
          maxWidth: "100%",              // ancho máximo
          overflowX: "auto",             // scroll horizontal
          overflowY: "hidden",           // sin scroll vertical
          display: "flex",               // elementos en fila
          gap: "1rem",                   // espacio entre items
          paddingBottom: "10px"          // para que no se corte el scroll
        }}
      >
        {workspaces.map((workspace) => (
          <Card key={workspace.id} workspace={workspace} />
        ))}
      </div>

    </div>
  );
}
