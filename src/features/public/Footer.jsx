// import { Mic2, Github, Twitter, Linkedin, Heart } from 'lucide-react';

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-white border-t border-hudc-light/20 pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
//           {/* Brand Column */}
//           <div className="md:col-span-2">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="bg-hudc-blue p-1.5 rounded-lg">
//                 <Mic2 className="text-white w-5 h-5" />
//               </div>
//               <span className="text-xl font-bold tracking-tight text-hudc-dark">
//                 HUDC <span className="text-hudc-blue">Podcast</span>
//               </span>
//             </div>
//             <p className="text-hudc-dark/60 max-w-sm mb-6 leading-relaxed">
//               Empowering the next generation of developers through stories, 
//               projects, and community-driven insights. Join the conversation.
//             </p>
//             <div className="flex gap-4">
//               <a href="#" className="p-2 bg-hudc-bg rounded-full text-hudc-dark/60 hover:text-hudc-blue hover:bg-hudc-blue/10 transition-all">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="p-2 bg-hudc-bg rounded-full text-hudc-dark/60 hover:text-hudc-blue hover:bg-hudc-blue/10 transition-all">
//                 <Github className="w-5 h-5" />
//               </a>
//               <a href="#" className="p-2 bg-hudc-bg rounded-full text-hudc-dark/60 hover:text-hudc-blue hover:bg-hudc-blue/10 transition-all">
//                 <Linkedin className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-bold text-hudc-dark mb-4 uppercase text-xs tracking-widest">Platform</h4>
//             <ul className="space-y-3">
//               <li><a href="#suggest" className="text-sm text-hudc-dark/60 hover:text-hudc-blue transition-colors">Suggest Guest</a></li>
//               <li><a href="#showcase" className="text-sm text-hudc-dark/60 hover:text-hudc-blue transition-colors">Showcase Project</a></li>
//               <li><a href="#gallery" className="text-sm text-hudc-dark/60 hover:text-hudc-blue transition-colors">Community Gallery</a></li>
//             </ul>
//           </div>

//           {/* Admin/Legal */}
//           <div>
//             <h4 className="font-bold text-hudc-dark mb-4 uppercase text-xs tracking-widest">Admin</h4>
//             <ul className="space-y-3">
//               <li><a href="/admin" className="text-sm text-hudc-dark/60 hover:text-hudc-blue transition-colors font-medium">Dashboard Access</a></li>
//               <li><a href="#" className="text-sm text-hudc-dark/60 hover:text-hudc-blue transition-colors">Privacy Policy</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-8 border-t border-hudc-light/10 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-xs text-hudc-dark/40 font-medium">
//             © {currentYear} HUDC Community. All rights reserved.
//           </p>
//           <p className="text-xs text-hudc-dark/40 flex items-center gap-1 font-medium">
//             Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by 
//             <span className="text-hudc-blue font-bold ml-1">Harry & HUDC Devs</span>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// import { Mic2, Github, Twitter, Linkedin, Heart, Terminal, Cpu } from 'lucide-react';

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-white border-t border-hudc-light/30 pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
//           {/* Brand Column */}
//           <div className="md:col-span-2">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="bg-hudc-blue p-1.5 rounded-[2px]">
//                 <Mic2 className="text-white w-5 h-5" />
//               </div>
//               <span className="text-xl font-bold tracking-tighter text-hudc-dark uppercase font-sans">
//                 HUDC_<span className="text-hudc-blue">PODCAST</span>
//               </span>
//             </div>
//             <p className="text-sm font-mono text-hudc-dark/60 max-w-sm mb-6 leading-relaxed">
//               // mission: empowering the next generation of developers through stories, 
//               projects, and community-driven builds.
//             </p>
//             <div className="flex gap-2">
//               <a href="#" className="p-2 border border-hudc-light/30 rounded-[2px] text-hudc-dark/40 hover:text-hudc-blue hover:border-hudc-blue/50 transition-all">
//                 <Twitter className="w-4 h-4" />
//               </a>
//               <a href="#" className="p-2 border border-hudc-light/30 rounded-[2px] text-hudc-dark/40 hover:text-hudc-blue hover:border-hudc-blue/50 transition-all">
//                 <Github className="w-4 h-4" />
//               </a>
//               <a href="#" className="p-2 border border-hudc-light/30 rounded-[2px] text-hudc-dark/40 hover:text-hudc-blue hover:border-hudc-blue/50 transition-all">
//                 <Linkedin className="w-4 h-4" />
//               </a>
//             </div>
//           </div>

//           {/* Platform Links */}
//           <div>
//             <h4 className="font-mono font-bold text-hudc-blue mb-5 uppercase text-[10px] tracking-[0.2em]">
//               {'>'} index_platform
//             </h4>
//             <ul className="space-y-3">
//               <li><a href="#suggest" className="text-xs font-mono text-hudc-dark/60 hover:text-hudc-blue transition-colors flex items-center gap-2">
//                 <span className="opacity-0 group-hover:opacity-100 transition-opacity">/</span>Suggest_Guest
//               </a></li>
//               <li><a href="#showcase" className="text-xs font-mono text-hudc-dark/60 hover:text-hudc-blue transition-colors flex items-center gap-2">
//                 Showcase_Build
//               </a></li>
//               <li><a href="#gallery" className="text-xs font-mono text-hudc-dark/60 hover:text-hudc-blue transition-colors flex items-center gap-2">
//                 Project_Gallery
//               </a></li>
//             </ul>
//           </div>

//           {/* Internal Access */}
//           <div>
//             <h4 className="font-mono font-bold text-hudc-blue mb-5 uppercase text-[10px] tracking-[0.2em]">
//               {'>'} sudo_access
//             </h4>
//             <ul className="space-y-3">
//               <li>
//                 <a href="/admin" className="text-xs font-mono text-hudc-blue hover:underline flex items-center gap-2">
//                    <Terminal className="w-3 h-3" /> Admin_Dashboard
//                 </a>
//               </li>
//               <li><a href="#" className="text-xs font-mono text-hudc-dark/60 hover:text-hudc-blue transition-colors">Privacy_Policy.md</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar: System Metadata */}
//         <div className="pt-8 border-t border-hudc-light/10 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="flex items-center gap-4">
//             <p className="text-[10px] font-mono text-hudc-dark/40 uppercase tracking-widest">
//               © {currentYear} HUDC_COMMUNITY // v1.0.4-STABLE
//             </p>
//           </div>
          
//           <div className="flex items-center gap-2 px-3 py-1 bg-hudc-bg/30 border border-hudc-light/20 rounded-[2px]">
//             <Cpu className="w-3 h-3 text-hudc-blue opacity-50" />
//             <p className="text-[10px] font-mono text-hudc-dark/60 flex items-center gap-1">
//               ENGINEERED_WITH <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> BY 
//               <span className="text-hudc-blue font-bold ml-1">Harry & HUDC_Devs</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

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
            <div>
              <h4 className="font-mono font-bold text-hudc-blue mb-5 uppercase text-[10px] tracking-[0.2em] flex items-center gap-1">
                <ChevronRight className="w-3 h-3" /> sudo
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/admin" className="text-[11px] font-mono text-hudc-blue font-bold flex items-center gap-2 hover:opacity-80 transition-opacity">
                     <Terminal className="w-3 h-3" /> Admin_Dashboard
                  </a>
                </li>
                <li><a href="#" className="text-[11px] font-mono text-hudc-dark/40 hover:text-hudc-blue transition-colors italic">Privacy_Policy.md</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Metadata */}
          <div className="pt-8 border-t border-hudc-light/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] font-mono text-hudc-dark/30 uppercase tracking-[0.2em]">
              © {currentYear} HUDC_COMMUNITY // v1.0.4-STABLE
            </p>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-hudc-blue/5 border border-hudc-blue/10 rounded-[4px]">
              <p className="text-[9px] font-mono text-hudc-dark/60 flex items-center gap-1">
                ENGINEERED WITH <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> BY 
                <span className="text-hudc-blue font-bold ml-1 uppercase">Harry & HUDC_Devs</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}