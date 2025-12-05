"use client";

import { useEffect, useState } from "react";
import { getUsers, getUserById, deleteUser } from "@/src/app/api/users";
import { isAuthenticated, getUserRole } from "@/src/utils/auth";
import { useRouter } from "next/navigation";
import { HiSearch, HiTrash, HiUsers } from "react-icons/hi";
import { user } from "@/src/models/users";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<user[]>([]);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // ✔ Validar autenticación y rol + cargar usuarios automáticamente
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    if (getUserRole() !== "ADMIN") {
      router.replace("/");
      return;
    }

    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error: any) {
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  // ✔ Buscar usuario por ID
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (searchId.trim() === "") {
      loadUsers();
      return;
    }

    try {
      const user = await getUserById(searchId.trim());
      setUsers([user]);
    } catch {
      setError("No se encontró el usuario con ese ID.");
      setUsers([]);
    }
  };

  // ✔ Eliminar usuario
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setSuccess("Usuario eliminado correctamente.");
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setTimeout(() => setSuccess(""), 2500);
    } catch {
      setError("No se pudo eliminar el usuario.");
    }
  };

  // -------------------------------------------
  //              RENDER PAGE
  // -------------------------------------------

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Cargando usuarios...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* TÍTULO */}
        <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2">
          <HiUsers className="text-red-500" /> Gestión de Usuarios
        </h1>

        {/* BUSCADOR */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar usuario por ID..."
              className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <HiSearch className="absolute left-3 top-3.5 text-gray-500" />
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-medium transition"
          >
            Buscar
          </button>
        </form>

        {/* MENSAJES */}
        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-center mb-4 font-medium">
            {success}
          </p>
        )}

        {/* LISTA DE USUARIOS */}
        <div className="space-y-4">
          {users.length === 0 ? (
            <p className="text-center text-gray-600">
              No se encontraron usuarios.
            </p>
          ) : (
            users.map((u) => (
              <div
                key={u.id}
                className="border rounded-lg p-5 bg-gray-50 shadow-sm flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>ID:</strong> {u.id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {u.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {u.email}
                  </p>
                  <p>
                    <strong>Usuario:</strong> {u.nickName}
                  </p>
                  <p>
                    <strong>Rol:</strong> {u.role}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition"
                >
                  <HiTrash size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
