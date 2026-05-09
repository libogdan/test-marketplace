import { LogIn, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button.tsx";
import { Container } from "@/shared/ui";
import { SearchBar } from "@/widgets/search-bar";

export const Header = () => {
  return (
    <header className="bg-neutral-200">
      <Container className="p-4">
        <div className="flex items-stretch gap-4">
          <div>
            <Button asChild className="text-md h-full px-8">
              <Link to="/products">Все товары</Link>
            </Button>
          </div>

          <SearchBar />

          <div className="flex items-stretch gap-4">
            <Button className="aspect-square h-full" asChild>
              <Link to="/auth/signin">
                <LogIn />
              </Link>
            </Button>
            <Button className="aspect-square h-full" asChild>
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
