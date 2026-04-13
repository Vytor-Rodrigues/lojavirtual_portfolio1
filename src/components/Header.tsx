import { useState } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Perfumes", href: "/produtos?cat=Perfumes", sub: ["Masculino", "Feminino", "Unissex", "Kits"] },
  { label: "Celulares", href: "/produtos?cat=Celulares", sub: ["Apple", "Samsung", "Xiaomi", "Motorola"] },
  { label: "Eletrônicos", href: "/produtos?cat=Eletrônicos", sub: ["Fones", "Smartwatch", "Tablets", "Notebooks", "Caixas de Som"] },
  { label: "Acessórios", href: "/produtos?cat=Acessórios" },
  { label: "Ofertas", href: "/produtos?cat=Ofertas" },
  { label: "Lançamentos", href: "/produtos?cat=Lançamentos" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-topbar text-topbar-foreground text-xs py-2">
        <div className="container flex items-center justify-center gap-6">
          <span>🚚 <strong>Frete grátis</strong> acima de R$ 299</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">💳 Até <strong>12x sem juros</strong></span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">🔥 <strong>Pix com 10% off</strong></span>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex items-center justify-between py-3 gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            <span className="font-display">Sua Logo</span>
          </h1>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="O que você está procurando?"
              className="w-full h-10 pl-4 pr-10 rounded-full border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link to="#" className="hidden sm:flex p-2 hover:bg-secondary rounded-full transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <Link to="#" className="hidden sm:flex p-2 hover:bg-secondary rounded-full transition-colors relative">
            <Heart className="w-5 h-5" />
          </Link>
          <Link to="#" className="p-2 hover:bg-secondary rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t border-border overflow-hidden">
            <div className="container py-3">
              <div className="relative">
                <input type="text" placeholder="Buscar produtos..." className="w-full h-10 pl-4 pr-10 rounded-full border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop nav */}
      <nav className="hidden md:block border-t border-border">
        <div className="container flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="flex items-center gap-1 px-4 py-3 text-sm font-medium hover:text-accent transition-colors"
              >
                {item.label}
                {item.sub && <ChevronDown className="w-3 h-3" />}
              </Link>
              {item.sub && activeDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 bg-background border border-border rounded-lg shadow-lg py-2 min-w-[180px] z-50"
                >
                  {item.sub.map((sub) => (
                    <Link key={sub} to={`${item.href}&sub=${sub}`} className="block px-4 py-2 text-sm hover:bg-secondary hover:text-accent transition-colors">
                      {sub}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden border-t border-border overflow-hidden bg-background"
          >
            <div className="py-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className="flex items-center justify-between px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
                    onClick={() => !item.sub && setMobileOpen(false)}
                  >
                    {item.label}
                    {item.sub && <ChevronDown className="w-4 h-4" />}
                  </Link>
                </div>
              ))}
              <div className="border-t border-border mt-2 pt-2 px-6 flex gap-4">
                <Link to="#" className="flex items-center gap-2 py-2 text-sm"><User className="w-4 h-4" /> Minha Conta</Link>
                <Link to="#" className="flex items-center gap-2 py-2 text-sm"><Heart className="w-4 h-4" /> Favoritos</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
