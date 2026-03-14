
import { useState } from 'react';
import { Menu, X, Terminal, Cpu, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import LoginPage from '../../features/public/LoginPage';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Suggest_Guest', href: '#suggest' },
    { name: 'Showcase_Project', href: '#showcase' },
    { name: 'Build_Gallery', href: '#gallery' },
  ];

  return (
    // Outer wrapper handles the positioning
    <div className="fixed top-4 w-full z-50 px-4">
      <nav className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md border border-hudc-light/30 rounded-xl shadow-lg shadow-hudc-blue/5">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2.5 group cursor-pointer">
              <div className="bg-hudc-blue p-1.5 rounded-sm shadow-sm group-hover:rotate-12 transition-transform">
                <Cpu className="text-white w-4 h-4" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tighter text-hudc-dark uppercase font-sans">
                  HUDC
                </span>
                <span className="text-[8px] font-mono text-hudc-blue font-bold tracking-[0.2em] uppercase">
                  Haramaya_Univ
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-mono font-bold text-hudc-dark/70 hover:text-hudc-blue transition-colors uppercase tracking-tight relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-hudc-blue transition-all group-hover:w-full"></span>
                </a>
              ))}
              
              <div className="h-4 w-px bg-hudc-light/30 mx-1"></div>
              
              <Link
                to="/login"
                className="bg-hudc-dark text-white px-3 py-1.5 rounded-sm font-mono text-[10px] font-bold hover:bg-hudc-blue transition-all flex items-center gap-2 border-b-2 border-black/20 active:border-b-0 active:translate-y-px"
              >
                <Terminal className="w-3 h-3" />
                SUDO_LOGIN
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-hudc-dark p-2 hover:bg-hudc-bg rounded-lg transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer (Inside the floating container) */}
        {isOpen && (
          <div className="md:hidden border-t border-hudc-light/20 p-4 space-y-3 bg-white/90 rounded-b-xl animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-xs font-mono font-bold text-hudc-dark uppercase px-2 py-1"
              >
                {link.name}
                <ChevronRight className="w-4 h-4 text-hudc-blue" />
              </a>
            ))}
            <Link
            to="/login"
            className="w-full bg-hudc-blue text-white py-2.5 rounded-sm font-mono text-xs font-bold flex items-center justify-center gap-2 mt-2">
              <Terminal className="w-4 h-4" /> SUDO_LOGIN
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}