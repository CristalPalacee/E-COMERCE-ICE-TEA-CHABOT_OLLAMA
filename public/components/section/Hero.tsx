import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Leaf, Droplets } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      {/* Ornamen Latar Belakang (Tailwind v4 Glow Effect) */}
      <div className="absolute top-0 -z-10 h-full w-full">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-amber-100/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-teal-50/50 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Kolom Teks */}
          <div className="flex flex-col items-start space-y-6">
            <Badge variant="outline" className="border-teal-600 text-teal-700 px-4 py-1 rounded-full bg-teal-50/50">
              🍃 100% Daun Teh Pilihan
            </Badge>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 lg:text-7xl">
              Kesegaran <span className="text-teal-600 italic">Asli</span> <br /> 
              di Setiap Tegukan.
            </h1>
            
            <p className="max-w-md text-lg text-slate-600 leading-relaxed">
              Nikmati perpaduan sempurna antara teh kualitas premium, es kristal murni, dan pemanis alami yang siap melepas dahagamu seketika.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 shadow-lg shadow-teal-200 transition-all hover:scale-105">
                <ShoppingCart className="mr-2 h-5 w-5" /> Pesan Sekarang
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-slate-200 hover:bg-slate-50">
                Lihat Menu
              </Button>
            </div>

            {/* Fitur Singkat */}
            <div className="flex gap-6 pt-4 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-teal-500" /> Seduhan Segar
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-teal-500" /> Tanpa Pengawet
              </div>
            </div>
          </div>

          {/* Kolom Gambar/Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative h-[400px] w-[300px] md:h-[500px] md:w-[400px] rounded-3xl bg-amber-50 shadow-2xl overflow-hidden border-8 border-white transform rotate-3 transition-transform hover:rotate-0 duration-500">
              {/* Placeholder untuk gambar Es Teh */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-amber-200/50 to-transparent">
                 <span className="text-amber-800 font-bold opacity-30 text-8xl -rotate-12 select-none">ES TEH</span>
              </div>
              {/* Tambahkan Image Next.js di sini */}
              <img 
                src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800" 
                alt="Es Teh Segar" 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 md:left-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  ★
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Best Seller</p>
                  <p className="text-xs text-slate-500">Es Teh Jasmine 5.0/5</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}