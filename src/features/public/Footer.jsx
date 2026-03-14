
import { Github, Twitter, Linkedin, Heart, Terminal, Cpu, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pb-12 pt-8 px-4">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md border border-hudc-light/30 rounded-xl shadow-lg shadow-hudc-blue/5 overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="bg-[#F8FAFC]/80 border-b border-hudc-light/20 px-4 py-2 flex justify-between items-center">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60 animate-[pulse_2s_infinite]"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60 animate-[pulse_2s_infinite_200ms]"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-green-400/60 animate-[pulse_2s_infinite_400ms]"></div>
          </div>
          <span className="font-mono text-[9px] text-hudc-dark/40 uppercase tracking-[0.3em]">system_shutdown_final</span>
        </div>

        <div className="p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4 group">
                <div className="bg-hudc-blue p-1.5 rounded-[4px] shadow-sm">
                  <Cpu className="text-white w-4 h-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-bold tracking-tighter text-hudc-dark uppercase">HUDC</span>
                  <span className="text-[8px] font-mono text-hudc-blue font-bold tracking-[0.2em] uppercase">Haramaya_Univ</span>
                </div>
              </div>
              <p className="text-xs font-mono text-hudc-dark/60 max-w-sm mb-6 leading-relaxed">
                // mission: empowering the next generation of developers through stories and builds.
              </p>
              <div className="flex gap-3">
                {[Twitter, Github, Linkedin].map((Icon, idx) => (
                  <a key={idx} href="#" className="p-2 border border-hudc-light/20 rounded-[4px] text-hudc-dark/40 hover:text-hudc-blue hover:border-hudc-blue/50 transition-all bg-white/50">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-mono font-bold text-hudc-blue mb-5 uppercase text-[10px] tracking-[0.2em] flex items-center gap-1">
                <ChevronRight className="w-3 h-3" /> index
              </h4>
              <ul className="space-y-3">
                {['Suggest_Guest', 'Showcase_Build', 'Project_Gallery'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().split('_')[0]}`} className="text-[11px] font-mono text-hudc-dark/60 hover:text-hudc-blue transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Internal Access */}
            
          </div>

          {/* Bottom Bar: Metadata */}
          <div className="pt-8 border-t border-hudc-light/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] font-mono text-hudc-dark/30 uppercase tracking-[0.2em]">
              © {currentYear} HUDC_COMMUNITY // v1.0.4-STABLE
            </p>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-hudc-blue/5 border border-hudc-blue/10 rounded-[4px]">
              <p className="text-[9px] font-mono text-hudc-dark/60 flex items-center gap-1">
                ENGINEERED WITH <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> BY 
                <span className="text-hudc-blue font-bold ml-1 uppercase">HUDC_Devs</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}