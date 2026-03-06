


import ProductListWrapper from '../shared/ProductListWrapper';
import { prisma } from '@/lib/prisma';



const Menu = async () => {
    const products = await prisma.product.findMany()
    const categories = Array.from(new Set(products.map(p => p.category)));
  return (
   <section>
    <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
              Menu <span className="text-teal-600">Andalan</span> Kami
            </h2>
            <p className="text-slate-500 mt-2">Pilih kesegaranmu hari ini, harga mulai dari 5 ribuan!</p>
          </div>
        </div>
        </div>
          <div className="container mx-auto py-20 px-4">
             <ProductListWrapper initialProducts={products} categories={categories} />
          </div>
   </section>
  )
}

export default Menu