"use client";

import { useState } from 'react';
import Board from '@/src/components/workspaces/Board';
import { GetWorkspaceByUser } from '@/src/models/workspaces/GetWorkspaceByUser';

type WorkspacesPageProps = { workspaces: GetWorkspaceByUser[] };
export default function WorkspacesPage({ workspaces }: WorkspacesPageProps) {
    const [showSearchModal, setShowSearchModal] = useState(false);

    return (
        <div style= {{
            backgroundColor: '#f2f6ffff',
            padding: '10px',
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '500'
        }}>
        <button style={{
            padding: '10px 20px',
            backgroundColor: '#001b5aff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '600',
        }}
        onClick={() => setShowSearchModal(true)}
        >
        Buscar espacio de trabajo
        </button>

        {showSearchModal && (
            <div>
                
            </div>
        )}
        <Board workspaces={workspaces ?? []} />
        </div>
    );
}