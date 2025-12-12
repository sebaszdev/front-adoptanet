import { Cat, LogOut, Menu, UserRound, UserRoundCog } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import logo from "@/assets/logo.png";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/context/useAuth";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-between py-3 px-10 border-b-2 shadow-sm">
        <div className="flex gap-x-6">
          <Link to="/" className="flex flex-col justify-center">
            <Avatar>
              <AvatarImage src={logo} alt="Logo de AdoptaNet" />
              <AvatarFallback>AdoptaNet</AvatarFallback>
            </Avatar>
          </Link>
          <Navbar />
        </div>
        {user ? (
          <div className="flex gap-x-2">
            <div className="flex flex-wrap gap-x-2 items-center">
              <UserRound />
              <p className="leading-7">{user.nombre}</p>
            </div>
            <Separator orientation="vertical" className="bg-foreground" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon-sm" className="cursor-pointer my-auto">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Hola {user.nombre}</DropdownMenuLabel>
                <DropdownMenuItem
                  className="justify-between cursor-pointer"
                  onSelect={() => navigate("/profile", { replace: true })}
                >
                  Perfil
                  <UserRoundCog />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="justify-between cursor-pointer"
                  onSelect={() => navigate("/animals", { replace: true })}
                >
                  Publicar un animal
                  <Cat />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="justify-between cursor-pointer"
                  onSelect={logout}
                >
                  Cerrar sesión
                  <LogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <ButtonGroup>
            <Button className="hover:bg-accent active:scale-95" asChild>
              <Link to="/signup">Registrarse</Link>
            </Button>
            <ButtonGroupSeparator />
            <Button className="hover:bg-accent active:scale-95" asChild>
              <Link to="/login">Iniciar sesión</Link>
            </Button>
          </ButtonGroup>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors />
    </>
  );
};

export default Layout;
