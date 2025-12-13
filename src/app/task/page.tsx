"use client";

import { useState } from "react";
// Importa tus componentes aquí
import CreateTaskModal from "@/src/components/task/CreateTaskForm";

export default function PlaygroundPage() {
  // --- ESTADOS PARA LOS MODALES ---
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  // --- ESTADO PARA VER LOGS EN PANTALLA ---
  // Esto sirve para saber si el "onSuccess" funcionó sin abrir la consola
  const [lastAction, setLastAction] = useState<string>("Esperando acciones...");

  // ID de prueba (puedes cambiarlo por uno real de tu BD)
  const TEST_DOC_ID = "d290f1ee-6c54-4b01-90e6-d701748f0851"; 

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* CABECERA */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800"> Testing Task</h1>
        <p className="text-gray-600">Usa esta página para probar componentes aislados.</p>
      </div>

      {/* CONSOLA VISUAL DE LOGS */}
      <div className="bg-black text-green-400 p-4 rounded-lg font-mono mb-8 shadow-lg">
        <span className="text-gray-500">{">"} Status: </span>
        {lastAction}
      </div>

      {/* GRILLA DE PRUEBAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* --- ZONA 1: TAREAS --- */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">Gestión de Tareas</h2>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Abrir Modal "Crear Tarea"
            </button>

            {/* Aquí puedes agregar más botones en el futuro, ej: "Probar Editar Tarea" */}
            <button disabled className="w-full bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded cursor-not-allowed">
              Editar Tarea (Próximamente)
            </button>
          </div>
        </div>

        {/* --- ZONA 2: USUARIOS (Ejemplo futuro) --- */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-green-600 border-b pb-2">Usuarios</h2>
          <p className="text-sm text-gray-500 mb-4">Aquí podrás probar componentes de usuario.</p>
          <button onClick={() => setLastAction("Click en prueba de usuario")} className="w-full bg-green-100 text-green-700 hover:bg-green-200 py-2 rounded">
            Test Botón Dummy
          </button>
        </div>

      </div>

      {/* --- COMPONENTES MODALES (Renderizados condicionalmente) --- */}
      
      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSucces={() => {
          setLastAction(`✅ Tarea creada exitosamente a las ${new Date().toLocaleTimeString()}`);
          setIsTaskModalOpen(false);
        }}
        documentId={TEST_DOC_ID}
      />

    </div>
  );
}