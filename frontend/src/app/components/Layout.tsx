import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Leaf, ShoppingBag, Scissors, LayoutDashboard } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/app/components/UI';
import { motion, AnimatePresence } from 'motion/react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}

export function Navbar({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Início', icon: Leaf, id: 'home' },
    { name: 'Serviços', icon: Scissors, id: 'services' },
    { name: 'Produtos', icon: ShoppingBag, id: 'products' },
    { name: 'Admin', icon: LayoutDashboard, id: 'login' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Leaf className="text-primary w-8 h-8" />
            <span className="text-xl font-bold text-primary tracking-tight">1OrganicHair</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-foreground/70 hover:text-primary transition-colors font-medium cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center gap-2 border-l border-border pl-6 ml-2">
              <ThemeToggle />
              <Button size="sm" onClick={() => onNavigate('contact')}>Agendar</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-3 text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <item.icon size={20} />
                  {item.name}
                </button>
              ))}
              <div className="pt-4 px-3">
                <Button className="w-full" onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }}>Agendar Agora</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-primary w-6 h-6" />
              <span className="text-lg font-bold text-primary">1OrganicHair</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Especialistas em beleza natural e sustentável. Cuidamos do seu cabelo com o poder da natureza.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors cursor-pointer">Início</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-primary transition-colors cursor-pointer">Serviços</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-primary transition-colors cursor-pointer">Produtos</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Rua das Palmeiras, 123</li>
              <li>São Paulo, SP</li>
              <li>contato@1organichair.com</li>
              <li>(11) 99999-9999</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8">IG</Button>
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8">FB</Button>
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8">TW</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 1OrganicHair. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
