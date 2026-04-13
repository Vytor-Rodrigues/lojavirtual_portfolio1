import { Link } from "react-router-dom";
import { MapPin, Phone, Mail as MailIcon, Globe } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-10 md:py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display text-lg font-bold mb-4">Sua Logo</h3>
          <p className="text-xs text-primary-foreground/60 leading-relaxed">
            Sua loja premium de perfumes, eletrônicos e celulares. Qualidade e confiança desde o primeiro clique.
          </p>
          <div className="flex gap-3 mt-4">
            {[MapPin, Phone, MailIcon, Globe].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Categorias</h4>
          <ul className="space-y-2 text-xs text-primary-foreground/60">
            {["Perfumes", "Celulares", "Eletrônicos", "Acessórios", "Ofertas", "Lançamentos"].map((c) => (
              <li key={c}><Link to={`/produtos?cat=${c}`} className="hover:text-accent transition-colors">{c}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Institucional</h4>
          <ul className="space-y-2 text-xs text-primary-foreground/60">
            {["Sobre Nós", "Política de Privacidade", "Termos de Uso", "Trocas e Devoluções", "Trabalhe Conosco"].map((c) => (
              <li key={c}><a href="#" className="hover:text-accent transition-colors">{c}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Atendimento</h4>
          <ul className="space-y-2 text-xs text-primary-foreground/60">
            <li>📧 contato@sualogo.com</li>
            <li>📞 (11) 9999-9999</li>
            <li>💬 Chat online</li>
            <li>⏰ Seg a Sex: 8h às 18h</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 py-4">
      <div className="container text-center text-xs text-primary-foreground/40">
        © 2026 Sua Logo. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
