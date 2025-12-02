import React from 'react';
import { Shield, MessageSquare, Image, BookOpen, Menu, X } from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setCurrentView, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full md:w-auto ${
        currentView === view
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView(View.HOME)}>
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="text-white" size={24} />
              </div>
              <span className="ml-3 text-xl font-bold text-slate-800">КиберЩит</span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
              <NavItem view={View.HOME} icon={Shield} label="Главная" />
              <NavItem view={View.CHAT} icon={MessageSquare} label="Консультант" />
              <NavItem view={View.ANALYZER} icon={Image} label="Анализ фото" />
              <NavItem view={View.KNOWLEDGE} icon={BookOpen} label="База знаний" />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-800 p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 shadow-lg absolute w-full">
             <div className="flex flex-col space-y-2">
              <NavItem view={View.HOME} icon={Shield} label="Главная" />
              <NavItem view={View.CHAT} icon={MessageSquare} label="Консультант" />
              <NavItem view={View.ANALYZER} icon={Image} label="Анализ фото" />
              <NavItem view={View.KNOWLEDGE} icon={BookOpen} label="База знаний" />
             </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">КиберЩит © {new Date().getFullYear()}</p>
          <p className="text-sm">
            Важно: Данный сервис использует искусственный интеллект. Ответы носят рекомендательный характер. 
            В случае финансовых потерь немедленно обратитесь в банк и полицию.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;