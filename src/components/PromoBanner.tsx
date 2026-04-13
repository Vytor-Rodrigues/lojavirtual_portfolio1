import { motion } from "framer-motion";
import { Truck, CreditCard, Shield, Headphones, Percent, Zap } from "lucide-react";

const promos = [
  { icon: Truck, title: "Frete Grátis", desc: "Acima de R$ 299" },
  { icon: CreditCard, title: "12x Sem Juros", desc: "Em todos os produtos" },
  { icon: Percent, title: "Pix com 10% Off", desc: "Desconto à vista" },
  { icon: Zap, title: "Entrega Rápida", desc: "Receba em até 48h" },
];

const benefits = [
  { icon: Shield, title: "Compra Segura", desc: "Seus dados protegidos" },
  { icon: Headphones, title: "Atendimento", desc: "Suporte especializado" },
  { icon: Truck, title: "Entrega Rápida", desc: "Para todo o Brasil" },
  { icon: CreditCard, title: "Produtos Selecionados", desc: "Qualidade garantida" },
];

export const PromoBanner = () => (
  <section className="py-6 bg-secondary">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {promos.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 md:p-4"
          >
            <p.icon className="w-6 h-6 md:w-8 md:h-8 text-accent flex-shrink-0" />
            <div>
              <p className="text-xs md:text-sm font-semibold">{p.title}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const BenefitsSection = () => (
  <section className="py-10 md:py-16 border-t border-border">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
              <b.icon className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-sm font-semibold mb-1">{b.title}</h3>
            <p className="text-xs text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
