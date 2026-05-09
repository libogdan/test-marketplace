import { Search } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

export const SearchBar = () => {
  return (
    <div className="flex flex-1 items-stretch gap-2 rounded-[12px] bg-black p-2">
      <Input className="bg-white outline-0" />

      <Button variant="secondary" size="icon-lg" className="rounded-lg">
        <Search />
      </Button>
    </div>
  );
};
