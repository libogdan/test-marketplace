import { Home, LogIn, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button.tsx";
import { Container } from "@/shared/ui";
import { SearchBar } from "@/widgets/search-bar";

export const Header = () => {
  return (
    <header className="bg-neutral-200">
      <Container className="p-4">
        <div className="flex items-stretch gap-4">
          <div className="flex gap-2">
            <Button className="h-full px-4" asChild>
              <Link to="/">
                <Home />
              </Link>
            </Button>

            <Button asChild className="text-md h-full px-8">
              <Link to="/products">Все товары</Link>
            </Button>
          </div>

          <SearchBar />

          <div className="flex items-stretch gap-2">
            <Button className="h-full px-4" asChild>
              <Link to="/auth/signin">
                <LogIn />
              </Link>
            </Button>
            <Button className="h-full px-4" asChild>
              <Link to="/cart">
                <ShoppingCart />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
