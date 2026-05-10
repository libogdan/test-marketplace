import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FilterX, Search } from "lucide-react";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export const Filters = () => {
  const [category, setCategory] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const submit = () => {
    const query = new URLSearchParams();

    if (category) {
      query.set("category", category);
    }
    if (priceFrom) {
      query.set("price_from", priceFrom);
    }
    if (priceTo) {
      query.set("price_to", priceTo);
    }
    if (search) {
      query.set("search", search);
    }
    setSearchParams(query);
  };

  const handleClear = () => {
    setCategory("");
    setPriceFrom("");
    setPriceTo("");
    setSearch("");

    setSearchParams({});
  };

  useEffect(() => {
    const [categoryParam, searchParam, priceFrom, priceTo] = [
      searchParams.get("category"),
      searchParams.get("search"),
      searchParams.get("price_from"),
      searchParams.get("price_to"),
    ];

    if (categoryParam) {
      setCategory(categoryParam);
    }
    if (searchParam) {
      setSearch(searchParam);
    }
    if (priceFrom) {
      setPriceFrom(priceFrom);
    }
    if (priceTo) {
      setPriceTo(priceTo);
    }
  }, []);

  return (
    <div className="mb-4 flex gap-4">
      <Select value={category} onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-full max-w-60">
          <SelectValue placeholder="Категория" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={"Audio & Video"}>Аудио и Видео</SelectItem>
          <SelectItem value={"Computer Accessories"}>
            Компьютерные аксессуары
          </SelectItem>
          <SelectItem value={"Smart Home & Office"}>
            Умный дом и офис
          </SelectItem>
        </SelectContent>
      </Select>

      <div className="flex-1">
        <Input
          placeholder="Поиск"
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Цена от"
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
        />
        <Input
          placeholder="Цена до"
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="default" onClick={submit}>
          <Search />
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <FilterX />
        </Button>
      </div>
    </div>
  );
};
