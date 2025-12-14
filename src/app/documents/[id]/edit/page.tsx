"use client";

import { useEffect, useState } from "react";
import { getDocumentById, updateDocumentContent, updateDocumentMetadata } from "@/src/app/api/documents";
import { DocumentDto } from "@/src/models/documents/DocumentDto";
import { useRouter } from "next/navigation";

export default function EditDocumentPage({ params }: any) {
  const id = params.id;
  const router = useRouter();

  const [doc, setDoc] = useState<Document | null>(null);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getDocumentById(id).then(d => {
      setDoc(d);
      setTitle(d.title ?? "");
      setIcon(d.icon ?? "");
      setContent(d.contentJson);
    });
  }, [id]);

  const saveTitle = async () => {
    await updateDocumentMetadata(id, { title, icon });
  };

  const saveContent = async () => {
    await updateDocumentContent(id, { contentJson: content });
  };

  if (!doc) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Documento</h1>

      <label>Título</label>
      <input
        className="border p-2 w-full mb-3"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label>Icono</label>
      <input
        className="border p-2 w-full mb-3"
        value={icon}
        onChange={e => setIcon(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
              onClick={saveTitle}>
        Guardar Título e Icono
      </button>

      <label>Contenido JSON</label>
      <textarea
        className="border p-2 w-full h-64"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded mt-4"
              onClick={saveContent}>
        Guardar Contenido
      </button>
    </div>
  );
}