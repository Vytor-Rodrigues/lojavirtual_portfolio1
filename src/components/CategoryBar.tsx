import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const CategoryBar = () => (
  <section className="py-8 md:py-12">
    <div className="container">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/produtos?cat=${cat.name}`}
              className="flex flex-col items-center gap-2 p-4 md:p-6 bg-secondary rounded-xl hover:bg-accent/10 hover:border-accent border border-transparent transition-all group"
            >
              <span className="text-2xl md:text-3xl">{cat.icon}</span>
              <span className="text-xs md:text-sm font-medium text-center group-hover:text-accent transition-colors">{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryBar;
