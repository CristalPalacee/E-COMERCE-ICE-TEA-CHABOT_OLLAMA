'use client'

import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      <Button 
        variant={activeCategory === "All" ? "default" : "outline"}
        onClick={() => onCategoryChange("All")}
        className="rounded-full"
      >
        Semua
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={activeCategory === cat ? "default" : "outline"}
          onClick={() => onCategoryChange(cat)}
          className="rounded-full whitespace-nowrap"
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}