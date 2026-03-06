import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { addProduct, deleteProduct, updateProduct } from './action';
import EditProductDialog from './EditProductDialog';
import { Trash2 } from 'lucide-react';
import { logoutAdmin } from '../auth/actions';

const page = async () => {
 const products = await prisma.product.findMany({orderBy: {id: 'desc'}})
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Admin - Tambah Menu Es Teh</h1>

      <form action={addProduct} className="flex gap-4 mb-10">
        <Input
          name="name"
          placeholder="Nama Es Teh (Contoh: Es Teh Leci)"
          required
        />
        <Input
          name="price"
          type="number"
          placeholder="Harga (Contoh: 5000)"
          required
        />
        <Input name="image" placeholder="URL Gambar" required />
        <select name="category" className="border p-2 rounded-md bg-white">
          <option value="Original">Original</option>
          <option value="Fruit Tea">Fruit Tea</option>
          <option value="Milk Tea">Milk Tea</option>
          <option value="Special">Special</option>
        </select>
        <Button type="submit">Tambah</Button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Harga</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="p-4 text-sm text-gray-500">{p.category}</td>
                <td className="p-4 font-bold">Rp {p.price.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    {/* TOMBOL EDIT */}
                    <EditProductDialog product={p} />
                    
                    {/* TOMBOL DELETE (Client Action with Confirmation) */}
                    <form action={async () => {
                      'use server'
                      await deleteProduct(p.id)
                    }}>
                       <Button variant="destructive" size="icon">
                         <Trash2 className="h-4 w-4" />
                       </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
                      <form className='py-12' action={logoutAdmin}>
          <Button variant="default" className="text-primary-foreground ">
            Keluar
          </Button>
        </form>
    </div>
  );
};

export default page;
