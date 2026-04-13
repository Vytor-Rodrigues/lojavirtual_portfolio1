export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  brand: string;
  description: string;
  specs?: Record<string, string>;
  installments?: string;
}

export const products: Product[] = [
  // Perfumes
  { id: 1, name: "Bleu de Channel Eau de Parfum", category: "Perfumes", subcategory: "Masculino", price: 459.90, oldPrice: 599.90, discount: 23, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop", rating: 4.8, reviews: 342, isBestSeller: true, brand: "Channel", description: "Fragrância masculina sofisticada com notas amadeiradas.", specs: { "Volume": "100ml", "Tipo": "Eau de Parfum", "Família": "Amadeirado" }, installments: "12x de R$ 38,32" },
  { id: 2, name: "La Vie Est Belle Lancôme", category: "Perfumes", subcategory: "Feminino", price: 389.90, oldPrice: 499.90, discount: 22, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", rating: 4.9, reviews: 567, isBestSeller: true, brand: "Lancôme", description: "Perfume feminino icônico com notas de íris e baunilha.", specs: { "Volume": "75ml", "Tipo": "Eau de Parfum", "Família": "Oriental Floral" }, installments: "12x de R$ 32,49" },
  { id: 3, name: "Sauvage Dior Eau de Toilette", category: "Perfumes", subcategory: "Masculino", price: 529.90, oldPrice: 689.90, discount: 23, image: "https://images.unsplash.com/photo-1594035910387-fbd1a2b42e8e?w=400&h=400&fit=crop", rating: 4.7, reviews: 289, brand: "Dior", description: "Fragrância fresca e marcante inspirada em paisagens desérticas.", specs: { "Volume": "100ml", "Tipo": "Eau de Toilette", "Família": "Aromático" }, installments: "12x de R$ 44,16" },
  { id: 4, name: "Good Girl Carolina Herrera", category: "Perfumes", subcategory: "Feminino", price: 449.90, oldPrice: 579.90, discount: 22, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=400&fit=crop", rating: 4.8, reviews: 412, isNew: true, brand: "Carolina Herrera", description: "Perfume feminino sensual em frasco icônico.", specs: { "Volume": "80ml", "Tipo": "Eau de Parfum", "Família": "Oriental Floral" }, installments: "12x de R$ 37,49" },
  { id: 5, name: "212 VIP Men Carolina Herrera", category: "Perfumes", subcategory: "Masculino", price: 349.90, oldPrice: 459.90, discount: 24, image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=400&h=400&fit=crop", rating: 4.6, reviews: 198, brand: "Carolina Herrera", description: "Fragrância masculina vibrante para noites especiais.", specs: { "Volume": "100ml", "Tipo": "Eau de Toilette", "Família": "Amadeirado" }, installments: "12x de R$ 29,16" },
  { id: 6, name: "Coco Mademoiselle Chanel", category: "Perfumes", subcategory: "Feminino", price: 599.90, oldPrice: 749.90, discount: 20, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop", rating: 4.9, reviews: 678, isBestSeller: true, brand: "Chanel", description: "Clássico feminino com notas frescas e orientais.", specs: { "Volume": "100ml", "Tipo": "Eau de Parfum", "Família": "Oriental Fresco" }, installments: "12x de R$ 49,99" },

  // Celulares
  { id: 7, name: "iPhone 15 Pro Max 256GB", category: "Celulares", subcategory: "Apple", price: 7499.90, oldPrice: 8999.90, discount: 17, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", rating: 4.9, reviews: 1234, isBestSeller: true, brand: "Apple", description: "O iPhone mais avançado com chip A17 Pro e câmera de 48MP.", specs: { "Tela": "6.7\" OLED", "Chip": "A17 Pro", "Câmera": "48MP", "Bateria": "4422mAh" }, installments: "12x de R$ 624,99" },
  { id: 8, name: "Samsung Galaxy S24 Ultra 256GB", category: "Celulares", subcategory: "Samsung", price: 6299.90, oldPrice: 7999.90, discount: 21, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", rating: 4.8, reviews: 876, isBestSeller: true, brand: "Samsung", description: "Galaxy AI integrada com S Pen e câmera de 200MP.", specs: { "Tela": "6.8\" AMOLED", "Chip": "Snapdragon 8 Gen 3", "Câmera": "200MP", "Bateria": "5000mAh" }, installments: "12x de R$ 524,99" },
  { id: 9, name: "Xiaomi 14 Ultra 512GB", category: "Celulares", subcategory: "Xiaomi", price: 4999.90, oldPrice: 5999.90, discount: 17, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", rating: 4.7, reviews: 345, isNew: true, brand: "Xiaomi", description: "Câmera Leica profissional em um smartphone premium.", specs: { "Tela": "6.73\" AMOLED", "Chip": "Snapdragon 8 Gen 3", "Câmera": "50MP Leica", "Bateria": "5300mAh" }, installments: "12x de R$ 416,66" },
  { id: 10, name: "Motorola Edge 50 Pro 256GB", category: "Celulares", subcategory: "Motorola", price: 2799.90, oldPrice: 3499.90, discount: 20, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", rating: 4.5, reviews: 234, brand: "Motorola", description: "Design premium com câmera de 50MP e carregamento rápido.", specs: { "Tela": "6.7\" pOLED", "Chip": "Snapdragon 7 Gen 3", "Câmera": "50MP", "Bateria": "4500mAh" }, installments: "12x de R$ 233,33" },

  // Eletrônicos
  { id: 11, name: "AirPods Pro 2ª Geração", category: "Eletrônicos", subcategory: "Fones", price: 1799.90, oldPrice: 2299.90, discount: 22, image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop", rating: 4.8, reviews: 2345, isBestSeller: true, brand: "Apple", description: "Cancelamento de ruído ativo e áudio adaptativo.", specs: { "Tipo": "In-ear", "Cancelamento": "Ativo", "Bateria": "6h + 30h estojo", "Conexão": "Bluetooth 5.3" }, installments: "12x de R$ 149,99" },
  { id: 12, name: "Samsung Galaxy Watch 6 Classic", category: "Eletrônicos", subcategory: "Smartwatch", price: 1899.90, oldPrice: 2499.90, discount: 24, image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", rating: 4.6, reviews: 567, brand: "Samsung", description: "Smartwatch premium com bisel giratório e monitoramento avançado.", specs: { "Tela": "1.47\" AMOLED", "OS": "Wear OS", "Bateria": "590mAh", "Resistência": "5ATM" }, installments: "12x de R$ 158,33" },
  { id: 13, name: "JBL Charge 5 Caixa de Som", category: "Eletrônicos", subcategory: "Caixas de Som", price: 899.90, oldPrice: 1199.90, discount: 25, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", rating: 4.7, reviews: 1890, brand: "JBL", description: "Som potente e portátil com bateria de 20 horas.", specs: { "Potência": "40W", "Bateria": "20h", "Resistência": "IP67", "Bluetooth": "5.1" }, installments: "12x de R$ 74,99" },
  { id: 14, name: "iPad Air M2 256GB", category: "Eletrônicos", subcategory: "Tablets", price: 5499.90, oldPrice: 6499.90, discount: 15, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", rating: 4.9, reviews: 789, isNew: true, brand: "Apple", description: "Desempenho profissional com chip M2 e tela Liquid Retina.", specs: { "Tela": "11\" Liquid Retina", "Chip": "M2", "Armazenamento": "256GB", "Câmera": "12MP" }, installments: "12x de R$ 458,33" },
  { id: 15, name: "Sony WH-1000XM5 Headphone", category: "Eletrônicos", subcategory: "Fones", price: 1999.90, oldPrice: 2599.90, discount: 23, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop", rating: 4.8, reviews: 1456, brand: "Sony", description: "O melhor cancelamento de ruído do mercado com 30h de bateria.", specs: { "Tipo": "Over-ear", "Cancelamento": "Ativo Premium", "Bateria": "30h", "Conexão": "Bluetooth 5.2" }, installments: "12x de R$ 166,66" },
  { id: 16, name: "MacBook Air M3 256GB", category: "Eletrônicos", subcategory: "Notebooks", price: 9499.90, oldPrice: 10999.90, discount: 14, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", rating: 4.9, reviews: 567, isNew: true, brand: "Apple", description: "O notebook mais fino e leve com chip M3.", specs: { "Tela": "13.6\" Liquid Retina", "Chip": "M3", "RAM": "8GB", "SSD": "256GB" }, installments: "12x de R$ 791,66" },
];

export const categories = [
  { name: "Perfumes", icon: "💎", count: 342 },
  { name: "Celulares", icon: "📱", count: 156 },
  { name: "Eletrônicos", icon: "🎧", count: 478 },
  { name: "Acessórios", icon: "⌚", count: 234 },
  { name: "Ofertas", icon: "🔥", count: 89 },
  { name: "Lançamentos", icon: "✨", count: 45 },
];

export const brands = ["Apple", "Samsung", "Xiaomi", "Motorola", "Sony", "JBL", "Chanel", "Dior", "Lancôme", "Carolina Herrera"];
