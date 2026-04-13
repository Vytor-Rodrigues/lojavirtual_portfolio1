import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

interface Props {
  title: string;
  subtitle?: string;
  products: Product[];
  link?: string;
}

const ProductSection = ({ title, subtitle, products, link }: Props) => (
  <section className="py-8 md:py-12">
    <div className="container">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {link && (
          <Link to={link} className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductSection;
