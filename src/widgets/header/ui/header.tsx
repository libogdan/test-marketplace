import { Home, LogIn, LogOut, Settings, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button.tsx";
import { logout } from "@/features/auth";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks.ts";
import { Container } from "@/shared/ui";
import { SearchBar } from "@/widgets/search-bar";

export const Header = () => {
  const { user, token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

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
            {!token && (
              <Button className="h-full px-4" asChild>
                <Link to="/auth/signin">
                  <LogIn />
                </Link>
              </Button>
            )}
            {token && user?.role === "admin" && (
              <Button className="h-full px-4" asChild>
                <Link to="/admin/products">
                  <Settings />
                </Link>
              </Button>
            )}
            {token && (
              <Button className="h-full px-4" asChild>
                <Link to="/cart">
                  <ShoppingCart />
                </Link>
              </Button>
            )}
            {token && (
              <Button
                className="h-full px-4"
                onClick={() => dispatch(logout())}
              >
                <LogOut />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
