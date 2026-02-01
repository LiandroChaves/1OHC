import React, { useState } from 'react';
import { Button, Card, Badge, Input, Modal, Textarea } from '@/app/components/UI';
import { Search, Scissors, Droplets, Zap, Clock, Info, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';

const services = [
  { id: 1, name: 'Corte Orgânico', category: 'Corte', price: 'R$ 180', duration: '60 min', desc: 'Corte personalizado respeitando o caimento natural dos fios e sua estrutura original.', icon: Scissors },
  { id: 2, name: 'Terapia de Argila', category: 'Tratamento', price: 'R$ 220', duration: '90 min', desc: 'Ritual Helen Seward para desintoxicação profunda com argilas orgânicas.', icon: Droplets },
  { id: 3, name: 'Coloração Vegetal', category: 'Cor', price: 'R$ 350', duration: '120 min', desc: 'Pigmentação natural à base de plantas, livre de amônia e metais pesados.', icon: Sparkles },
  { id: 4, name: 'Hidratação de Argan', category: 'Tratamento', price: 'R$ 150', duration: '45 min', desc: 'Nutrição profunda com óleo de argan orgânico prensado a frio.', icon: Droplets },
  { id: 5, name: 'Corte de Pontas', category: 'Corte', price: 'R$ 120', duration: '30 min', desc: 'Manutenção técnica para remover pontas duplas sem alterar o comprimento.', icon: Scissors },
  { id: 6, name: 'Terapia Capilar Milano', category: 'Estilo', price: 'R$ 250', duration: '75 min', desc: 'Tratamento de elite focado na saúde do couro cabeludo.', icon: Zap },
];

export function ServicesPage() {
  const [filter, setFilter] = useState('Todos');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = ['Todos', 'Corte', 'Tratamento', 'Cor', 'Estilo'];

  const filteredServices = filter === 'Todos' ? services : services.filter(s => s.category === filter);

  const handleBook = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Solicitação para ${selectedService?.name} enviada com sucesso!`);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-20 bg-background">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-4 bg-muted text-primary border-none">Menu de Rituais</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Nossos Serviços</h1>
        <p className="text-muted-foreground text-lg italic">
          Experiências exclusivas com tecnologia verde Helen Seward Milano.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={filter === cat ? 'primary' : 'outline'}
            className={`rounded-full px-8 transition-all ${filter === cat ? 'shadow-lg' : 'hover:border-primary/50'}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredServices.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full flex flex-col p-8 hover:border-primary/30 transition-all shadow-sm hover:shadow-2xl rounded-3xl group bg-card">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-muted text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <service.icon size={28} />
                </div>
                <Badge variant="outline" className="border-primary/20 text-primary/70">{service.category}</Badge>
              </div>

              <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
              <p className="text-muted-foreground leading-relaxed flex-grow mb-8">{service.desc}</p>

              <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground border-t border-border pt-6">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary/60" /> {service.duration}
                </div>
                <div className="font-bold text-primary text-2xl ml-auto">
                  {service.price}
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-bold" onClick={() => handleBook(service)}>
                Reservar Agora
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedService ? `Agendar ${selectedService.name}` : 'Agendar Ritual'}
      >
        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <Input label="Nome Completo" placeholder="Seu nome" required className="rounded-xl" />
          <Input label="WhatsApp" placeholder="(+351) 9XX XXX XXX" required className="rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Data" type="date" required className="rounded-xl" />
            <Input label="Hora" type="time" required className="rounded-xl" />
          </div>
          <Textarea label="Deseja deixar uma nota?" placeholder="Algum detalhe sobre seu cabelo?" className="rounded-xl" />
          <Button type="submit" className="w-full h-14 rounded-2xl bg-primary shadow-lg">Confirmar no WhatsApp</Button>
        </form>
      </Modal>
    </div>
  );
}

const products = [
  { id: 1, name: 'Helen Seward Organics 1/S', category: 'Shampoo', price: 'R$ 115', img: 'https://images.unsplash.com/photo-1760860991924-237b4160efbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 2, name: 'Máscara Nutritiva Bio', category: 'Tratamento', price: 'R$ 165', img: 'https://images.unsplash.com/photo-1766961631847-4793bbbf95ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 3, name: 'Óleo Reparador Milano', category: 'Finalização', price: 'R$ 140', img: 'https://images.unsplash.com/photo-1747832802200-7aaceb517e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 4, name: 'Kit Home Care Organic', category: 'Kits', price: 'R$ 380', img: 'https://images.unsplash.com/photo-1718502880900-76a0913c23ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
];

export function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-20 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 border-b border-border/50 pb-12">
        <div className="max-w-xl text-center md:text-left">
          <Badge className="bg-primary/10 text-primary border-none mb-4">Shop Online</Badge>
          <h1 className="text-5xl font-bold mb-4 text-primary">Nossa Boutique</h1>
          <p className="text-muted-foreground text-lg">
            A linha profissional Helen Seward disponível para o seu cuidado diário.
          </p>
        </div>
        <div className="w-full md:w-96">
          <Input
            className="rounded-full h-14 bg-white shadow-sm"
            placeholder="O que seu cabelo precisa hoje?"
            icon={<Search size={20} className="text-primary/50" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group overflow-hidden border-none bg-card hover:shadow-2xl transition-all duration-700 rounded-[2.5rem]">
              <div className="aspect-[4/5] overflow-hidden relative">
                <ImageWithFallback src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <Button variant="secondary" className="w-full rounded-2xl h-14 font-bold shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform" onClick={() => toast.success(`${product.name} no carrinho!`)}>
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
              <div className="p-8 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">{product.category}</span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-secondary font-black text-xl">{product.price}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-32 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border">
          <Info className="mx-auto mb-4 text-primary/20" size={48} />
          <p className="text-muted-foreground text-xl">Não encontramos esse produto em nosso jardim...</p>
        </div>
      )}
    </div>
  );
}