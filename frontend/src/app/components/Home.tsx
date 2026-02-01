import React, { useState } from 'react';
import { Button, Card, Badge, Modal, Input, Textarea } from '@/app/components/UI';
import { Leaf, ShieldCheck, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';
import banner1 from "@/assets/banner1.jpeg";
import banner2 from "@/assets/banner2-copia (2).jpeg";

const images = {
  hero: banner2,
  model: "https://images.unsplash.com/photo-1718502880900-76a0913c23ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2hpbnklMjBoYWlyJTIwd29tYW4lMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODcyOTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  products: "https://images.unsplash.com/photo-1760860991924-237b4160efbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYmVhdXR5JTIwcHJvZHVjdHMlMjBib3R0bGVzfGVufDF8fHx8MTc2OTg3Mjk4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  botanical: "https://images.unsplash.com/photo-1766961631847-4793bbbf95ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBldWNhbHlwdHVzJTIwbGVhdmVzJTIwZ3JlZW58ZW58MXx8fHwxNzY5ODcyOTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

export function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleWhatsApp = () => {
    // Substitua pelo número real da loja que está na fachada: 964 277 807
    window.open('https://wa.me/351964277807?text=Olá! Vi o site e gostaria de agendar um horário no 1OrganicHair.', '_blank');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Solicitação enviada! Vamos confirmar seu horário pelo Whats, mn.');
    setIsScheduleModalOpen(false);
  };

  const openDetail = (item: any) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-24 pb-20 bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full">
          <ImageWithFallback
            src={images.hero}
            alt="1 Organic Hair Concept Store"
            className="w-full h-auto min-h-[600px] object-cover"
          />
          {/* Overlay com a cor primária suave para dar match com o conceito */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <Badge className="mb-6 py-2 px-6 text-sm bg-primary text-primary-foreground border-none shadow-xl uppercase tracking-widest">
                🍃 Bio-Estética Capilar
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6 leading-tight">
                Beleza que respeita a sua <span className="text-accent italic">essência</span>.
              </h1>

              <p className="text-lg md:text-xl text-white/90 drop-shadow-md mb-10 leading-relaxed">
                No <b>1 Organic</b>, unimos a sofisticação de Milão com o poder dos ingredientes botânicos. Um refúgio natural para o seu cabelo no coração da cidade.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground border-none shadow-lg transition-all" onClick={() => onNavigate('services')}>
                  Nossos Rituais <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20"
                  onClick={() => setIsScheduleModalOpen(true)}
                >
                  Reservar Horário
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - Usando a paleta suave */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Leaf, title: '100% Orgânico', desc: 'Produtos Helen Seward Milano, livres de químicos agressivos.' },
            { icon: ShieldCheck, title: 'Cruelty Free', desc: 'Ética e respeito em cada tratamento capilar.' },
            { icon: Sparkles, title: 'Brilho Botânico', desc: 'A força das plantas para restaurar a fibra do fio.' },
            { icon: Heart, title: 'Soul Care', desc: 'Mais que um corte, uma experiência de autocuidado.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-card rounded-3xl border border-border/40 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section - Onde o amadeirado brilha */}
      <section className="bg-secondary/10 py-24 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <ImageWithFallback src={images.model} alt="Beleza Orgânica" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-background p-4 rounded-[2rem] shadow-2xl hidden md:block border border-border">
                <ImageWithFallback src={images.botanical} alt="Ingredientes Naturais" className="w-full h-full object-cover rounded-xl" />
              </div>
            </div>
            <div>
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Conceito 1 Organic</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">O equilíbrio perfeito entre <span className="text-primary italic">Natureza & Estilo.</span></h2>
              <div className="space-y-8">
                {[
                  { title: 'Terapias Helen Seward', desc: 'Utilizamos a linha Milano para garantir resultados de alta performance com ingredientes naturais selecionados.' },
                  { title: 'Ambiente Sustentável', desc: 'Nossa loja reflete nosso compromisso: materiais naturais e um clima de paz para sua transformação.' },
                  { title: 'Atendimento Personalizado', desc: 'Cada cabelo é um ecossistema. Analisamos e tratamos sua saúde capilar de forma única.' }
                ].map((point, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{point.title}</h4>
                      <p className="text-muted-foreground">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-12 rounded-full px-10 bg-secondary hover:bg-secondary/90 text-white shadow-lg" onClick={() => setIsScheduleModalOpen(true)}>
                Conhecer o Espaço
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Impacto Visual */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-8">Sinta a força do orgânico.</h2>
            <p className="text-primary-foreground/90 text-xl mb-12 font-light">
              Dê ao seu cabelo o cuidado que ele merece. Sem químicos agressivos, apenas a pureza da natureza.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full px-12 h-16 text-lg font-bold shadow-2xl hover:scale-105 transition-all bg-white text-primary border-none">
                Agendar Agora
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg border-primary-foreground/40 text-primary-foreground hover:bg-white/10" onClick={handleWhatsApp}>
                Chamar no Whats
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modais mantendo a identidade */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Agendar Ritual"
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-6 py-4">
          <Input label="Seu Nome" placeholder="Como quer ser chamado(a)?" required className="rounded-xl border-border" />
          <Input label="WhatsApp" placeholder="Seu contato para confirmarmos" required className="rounded-xl border-border" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Melhor Dia" type="date" required className="rounded-xl" />
            <Input label="Horário" type="time" required className="rounded-xl" />
          </div>
          <Textarea label="Deseja algum serviço específico?" placeholder="Ex: Coloração vegetal, Corte, Hidratação..." className="rounded-xl border-border" />
          <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-lg shadow-lg">Confirmar Solicitação</Button>
        </form>
      </Modal>
    </div>
  );
}