import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryBar from "@/components/CategoryBar";
import ProductSection from "@/components/ProductSection";
import { PromoBanner, BenefitsSection } from "@/components/PromoBanner";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const Index = () => {
  const bestSellers = products.filter((p) => p.isBestSeller);
  const perfumes = products.filter((p) => p.category === "Perfumes").slice(0, 4);
  const phones = products.filter((p) => p.category === "Celulares").slice(0, 4);
  const electronics = products.filter((p) => p.category === "Eletrônicos").slice(0, 4);
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <PromoBanner />
        <CategoryBar />
        <ProductSection title="Mais Vendidos" subtitle="Os favoritos dos nossos clientes" products={bestSellers} link="/produtos" />
        <div className="bg-secondary py-1">
          <ProductSection title="Perfumes em Destaque" subtitle="As fragrâncias mais desejadas" products={perfumes} link="/produtos?cat=Perfumes" />
        </div>
        <ProductSection title="Celulares em Destaque" subtitle="Os smartphones mais procurados" products={phones} link="/produtos?cat=Celulares" />
        <div className="bg-secondary py-1">
          <ProductSection title="Eletrônicos em Destaque" subtitle="Tecnologia de ponta" products={electronics} link="/produtos?cat=Eletrônicos" />
        </div>
        <ProductSection title="Lançamentos" subtitle="Acabaram de chegar" products={newProducts} link="/produtos?cat=Lançamentos" />
        <BenefitsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
