import { Outlet } from "react-router";
import Footer from "@/components/Footer";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./components/ui/button-group";
import { Link } from "react-router";
import logo from "@/assets/logo.png";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const Layout = () => {
  return (
    <>
      <header className="flex justify-around py-3 border-b-4">
        <Link to="/">
          <Avatar>
            <AvatarImage src={logo} alt="Logo de AdoptaNet" />
            <AvatarFallback>AdoptaNet</AvatarFallback>
          </Avatar>
        </Link>
        <Navbar />
        <ButtonGroup>
          <Button className="hover:bg-accent">
            <Link to="/signup">Registrarse</Link>
          </Button>
          <ButtonGroupSeparator />
          <Button className="hover:bg-accent">
            <Link to="/login">Iniciar sesión</Link>
          </Button>
        </ButtonGroup>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
