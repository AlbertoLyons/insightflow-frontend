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

export const NavegationBar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isRegister = pathname === "/register/";
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

        {/* === ELEMENTOS A LA DERECHA SEGÚN LA RUTA === */}
        {(isHome || isConfig || isUsers || isRegister) && (
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
              <DropdownMenuItem asChild>
                <Link href="/register" className="flex items-center space-x-2">
                  <HiUserAdd className="h-4 w-4" />
                  <span>Registrar</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/users" className="flex items-center space-x-2">
                  <HiUserGroup className="h-4 w-4" />
                  <span>Usuarios</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/config" className="flex items-center space-x-2">
                  <HiCog className="h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {isWorkspace && (
          <Link href="/workspace/create">
            <Button variant="outline">Crear espacio de trabajo</Button>
          </Link>
        )}

        {isWorkspaceCreate && (
          <Link href="/workspace">
            <Button variant="outline">Ver espacios de trabajo</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};
