
import { FooterSection } from "@/components/section/Footer";
import HeroSection from "@/components/section/Hero";
import Menu from "@/components/section/Menu";
import ChatWidget from "@/components/shared/ChatAi";
import ProductList from "@/components/shared/ProdukCard";
import { prisma } from "@/lib/prisma";




export default async function Page() {
return (
    <main className="container mx-auto py-10 px-4">
      <HeroSection/>
      <ChatWidget/>
      <Menu  />
    </main>
);
}