import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useShop } from "@/context/shop-store";

const formatCurrency = (value: number) => `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useShop();

  const items = cartItems
    .map((item) => {
      const product = products.find((currentProduct) => currentProduct.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 299 ? 29.9 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6 md:py-10">
          <div className="mb-8">
            <p className="text-xs text-muted-foreground mb-2">Página Inicial / Carrinho</p>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Carrinho</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {items.length} {items.length === 1 ? "item" : "itens"} no seu carrinho
            </p>
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/50 p-10 md:p-16 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Adicione produtos para visualizar os itens e finalizar sua compra.
              </p>
              <Link to="/produtos" className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity">
                Continuar comprando
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1.6fr_0.9fr] gap-8 items-start">
              <section className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <article key={product.id} className="rounded-2xl border border-border bg-background p-4 md:p-5">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to={`/produto/${product.id}`} className="w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </Link>

                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground">{product.brand}</p>
                            <Link to={`/produto/${product.id}`} className="font-semibold hover:text-accent transition-colors">
                              {product.name}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">{product.installments}</p>
                          </div>
                          <p className="text-lg font-bold">{formatCurrency(product.price)}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center border border-border rounded-lg w-fit">
                            <button type="button" onClick={() => updateCartQuantity(product.id, quantity - 1)} className="p-3 hover:bg-secondary transition-colors">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                            <button type="button" onClick={() => updateCartQuantity(product.id, quantity + 1)} className="p-3 hover:bg-secondary transition-colors">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            <p className="text-sm font-medium">
                              Subtotal: {formatCurrency(product.price * quantity)}
                            </p>
                            <button type="button" onClick={() => removeFromCart(product.id)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
                              <Trash2 className="w-4 h-4" />
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </section>

              <aside className="rounded-2xl bg-secondary p-5 md:p-6 space-y-4">
                <h2 className="text-lg font-semibold">Resumo do pedido</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span>{shipping === 0 ? "Grátis" : formatCurrency(shipping)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex items-center justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <button type="button" className="w-full h-11 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                  Finalizar compra
                </button>
                <p className="text-xs text-muted-foreground">
                  Frete grátis para compras acima de R$ 299 e parcelamento em até 12x sem juros.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
