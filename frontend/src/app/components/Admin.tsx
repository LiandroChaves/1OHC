import React, { useState } from 'react';
import { Button, Input, Card, Badge, Modal, Textarea } from '@/app/components/UI';
import {
  LayoutDashboard,
  Scissors,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  MoreVertical,
  TrendingUp,
  Package,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === '' && password === '') {
      toast.success('Acesso liberado! Bem-vindo de volta.');
      onLogin();
    } else {
      toast.error('Vish, credenciais inválidas. Dá uma conferida aí!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background relative overflow-hidden">
      {/* Detalhes de fundo para remeter à natureza */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <Card className="w-full max-w-md p-10 shadow-2xl border-primary/10 bg-card/80 backdrop-blur-sm rounded-[2rem]">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
            <LayoutDashboard className="text-primary-foreground w-10 h-10 -rotate-3" />
          </div>
          <h1 className="text-3xl font-bold text-primary">1Organic HQ</h1>
          <p className="text-muted-foreground mt-2">Gestão Natural & Eficiente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="E-mail Administrativo"
            placeholder="admin@1organichair.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
            className="rounded-xl"
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
            className="rounded-xl"
          />
          <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold bg-primary shadow-xl hover:scale-[1.02] transition-transform">
            Entrar no Painel
          </Button>
        </form>

        <div className="mt-10 pt-6 border-t border-border/50 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          Acesso Restrito • 1OrganicHair Concept
        </div>
      </Card>
    </div>
  );
}

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'service' | 'product' | 'customer'>('service');

  const stats = [
    { label: 'Faturamento', value: 'R$ 12.450', change: '+12.5%', icon: TrendingUp, color: 'text-emerald-600' },
    { label: 'Agendamentos', value: '156', change: '+8%', icon: Calendar, color: 'text-primary' },
    { label: 'Clientes Ativos', value: '42', change: '+15%', icon: Users, color: 'text-secondary' },
    { label: 'Estoque Bio', value: '5 itens', change: 'Crítico', icon: Package, color: 'text-destructive' },
  ];

  const handleNewRecord = () => {
    if (activeTab === 'services') setModalType('service');
    else if (activeTab === 'products') setModalType('product');
    else setModalType('customer');
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-muted/20">
      {/* Sidebar - Visual Bio-Tech */}
      <aside className="w-full lg:w-72 bg-card border-r border-border/50 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
            <CheckCircle2 className="text-primary-foreground w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-primary">1Organic<span className="text-foreground/50">Admin</span></span>
        </div>

        <nav className="flex flex-col gap-3">
          {[
            { id: 'overview', name: 'Dashboard', icon: LayoutDashboard },
            { id: 'services', name: 'Serviços', icon: Scissors },
            { id: 'products', name: 'Estoque Shop', icon: ShoppingBag },
            { id: 'customers', name: 'Clientes', icon: Users },
            { id: 'settings', name: 'Configurações', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-medium ${activeTab === item.id
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                }`}
            >
              <item.icon size={22} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-border/50">
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 text-destructive hover:bg-destructive/5 rounded-2xl h-12"
            onClick={onLogout}
          >
            <LogOut size={22} /> Encerrar Sessão
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-foreground tracking-tight">Painel de Controle</h1>
            <p className="text-muted-foreground text-lg mt-1 font-light">Gerenciando a beleza orgânica hoje.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-2xl px-6 h-12 border-border bg-card">Relatórios</Button>
            <Button className="rounded-2xl px-6 h-12 gap-2 bg-secondary text-white hover:bg-secondary/90 shadow-lg" onClick={handleNewRecord}>
              <Plus size={20} /> Adicionar Item
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="p-8 border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-card">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 bg-muted rounded-2xl ${stat.color}`}>
                  <stat.icon size={28} />
                </div>
                <Badge className="bg-primary/10 text-primary border-none font-bold">{stat.change}</Badge>
              </div>
              <h4 className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{stat.label}</h4>
              <p className="text-3xl font-black mt-2 text-foreground">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Table Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              {activeTab === 'overview' && 'Rituais Agendados'}
              {activeTab === 'services' && 'Catálogo de Serviços'}
              {activeTab === 'products' && 'Produtos em Loja'}
              {activeTab === 'customers' && 'Base de Membros'}
              {activeTab === 'settings' && 'Ajustes do Sistema'}
            </h2>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                placeholder="Filtrar dados..."
                className="w-full pl-12 pr-4 h-12 bg-card border border-border/50 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <Card className="overflow-hidden border-none shadow-xl rounded-[2rem] bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/50">
                    <th className="px-8 py-6 text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Detalhes</th>
                    <th className="px-8 py-6 text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Status</th>
                    <th className="px-8 py-6 text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Valor/Qtd</th>
                    <th className="px-8 py-6 text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Última Ativ.</th>
                    <th className="px-8 py-6 text-xs font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-110 transition-transform">
                            {item === 1 ? 'MA' : item === 2 ? 'JS' : 'LC'}
                          </div>
                          <div>
                            <div className="font-bold text-foreground text-lg">{item === 1 ? 'Maria Alice' : item === 2 ? 'João Silva' : 'Lucia Costa'}</div>
                            <div className="text-sm text-muted-foreground font-medium">Corte Energético + Aroma</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <Badge className={`rounded-lg border-none px-3 py-1 font-bold ${item % 2 === 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {item % 2 === 0 ? 'Aguardando' : 'Finalizado'}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 font-black text-primary">R$ 240,00</td>
                      <td className="px-8 py-6 text-sm text-muted-foreground font-medium">Hoje, 14:30</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="hover:bg-primary/10 text-primary rounded-xl"><Settings size={20} /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 rounded-xl"><MoreVertical size={20} /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Novo ${modalType === 'service' ? 'Serviço' : modalType === 'product' ? 'Produto' : 'Cliente'}`}
        >
          <form className="space-y-6 py-4" onSubmit={(e) => { e.preventDefault(); toast.success('Registro salvo com sucesso!'); setIsModalOpen(false); }}>
            <Input label="Nome Oficial" placeholder="Ex: Hidratação Profunda" required className="rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <Input label={modalType === 'service' ? 'Preço (R$)' : 'Preço de Venda'} type="number" placeholder="0,00" required className="rounded-xl" />
              <Input label={modalType === 'service' ? 'Duração (min)' : 'Qtd em Estoque'} type="number" placeholder="0" required className="rounded-xl" />
            </div>
            <Textarea label="Notas Adicionais" placeholder="Informações técnicas ou observações..." className="rounded-xl" />
            <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-lg font-bold shadow-lg mt-4">Gravar Dados</Button>
          </form>
        </Modal>
      </main>
    </div>
  );
}