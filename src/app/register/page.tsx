"use client";

import { useState } from "react";
import { createUser } from "@/src/app/api/users";
import { useRouter } from "next/navigation";
import {
  HiArrowLeft,
  HiCalendar,
  HiEye,
  HiEyeOff,
  HiLocationMarker,
  HiLockClosed,
  HiOutlineMail,
  HiOutlineUser,
  HiPhone,
  HiUser,
  HiUserCircle,
} from "react-icons/hi";
import { HiCalendarDateRange, HiUserPlus } from "react-icons/hi2";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUser({
        fullName,
        email,
        nickName,
        birthDate,
        address,
        phoneNumber,
        password,
      });
      router.push("/login/");
    } catch (err: any) {
      let msg = "Error desconocido";

      try {
        const parsed = JSON.parse(err.message);

        // Si vienen errores de validación
        if (parsed.errors) {
          const allErrors = Object.values(parsed.errors).flat().join("\n -- ");

          msg = allErrors;
        } else {
          msg = parsed.message ?? err.message;
        }
      } catch {
        msg = err.message;
      }

      setError(msg);
    }
  };

  const isDisabled =
    fullName.trim() === "" ||
    email.trim() === "" ||
    nickName.trim() === "" ||
    birthDate.trim() === "" ||
    address.trim() === "" ||
    phoneNumber === 0 ||
    password.trim() === "";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 ">
        <h2 className="text-3xl font-semibold text-center mb-2">
          Registrar Usuario
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Crea tu cuenta para acceder al sistema
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* FullName */}
          <div>
            <label className="block font-medium mb-1">Nombre Completo</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Luis Alba Argandoña"
                className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <span className="absolute left-3 top-3.5 text-gray-500">
                <HiUser className="mt-0.5" />
              </span>
            </div>
            {fullName.trim() === "" && (
              <p className="text-sm text-red-600 mt-1">
                El nombre completo es requerido
              </p>
            )}
          </div>

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

          {/* NickName */}
          <div>
            <label className="block font-medium mb-1">Nombre de usuario</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Luis21344"
                className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              <span className="absolute left-3 top-3.5 text-gray-500">
                <HiOutlineUser className="mt-0.5" />
              </span>
            </div>
            {nickName.trim() === "" && (
              <p className="text-sm text-red-600 mt-1">
                El nombre de usuario es requerido
              </p>
            )}
          </div>

          {/* BirthDate */}
          <div>
            <label className="block font-medium mb-1">
              Fecha de nacimiento
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              <span className="absolute left-3 top-3.5 text-gray-500">
                <HiCalendarDateRange className="mt-0.5" />
              </span>
            </div>
            {birthDate.trim() === "" && (
              <p className="text-sm text-red-600 mt-1">
                La fecha de nacimiento es requerida
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">Dirección</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Matta 124"
                className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span className="absolute left-3 top-3.5 text-gray-500">
                <HiLocationMarker className="mt-0.5" />
              </span>
            </div>
            {address.trim() === "" && (
              <p className="text-sm text-red-600 mt-1">
                La dirección es requerido
              </p>
            )}
          </div>

          {/* PhoneNumber */}
          <div>
            <label className="block font-medium mb-1">Teléfono</label>
            <div className="relative">
              <input
                type="number"
                placeholder="89127321"
                className="w-full border rounded-lg px-4 py-3 pl-10 focus:outline-red-500"
                value={phoneNumber === 0 ? "" : phoneNumber}
                min={1}
                onChange={(e) => setPhoneNumber(e.target.valueAsNumber)}
              />
              <span className="absolute left-3 top-3.5 text-gray-500">
                <HiPhone className="mt-0.5" />
              </span>
            </div>
            {phoneNumber === 0 && (
              <p className="text-sm text-red-600 mt-1">
                El telefono es requerido
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
            Crear cuenta
          </button>

          {/* Link crear cuenta */}
          <p className="text-center mt-2 text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <a
              href="/login/"
              className="font-semibold text-red-600 hover:underline"
            >
              Iniciar Sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
