import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/produto/${product.id}`} className="group block">
        <div className="relative bg-secondary rounded-xl overflow-hidden aspect-square mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={400}
            height={400}
          />
          {product.discount && (
            <span className="absolute top-3 left-3 bg-promo text-promo-foreground text-xs font-bold px-2 py-1 rounded-md">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-md">
              NOVO
            </span>
          )}
          <button className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background hover:text-promo">
            <Heart className="w-4 h-4" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-full py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <ShoppingBag className="w-4 h-4" /> Comprar
            </button>
          </div>
        </div>
        <div className="space-y-1 px-1">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-gold text-gold" />
            <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">
              R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {product.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
          {product.installments && (
            <p className="text-xs text-success">{product.installments}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
