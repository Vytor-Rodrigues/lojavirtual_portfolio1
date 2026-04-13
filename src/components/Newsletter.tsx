import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const Newsletter = () => (
  <section className="py-12 md:py-16 bg-primary text-primary-foreground">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto text-center"
      >
        <Mail className="w-10 h-10 mx-auto mb-4 text-accent" />
        <h2 className="text-xl md:text-2xl font-bold font-display mb-2">Fique por dentro das novidades</h2>
        <p className="text-sm text-primary-foreground/70 mb-6">Receba ofertas exclusivas, lançamentos e descontos especiais direto no seu e-mail.</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="flex-1 h-12 px-4 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button className="px-6 h-12 bg-accent text-accent-foreground font-semibold rounded-full hover:opacity-90 transition-opacity text-sm">
            Inscrever
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Newsletter;
