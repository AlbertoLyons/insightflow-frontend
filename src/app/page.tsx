"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setIsAuth(isAuthenticated());
  }, [pathname]);

  if (!mounted) return null;

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="pt-5 bg-linear-to-r from-blue-50 to-white">
        <div className="container mx-auto text-center px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Organiza tu trabajo y colabora con facilidad
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            InsightFlow es una plataforma tipo Notion que permite gestionar
            notas, documentos, espacios de trabajo y tareas.
          </p>
          {!isAuth && (
            <Link
              href="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Comenzar gratis
            </Link>
          )}
          {isAuth && (
            <Link
              href="/workspace"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Espacio de trabajo
            </Link>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-28 text-center px-48 -mt-5">
            {/* Workspace Service */}
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
              <p>
                Crea y administra espacios de trabajo colaborativos con roles y
                permisos definidos.
              </p>
            </div>

            {/* Documents Service */}
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
              <p>
                Genera, edita y comparte documentos y páginas dentro de tus
                espacios de trabajo.
              </p>
            </div>

            {/* Tasks Service */}
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
              <p>
                Administra tareas, asigna responsables y controla su ciclo de
                vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-10">
        <div className="container mx-auto px-6 text-center space-y-4">
          <p>© 2025 InsightFlow. Todos los derechos reservados.</p>
          <p>Contacto: contacto@insightflow.com</p>
        </div>
      </footer>
    </main>
  );
}
