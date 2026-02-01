import React, { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Navbar, Footer } from '@/app/components/Layout';
import { HomePage } from '@/app/components/Home';
import { ServicesPage, ProductsPage } from '@/app/components/Pages';
import { LoginPage, AdminDashboard } from '@/app/components/Admin';
import { Toaster } from 'sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (isAdminLoggedIn && currentPage === 'admin') {
      return (
        <AdminDashboard
          onLogout={() => {
            setIsAdminLoggedIn(false);
            setCurrentPage('home');
          }}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage />;
      case 'products':
        return <ProductsPage />;
      case 'login':
        return (
          <LoginPage
            onLogin={() => {
              setIsAdminLoggedIn(true);
              setCurrentPage('admin');
            }}
          />
        );
      case 'admin':
        return <AdminDashboard onLogout={() => setIsAdminLoggedIn(false)} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Check if we should show standard layout (navbar/footer)
  const showStandardLayout = !isAdminLoggedIn || currentPage !== 'admin';

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
        <Toaster position="top-center" expand={false} richColors />

        {showStandardLayout && <Navbar onNavigate={handleNavigate} />}

        <main className="flex-grow">
          {renderPage()}
        </main>

        {showStandardLayout && <Footer onNavigate={handleNavigate} />}
      </div>
    </ThemeProvider>
  );
}
