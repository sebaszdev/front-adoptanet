import { Outlet } from "react-router";
import Footer from "@/components/Footer";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Link } from "react-router";
import logo from "@/assets/logo.png";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useAuth } from "@/context/useAuth";
import { UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  const { user, logout } = useAuth();
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
        { user ? (
          <div className="flex gap-x-2">
            <div className="flex flex-wrap gap-x-2 content-center">
              <UserRound />
              <p className="leading-7">
                {user.nombre}
              </p>
            </div>
            <Separator orientation="vertical" className="bg-foreground" />
            <Button variant="destructive" onClick={logout} className="cursor-pointer">
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <ButtonGroup>
            <Button className="hover:bg-accent">
              <Link to="/signup">Registrarse</Link>
            </Button>
            <ButtonGroupSeparator />
            <Button className="hover:bg-accent">
              <Link to="/login">Iniciar sesión</Link>
            </Button>
          </ButtonGroup>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors/>
    </>
  );
}

export default Layout;
