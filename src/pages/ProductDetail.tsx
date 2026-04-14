import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { toast } from "@/components/ui/sonner";
import { useShop } from "@/context/shop-store";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isFavorite, toggleFavorite } = useShop();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Produto não encontrado</h1>
            <Link to="/produtos" className="text-accent hover:underline">Voltar para produtos</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = [product.image, product.image, product.image];
  const favorite = isFavorite(product.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6 md:py-10">
          {/* Breadcrumb */}
          <div className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
            <Link to="/" className="hover:text-accent">Início</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/produtos?cat=${product.category}`} className="hover:text-accent">{product.category}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Gallery */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-secondary rounded-xl overflow-hidden aspect-square mb-3">
                <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" width={600} height={600} />
              </div>
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-accent" : "border-transparent"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" width={80} height={80} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h1 className="text-xl md:text-3xl font-bold font-display">{product.name}</h1>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} avaliações)</span>
              </div>

              <div className="border-t border-b border-border py-4 space-y-1">
                {product.oldPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    De R$ {product.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                )}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl md:text-3xl font-bold">
                    R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  {product.discount && (
                    <span className="text-sm font-bold text-success">-{product.discount}% OFF</span>
                  )}
                </div>
                <p className="text-sm text-success font-medium">
                  no Pix: R$ {(product.price * 0.9).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                {product.installments && (
                  <p className="text-sm text-muted-foreground">ou {product.installments}</p>
                )}
              </div>

              {/* Qty + CTA */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-secondary transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-secondary transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product.id, qty);
                    toast.success("Produto adicionado ao carrinho");
                  }}
                  className="flex-1 h-12 bg-accent text-accent-foreground font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag className="w-5 h-5" /> Comprar Agora
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const added = toggleFavorite(product.id);
                    toast.success(added ? "Produto adicionado aos favoritos" : "Produto removido dos favoritos");
                  }}
                  className={`h-12 w-12 border border-border rounded-lg flex items-center justify-center hover:bg-secondary transition-colors ${favorite ? "text-promo" : "hover:text-promo"}`}
                >
                  <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Delivery info */}
              <div className="space-y-3 py-4">
                {[
                  { icon: Truck, text: "Frete grátis para compras acima de R$ 299" },
                  { icon: Shield, text: "Garantia de 12 meses" },
                  { icon: RotateCcw, text: "7 dias para troca ou devolução" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-border">
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Specs */}
              {product.specs && (
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-2">Especificações</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="bg-secondary rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">{k}</p>
                        <p className="text-sm font-medium">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-12 md:mt-16">
              <h2 className="text-xl md:text-2xl font-bold font-display mb-6">Produtos Relacionados</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
