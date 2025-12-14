"use client";

import { useState } from "react";
import { createDocument } from "@/src/app/api/documents";
import { useRouter } from "next/navigation";

export default function CreateDocumentPage({ params }: any) {
  const workspaceId = params.id;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");

  const handleCreate = async () => {
    await createDocument({
      workspaceId,
      title,
      icon,
      contentJson: "[]"
    });

    router.push(`/workspace/${workspaceId}/documents`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear Documento</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Icono (opcional)"
        value={icon}
        onChange={e => setIcon(e.target.value)}
      />

      <button 
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleCreate}>
        Crear
      </button>
    </div>
  );
}