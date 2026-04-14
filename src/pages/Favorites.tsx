import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useShop } from "@/context/shop-context";

const Favorites = () => {
  const { favoriteIds, addToCart } = useShop();
  const favoriteProducts = products.filter((product) => favoriteIds.includes(product.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6 md:py-10">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Página Inicial / Favoritos</p>
              <h1 className="text-2xl md:text-3xl font-bold font-display">Favoritos</h1>
              <p className="text-sm text-muted-foreground mt-2">
                {favoriteProducts.length} {favoriteProducts.length === 1 ? "produto salvo" : "produtos salvos"}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm">
              <Heart className="w-4 h-4 text-promo fill-promo" />
              Seus itens favoritos
            </div>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/50 p-10 md:p-16 text-center">
              <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nenhum favorito por enquanto</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Salve os produtos que você gostou para encontrá-los aqui depois.
              </p>
              <Link to="/produtos" className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity">
                Explorar produtos
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {favoriteProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              <div className="rounded-2xl bg-secondary p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="font-semibold">Leve tudo de uma vez</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Adicione todos os seus favoritos ao carrinho com um clique.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => favoriteProducts.forEach((product) => addToCart(product.id))}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Adicionar favoritos ao carrinho
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
