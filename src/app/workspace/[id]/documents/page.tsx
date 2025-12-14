"use client";

import { useEffect, useState } from "react";
import { getDocumentsByWorkspace } from "@/src/app/api/documents";
import { DocumentDto } from "@/src/models/documents/DocumentDto";
import Link from "next/link";

export default function WorkspaceDocumentsPage({ params }: any) {
  const workspaceId = params.id;
  const [documents, setDocuments] = useState<DocumentDto[]>([]);

  useEffect(() => {
    getDocumentsByWorkspace(workspaceId).then(setDocuments);
  }, [workspaceId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Documentos del Workspace</h1>

      <Link 
        className="px-4 py-2 bg-blue-600 text-white rounded"
        href={`/workspace/${workspaceId}/documents/create`}>
        Crear nuevo documento
      </Link>

      <ul className="mt-6 space-y-4">
        {documents.map(doc => (
          <li key={doc.id} className="p-4 border rounded shadow">
            <Link href={`/documents/${doc.id}`} className="text-xl font-semibold">
              {doc.icon ?? "📄"} {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}