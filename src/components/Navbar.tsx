import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/useAuth";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="rounded-lg">
            <Link to="/catalog">Catalogo</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {isAuthenticated && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="rounded-lg">
              <Link to="/animals">Animales</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
