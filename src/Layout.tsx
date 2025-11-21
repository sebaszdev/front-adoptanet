import { Outlet } from "react-router";
import Footer from "@/components/Footer";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./components/ui/button-group";
import { Link } from "react-router";

const Layout = () => {
  return (
    <>
    <header className="flex justify-around py-3 border-b-4">
        <Button variant="ghost" className="hover:bg-background hover:text-foreground">
          <Link to="/">AdoptaNet</Link>
        </Button>
        <Navbar />
        <ButtonGroup>
          <Button>
            <Link to="/signup">Registrarse</Link>
          </Button>
          <ButtonGroupSeparator />
          <Button>
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
