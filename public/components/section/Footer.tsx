import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Instagram, Twitter, Facebook, MessageCircle, Send } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      {/* --- Section Testimonial (Terintegrasi) --- */}
      <div className="container mx-auto px-6 -translate-y-12">
        <div className="bg-teal-600 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 italic">Segarnya nagih, manisnya pas!</h3>
          </div>
          <div className="text-center md:text-right">
            <p className="text-teal-50 font-medium mb-4">Pesan via WhatsApp sekarang?</p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-full font-bold hover:bg-teal-50 transition-colors shadow-lg"
            >
              <MessageCircle className="h-5 w-5" /> Hubungi Admin
            </a>
          </div>
        </div>
      </div>

      {/* --- Footer Main Content --- */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black tracking-tighter text-white mb-6">
              ES TEH<span className="text-teal-400">SEGAR.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Menghadirkan kebahagiaan sederhana lewat seduhan teh tradisional terbaik setiap hari.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Beranda</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Menu Favorit</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Lokasi Outlet</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Kemitraan (Franchise)</a></li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="font-bold text-white mb-6">Jam Buka</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex justify-between"><span>Senin - Jumat:</span> <span>10.00 - 21.00</span></li>
              <li className="flex justify-between"><span>Sabtu - Minggu:</span> <span>09.00 - 22.00</span></li>
              <li className="text-teal-400 font-medium">Buka di Tanggal Merah!</li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h4 className="font-bold text-white mb-6">Ikuti Kesegaran Kami</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-teal-600 transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-teal-600 transition-all"><Twitter size={20} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-teal-600 transition-all"><Facebook size={20} /></a>
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email kamu..." 
                className="w-full bg-slate-800 border-none rounded-full py-3 px-6 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-teal-500 rounded-full text-white hover:bg-teal-400 transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-slate-800" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Es Teh Segar Indonesia. Semua Hak Dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}