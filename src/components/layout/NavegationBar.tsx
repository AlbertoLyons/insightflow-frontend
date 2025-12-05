"use client";

import {
  HiCog,
  HiLogout,
  HiUser,
  HiUserAdd,
  HiUserGroup,
} from "react-icons/hi";

import { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/shadcn";
import { getUserFromToken, isAuthenticated, logout } from "@/src/utils/auth";

export const NavegationBar = () => {
  const handleLogout = async () => {
    await logout();
  };
  const pathname = usePathname();

  var userName = "";
  var userEmail = "";
  var userRole = "";
  const authenticated = isAuthenticated();
  if (authenticated) {
    userName = getUserFromToken().given_name;
    console.log(userName);
    userEmail = getUserFromToken().email;
    console.log(userEmail);
    userRole = getUserFromToken().role;
    console.log(userRole);
  }

  const isHome = pathname === "/";
  const isConfig = pathname === "/config/";
  const isUsers = pathname === "/users/";
  const isWorkspace = pathname === "/workspace/";
  const isWorkspaceCreate = pathname === "/workspace/create/";
  console.log("Ruta: " + pathname);

  return (
    <nav className="fixed w-full bg-background/95 backdrop-blur-sm z-50 shadow-sm top-0 border-b border-border/50 h-16">
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-light text-foreground cursor-pointer hover:text-primary transition-colors duration-300 flex items-center"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span className="block sm:hidden">IF</span>
          <span className="hidden sm:block">Insightflow</span>
        </Link>

        {/* === MENU PARA USUARIOS AUTENTICADOS === */}
        {(isHome || isConfig || isUsers) && authenticated && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0 hover:bg-muted/50 border border-border/50 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <HiUser className="h-5 w-5 text-primary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-64 border border-border shadow-lg bg-card"
              align="end"
            >
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-card-foreground">
                  {userName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
              <DropdownMenuSeparator />

              {userRole == "ADMIN" && (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/users" className="flex items-center space-x-2">
                      <HiUserGroup className="h-4 w-4" />
                      <span>Gestionar Usuarios</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                </>
              )}

              <DropdownMenuItem asChild>
                <Link href="/config" className="flex items-center space-x-2">
                  <HiCog className="h-4 w-4" />
                  <span>Editar Perfil</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5 flex items-center space-x-2"
                onClick={handleLogout}
              >
                <HiLogout className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* === MENU EN WORKSPACE === */}
        {isWorkspace && authenticated && (
          <Link href="/workspace/create/">
            <Button variant="outline">Crear espacio de trabajo</Button>
          </Link>
        )}

        {/* === MENU EN WORKSPACE CREATE === */}
        {isWorkspaceCreate && authenticated && (
          <Link href="/workspace/">
            <Button variant="outline">Ver espacios de trabajo</Button>
          </Link>
        )}

        {/* === MENU PARA USUARIOS NO AUTENTICADOS === */}
        {!authenticated && (
          <div className="flex items-center space-x-3">
            {/* INICIAR SESIÓN */}
            <Link
              href="/login/"
              className="text-[11px] uppercase tracking-wider text-gray-500 hover:text-black px-4 py-2 transition cursor-pointer"
            >
              INICIAR SESIÓN
            </Link>

            {/* REGISTRARSE */}
            <Link
              href="/register/"
              className=" text-[11px] uppercase tracking-wider bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-900 transition cursor-pointer"
            >
              REGISTRARSE
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
