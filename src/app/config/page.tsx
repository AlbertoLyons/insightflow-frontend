"use client";

import { useEffect, useState } from "react";
import { editUser, getUserById } from "@/src/app/api/users";
import { useRouter } from "next/navigation";
import { getUserFromToken, isAuthenticated } from "@/src/utils/auth";
import { HiUser, HiUserCircle } from "react-icons/hi";

export default function ConfigPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ⭐ mensaje de éxito
  const [loading, setLoading] = useState(true);

  // Obtener usuario al montar
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    const userId = getUserFromToken().nameid;

    getUserById(userId)
      .then((user) => {
        setFullName(user.fullName ?? "");
        setNickName(user.nickName ?? "");
      })
      .catch(() => {
        setError("No se pudo obtener la información del usuario.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // limpiar mensaje anterior

    try {
      const userId = getUserFromToken().nameid;
      await editUser(userId, { fullName, nickName });

      setSuccess("Usuario actualizado correctamente"); // ⭐ mensaje de éxito

      router.refresh();
    } catch (err: any) {
      let msg = "Error desconocido";

      try {
        const parsed = JSON.parse(err.message);
        msg = parsed.message ?? err.message;
      } catch {
        msg = err.message;
      }

      setError(msg);
    }
  };

  const isDisabled = fullName.trim() === "" || nickName.trim() === "";

  if (isAuthenticated()) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-semibold text-center mb-2">
            Editar Usuario
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Actualiza tus datos personales
          </p>

          <form onSubmit={handleConfig} className="space-y-4">
            {/* FullName */}
            <div>
              <label className="block font-medium mb-1">Nombre Completo</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="tu nombre completo"
                  className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setSuccess(""); // limpiar éxito al editar
                  }}
                />
                <span className="absolute left-3 top-3.5 text-gray-500">
                  <HiUser />
                </span>
              </div>
            </div>

            {/* NickName */}
            <div>
              <label className="block font-medium mb-1">
                Nombre de Usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tu nombre de usuario"
                  className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
                  value={nickName}
                  onChange={(e) => {
                    setNickName(e.target.value);
                    setSuccess(""); // limpiar éxito al editar
                  }}
                />
                <span className="absolute left-3 top-3.5 text-gray-500">
                  <HiUserCircle />
                </span>
              </div>
            </div>

            {/* Mensaje de error */}
            {error && <p className="text-red-600 text-center">{error}</p>}

            {/* Mensaje de éxito */}
            {success && (
              <p className="text-green-600 text-center font-medium">
                {success}
              </p>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full py-3 rounded-lg text-white font-medium transition 
                ${
                  isDisabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
            >
              Editar usuario
            </button>
          </form>
        </div>
      </div>
    );
  }
}
