"use client";

import { useEffect, useState } from "react";
import { getDocumentById } from "@/src/app/api/documents";
import { DocumentDto } from "@/src/models/documents/DocumentDto";
import Link from "next/link";

export default function DocumentViewPage({ params }: any) {
  const id = params.id;
  const [doc, setDoc] = useState<DocumentDto | null>(null);

  useEffect(() => {
    getDocumentById(id).then(setDoc);
  }, [id]);

  if (!doc) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <Link href={`/documents/${id}/edit`} 
            className="px-4 py-2 bg-yellow-500 text-white rounded">
        Editar documento
      </Link>

      <h1 className="text-3xl mt-4">
        {doc.icon ?? "📄"} {doc.title}
      </h1>

      <pre className="mt-6 p-4 border rounded bg-gray-100">
        {JSON.stringify(JSON.parse(doc.contentJson), null, 2)}
      </pre>
    </div>
  );
}