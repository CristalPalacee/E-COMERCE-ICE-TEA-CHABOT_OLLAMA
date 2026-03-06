'use client'; // Penting!

import { useCart } from "@/lib/store"; // Sesuaikan path-nya
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Plus } from "lucide-react";

// Interface untuk props (data dari Prisma)
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductList({ products }: { products: Product[] }) {
  const addItem = useCart((state) => state.addItem);

  return (
     <>
          {products.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-none shadow-none hover:shadow-2xl hover:shadow-teal-100 transition-all duration-300 rounded-3xl bg-slate-50/50">
              <CardHeader className="p-0 relative">
                <div className="overflow-hidden h-64">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <CardTitle className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                  {item.name}
                </CardTitle>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <span className="text-xl font-black text-teal-700">{item.price}</span>
                <Button onClick={() => addItem({...item, quantity: 1})} size="icon" className="rounded-full bg-teal-600 hover:bg-teal-700 shadow-md">
                  <Plus className="h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </>
  );
}