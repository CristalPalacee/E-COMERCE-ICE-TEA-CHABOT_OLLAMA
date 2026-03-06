'use client'

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProdukCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}
export default function ProductListWrapper({ initialProducts, categories }: { initialProducts: Product[], categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? initialProducts 
    : initialProducts.filter((p: Product) => p.category === selectedCategory);

  return (
    <>
      <CategoryFilter 
        categories={categories} 
        activeCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product: Product) => (
          <ProductList key={product.id}  products={[product]} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-400 py-10">Belum ada produk di kategori ini.</p>
      )}
    </>
  );
}