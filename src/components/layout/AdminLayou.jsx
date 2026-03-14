import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderCode, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useAuthStore } from '../../hooks/useAuthStore';

export default function AdminLayout() {


  

  const { user } = useAuthStore(); // Get Harry's data from store
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Guest_Manager', path: '/admin/guests', icon: Users },
    { name: 'Project_Manager', path: '/admin/projects', icon: FolderCode },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-[#F1F5F9]">
      {/* 📱 MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 📟 SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-hudc-light/30 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-hudc-light/10 bg-hudc-bg/30">
          <div className="flex items-center gap-2">
            <div className="bg-hudc-blue p-1 rounded-sm">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-hudc-dark tracking-tighter uppercase font-sans">HUDC_Console</h1>
              <p className="text-[9px] font-mono text-hudc-blue font-bold">LEVEL: SUDO_ADMIN</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-sm font-mono text-xs font-bold transition-all
                ${isActive(item.path) 
                  ? 'bg-hudc-blue text-white shadow-lg shadow-hudc-blue/20 translate-x-1' 
                  : 'text-hudc-dark/60 hover:bg-hudc-bg hover:text-hudc-blue'}
              `}
            >
              <item.icon className={`w-4 h-4 ${isActive(item.path) ? 'text-white' : 'text-hudc-blue'}`} />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-hudc-light/10 bg-hudc-bg/20">
          <button 
             
            className="flex items-center gap-3 text-hudc-dark/40 font-mono text-[10px] font-bold px-4 py-2 hover:text-hudc-blue transition-all"
            onClick={handleLogout}
          >
            <LogOut className="w-3.5 h-3.5" /> EXIT_TO_PUBLIC
          </button>
        </div>
      </aside>

      {/* 🖥️ MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-hudc-light/30 flex items-center justify-between px-6 sticky top-0 z-30">
          <button 
            className="md:hidden p-2 text-hudc-dark"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-hudc-bg rounded-sm border border-hudc-light/20">
            <Cpu className="w-3 h-3 text-hudc-blue animate-pulse" />
            <span className="text-[10px] font-mono text-hudc-dark/60 uppercase">System_Healthy // Latency: 24ms</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-hudc-dark uppercase">{user?.email.split('@')[0] || "Admin"}_root</p>
              <p className="text-[9px] font-mono text-green-500 uppercase">Status: Online</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-hudc-blue/10 border border-hudc-blue/20 flex items-center justify-center text-hudc-blue font-bold text-xs">
              {user?.email.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-10 grow overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}