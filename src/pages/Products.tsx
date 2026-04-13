import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, brands } from "@/data/products";

const categoryOptions = ["Todos", "Perfumes", "Celulares", "Eletrônicos", "Acessórios"];
const sortOptions = [
  { label: "Relevância", value: "relevance" },
  { label: "Menor Preço", value: "price-asc" },
  { label: "Maior Preço", value: "price-desc" },
  { label: "Lançamentos", value: "new" },
  { label: "Mais Vendidos", value: "bestseller" },
];
const priceRanges = [
  { label: "Até R$ 500", min: 0, max: 500 },
  { label: "R$ 500 - R$ 1.000", min: 500, max: 1000 },
  { label: "R$ 1.000 - R$ 3.000", min: 1000, max: 3000 },
  { label: "R$ 3.000 - R$ 5.000", min: 3000, max: 5000 },
  { label: "Acima de R$ 5.000", min: 5000, max: Infinity },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "Todos";

  const [category, setCategory] = useState(initialCat);
  const [sort, setSort] = useState("relevance");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "Todos") result = result.filter((p) => p.category === category);
    if (selectedBrands.length) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (priceRange) result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "new": result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew)); break;
      case "bestseller": result = result.filter((p) => p.isBestSeller).concat(result.filter((p) => !p.isBestSeller)); break;
    }
    return result;
  }, [category, sort, selectedBrands, priceRange]);

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
  };

  const Sidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-3">Categoria</h3>
        <div className="space-y-1">
          {categoryOptions.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${category === c ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-3">Preço</h3>
        <div className="space-y-1">
          {priceRanges.map((r) => (
            <button key={r.label} onClick={() => setPriceRange(priceRange?.min === r.min && priceRange?.max === r.max ? null : r)} className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${priceRange && priceRange.min === r.min && priceRange.max === r.max ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-3">Marca</h3>
        <div className="space-y-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary rounded-lg transition-colors">
              <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="w-4 h-4 rounded border-border accent-accent" />
              {b}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6 md:py-10">
          {/* Breadcrumb */}
          <div className="text-xs text-muted-foreground mb-4">
            Página Inicial / {category !== "Todos" ? category : "Todos os Produtos"}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl md:text-2xl font-bold font-display">
              {category !== "Todos" ? category : "Todos os Produtos"} ({filtered.length})
            </h1>
            <div className="flex items-center gap-3">
              <button onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm">
                <SlidersHorizontal className="w-4 h-4" /> Filtros
              </button>
              <div className="relative hidden md:block">
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent">
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden md:block w-56 flex-shrink-0">
              <Sidebar />
            </aside>

            {/* Mobile filters */}
            {filtersOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-background md:hidden">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="font-semibold">Filtros</h2>
                  <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm mb-2">Ordenar por</h3>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm">
                      {sortOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <Sidebar />
                </div>
              </motion.div>
            )}

            {/* Product grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-lg">Nenhum produto encontrado</p>
                  <p className="text-sm mt-2">Tente ajustar os filtros</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
