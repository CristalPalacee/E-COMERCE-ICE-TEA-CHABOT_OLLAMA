'use client'

import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter } from "@/components/ui/drawer";
import { ShoppingCart, Trash2 } from "lucide-react";

export function CartDrawer() {
  const { items, removeItem, clearCart } = useCart();
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-2xl bg-green-600 hover:bg-green-700">
          <ShoppingCart className="h-6 w-6 text-white" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
              {items.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Keranjang Belanja</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {items.length === 0 && <p className="text-center text-gray-500 py-10">Keranjang masih kosong...</p>}
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.quantity}x - Rp {item.price.toLocaleString()}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id )}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            {items.length > 0 && (
              <div className="pt-4 font-bold text-xl flex justify-between">
                <span>Total:</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            )}
          </div>
          <DrawerFooter>
            <Button className="w-full bg-green-600" disabled={items.length === 0}>Checkout via WhatsApp</Button>
            <Button variant="outline" onClick={clearCart}>Kosongkan</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}