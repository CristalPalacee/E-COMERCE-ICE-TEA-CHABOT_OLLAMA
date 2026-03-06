'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { updateProduct } from "./action"
import { Pencil } from "lucide-react"




interface Produk {
     image: string;
    id: number;
    name: string;
    price: number;
    category: string;
    createdAt: Date
}
export default function EditProductDialog({ product }: { product: Produk }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu Es Teh</DialogTitle>
        </DialogHeader>
        <form action={async (formData) => {
          await updateProduct(formData);
          setOpen(false);
        }} className="space-y-4">
          <input type="hidden" name="id" value={product.id} />
          <Input name="name" defaultValue={product.name} placeholder="Nama" />
          <Input name="price" type="number" defaultValue={product.price} placeholder="Harga" />
          <Input name="image" defaultValue={product.image} placeholder="URL Gambar" />
          <select name="category" defaultValue={product.category} className="w-full border p-2 rounded-md">
            <option value="Original">Original</option>
            <option value="Fruit Tea">Fruit Tea</option>
            <option value="Milk Tea">Milk Tea</option>
          </select>
          <Button type="submit" className="w-full bg-blue-600">Simpan Perubahan</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}