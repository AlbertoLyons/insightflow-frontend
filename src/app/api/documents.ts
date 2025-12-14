const DOC_URL = "http://localhost:5232";

import { DocumentDto, CreateDocument, UpdateDocument } from "@/src/models/documents";

// Crear documento
export async function createDocument(data: CreateDocument): Promise<Document> {
  const res = await fetch(`${DOC_URL}/document`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Error creating document");
  return res.json();
}

// Obtener uno
export async function getDocument(id: string): Promise<Document> {
  const res = await fetch(`${DOC_URL}/document/${id}`);
  if (!res.ok) throw new Error("Document not found");
  return res.json();
}

// Obtener documentos por workspace
export async function getDocumentsByWorkspace(workspaceId: string): Promise<Document[]> {
  const res = await fetch(`${DOC_URL}/document/workspace/${workspaceId}`);
  if (!res.ok) throw new Error("Error loading documents");
  return res.json();
}

// Editar contenido
export async function updateDocumentContent(id: string, data: UpdateDocument): Promise<Document> {
  const res = await fetch(`${DOC_URL}/document/${id}/content`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Error updating");

  return res.json();
}

// Desactivar (soft delete)
export async function deleteDocument(id: string) {
  const res = await fetch(`${DOC_URL}/document/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting");
  return res.json();
}