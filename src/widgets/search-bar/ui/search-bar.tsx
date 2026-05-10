import { Search } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import { useNavigate } from "react-router";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    if (!searchValue) return;
    navigate("/products?search=" + searchValue);
  };
  return (
    <div className="flex flex-1 items-stretch gap-2 rounded-[12px] bg-black p-2">
      <Input
        className="bg-white outline-0"
        placeholder="Поиск"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Button
        variant="secondary"
        size="icon-lg"
        className="rounded-lg"
        onClick={submit}
      >
        <Search />
      </Button>
    </div>
  );
};
