import React from 'react';
import { GetWorkspaceByUser } from '@/src/models/workspaces/GetWorkspaceByUser';
import Options from '@/src/components/workspaces/Options';
/**
 * Props para el componente Card que representa una tarjeta de espacio de trabajo.
 */
interface CardProps {
  workspace: GetWorkspaceByUser;
}

/**
 * Componente que representa una tarjeta de espacio de trabajo.
 * @param {CardProps} props - Props que contienen la información del espacio de trabajo.
 * @returns {JSX.Element} Elemento JSX que representa la tarjeta del espacio de trabajo.
 */
export default function Card({ workspace }: CardProps) {
  return (
    // Tarjeta del espacio de trabajo
    <div 
      style={{
        padding: '12px',
        margin: '8px 0',
        borderRadius: '6px',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        // Cambia el color del borde izquierdo según el rol del usuario
        borderLeft: workspace.userRole === 'Propietario' ? '4px solid #ff0000ff' : '4px solid #0068bdff'
      }}
    >
      {/* Contenido de la tarjeta */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#240707ff', marginRight: '10px', overflow: 'hidden' }}>
          <img src={workspace.imageUrl} alt={workspace.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h3 style={{ margin: 0, fontSize: '16px', color : '#333' }}>
          {workspace.name}
        </h3>
      </div>
      <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>
        Tu rol: <strong>{workspace.userRole}</strong>
      </p>
      <small style={{ color: '#000000ff' }}>ID del espacio: {workspace.id}</small>
      {/* Opciones del espacio de trabajo que son editar o eliminar*/}
      <div>
        <Options workspaceId={workspace.id} name={workspace.name} imageUrl={workspace.imageUrl} />
      </div>
    </div>
    
  );
}