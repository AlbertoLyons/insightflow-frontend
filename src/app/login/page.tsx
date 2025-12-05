"use client";

import { useState } from "react";
import { login } from "@/src/app/api/users";
import { usePathname, useRouter } from "next/navigation";
import {
  HiEye,
  HiEyeOff,
  HiKey,
  HiLockClosed,
  HiOutlineMail,
} from "react-icons/hi";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
      router.push("/workspace/");
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

  const isDisabled = email.trim() === "" || password.trim() === "";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 ">
        <h2 className="text-3xl font-semibold text-center mb-2">
          Iniciar sesión
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Inicia sesión en tu cuenta para gestionar tareas
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Correo Electrónico</label>
            <div className="relative">
              <input
                type="email"
                placeholder="tu@correo.com"
                className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute left-3 top-3.5 text-gray-500">
                <HiOutlineMail className="mt-0.5" />
              </span>
            </div>
            {email.trim() === "" && (
              <p className="text-sm text-red-600 mt-1">
                El correo electrónico es requerido
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña"
                className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute left-3 top-3.5 text-gray-500">
                <HiLockClosed className="mt-0.5" />
              </span>

              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <HiEyeOff className="mt-1" />
                ) : (
                  <HiEye className="mt-1" />
                )}
              </button>
            </div>
            {password.trim() === "" && (
              <p className="text-sm text-red-600 mt-1">
                La contraseña es requerido
              </p>
            )}
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* Submit */}
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
            Entrar
          </button>

          {/* Link crear cuenta */}
          <p className="text-center mt-2 text-gray-600">
            ¿No tienes cuenta?{" "}
            <a
              href="/register/"
              className="font-semibold text-red-600 hover:underline"
            >
              Crear una cuenta
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
