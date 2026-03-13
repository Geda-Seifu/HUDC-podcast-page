// import { Github, ExternalLink, Code2, User2 } from 'lucide-react';

// // Mock data to visualize the UI before connecting Supabase
// const MOCK_PROJECTS = [
//   {
//     id: 1,
//     name: "DevTask Manager",
//     description: "A productivity tool for developers using the Pomodoro technique and task tracking.",
//     tech_stack: ["React", "Tailwind", "Firebase"],
//     github_link: "#",
//     creator_name: "Harry",
//     status: "approved"
//   },
//   {
//     id: 2,
//     name: "HUDC ThemeWave",
//     description: "Extract color palettes from images and generate Telegram themes automatically.",
//     tech_stack: ["Node.js", "Canvas API", "Express"],
//     github_link: "#",
//     creator_name: "DevStudio",
//     status: "approved"
//   },
//   {
//     id: 3,
//     name: "CryptoPulse",
//     description: "Real-time cryptocurrency price tracker with interactive charts and alerts.",
//     tech_stack: ["Next.js", "Chart.js", "CoinGecko API"],
//     github_link: "#",
//     creator_name: "AlexCode",
//     status: "approved"
//   }
// ];

// export default function ProjectGallery() {
//   return (
//     <div className="max-w-7xl mx-auto px-4">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-hudc-dark">
//           Community <span className="text-hudc-blue">Showcase</span>
//         </h2>
//         <p className="text-hudc-dark/60 mt-3 max-w-xl mx-auto">
//           Explore the innovative projects built by HUDC members. Get inspired and share your own work.
//         </p>
//       </div>

//       {/* Responsive Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {MOCK_PROJECTS.map((project) => (
//           <div 
//             key={project.id} 
//             className="group bg-white rounded-2xl border border-hudc-light/10 overflow-hidden hover:shadow-2xl hover:shadow-hudc-blue/10 transition-all hover:-translate-y-1 flex flex-col"
//           >
//             {/* Project Header (Visual Placeholder) */}
//             <div className="h-3 bg-hudc-blue w-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
//             <div className="p-6 flex flex-col grow">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="bg-hudc-bg p-2 rounded-lg">
//                   <Code2 className="w-5 h-5 text-hudc-blue" />
//                 </div>
//                 <div className="flex gap-2">
//                   <a href={project.github_link} className="p-2 text-hudc-dark/40 hover:text-hudc-blue transition-colors">
//                     <Github className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="p-2 text-hudc-dark/40 hover:text-hudc-blue transition-colors">
//                     <ExternalLink className="w-5 h-5" />
//                   </a>
//                 </div>
//               </div>

//               <h3 className="text-xl font-bold text-hudc-dark mb-2 group-hover:text-hudc-blue transition-colors">
//                 {project.name}
//               </h3>
              
//               <p className="text-sm text-hudc-dark/70 line-clamp-2 mb-6">
//                 {project.description}
//               </p>

//               {/* Tech Stack Tags */}
//               <div className="flex flex-wrap gap-2 mt-auto mb-6">
//                 {project.tech_stack.map((tech) => (
//                   <span 
//                     key={tech} 
//                     className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-hudc-bg text-hudc-blue rounded-md border border-hudc-blue/5"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>

//               {/* Creator Info */}
//               <div className="pt-4 border-t border-hudc-light/10 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-6 h-6 rounded-full bg-hudc-blue/10 flex items-center justify-center">
//                     <User2 className="w-3 h-3 text-hudc-blue" />
//                   </div>
//                   <span className="text-xs font-semibold text-hudc-dark/60">{project.creator_name}</span>
//                 </div>
//                 <button className="text-xs font-bold text-hudc-blue hover:underline">
//                   Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Empty State / Call to Action */}
//       <div className="mt-16 text-center">
//         <p className="text-hudc-dark/40 text-sm">
//           Don't see your project? <a href="#showcase" className="text-hudc-blue font-bold hover:underline">Submit it here</a>
//         </p>
//       </div>
//     </div>
//   );
// }

import { Github, ExternalLink, Code2, User2, Terminal, ChevronDown } from 'lucide-react';

const MOCK_PROJECTS = [
  {
    id: 1,
    name: "DevTask_Manager",
    description: "A productivity tool for developers using the Pomodoro technique and task tracking.",
    tech_stack: ["React", "Tailwind", "Firebase"],
    github_link: "#",
    creator_name: "Harry",
    status: "approved"
  },
  {
    id: 2,
    name: "HUDC_ThemeWave",
    description: "Extract color palettes from images and generate Telegram themes automatically.",
    tech_stack: ["Node.js", "Canvas_API", "Express"],
    github_link: "#",
    creator_name: "DevStudio",
    status: "approved"
  },
  {
    id: 3,
    name: "CryptoPulse_Tracker",
    description: "Real-time cryptocurrency price tracker with interactive charts and alerts.",
    tech_stack: ["Next.js", "Chart.js", "CoinGecko_API"],
    github_link: "#",
    creator_name: "AlexCode",
    status: "approved"
  }
];

export default function ProjectGallery() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Tech-Focused Header */}
      <div className="mb-12 border-l-4 border-hudc-blue pl-6">
        <h2 className="text-3xl md:text-4xl font-bold text-hudc-dark font-sans uppercase tracking-tighter">
          Community_<span className="text-hudc-blue">Showcase</span>
        </h2>
        <p className="text-sm font-mono text-hudc-dark/60 mt-2 max-w-xl">
          // index_community_builds: exploring innovative solutions from HUDC members.
        </p>
      </div>

      {/* Structured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className="group bg-white border border-hudc-light/30 rounded-[4px] hover:border-hudc-blue/50 transition-all flex flex-col shadow-sm hover:shadow-md"
          >
            <div className="p-6 flex flex-col grow">
              {/* Header: Project Name & Repo Links */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-hudc-bg p-1.5 rounded-[2px] border border-hudc-light/20">
                    <Code2 className="w-4 h-4 text-hudc-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-hudc-dark group-hover:text-hudc-blue transition-colors font-sans">
                    {project.name}
                  </h3>
                </div>
                <div className="flex gap-1">
                  <a href={project.github_link} className="p-1.5 text-hudc-dark/40 hover:text-hudc-blue transition-colors border border-transparent hover:border-hudc-light/30 rounded-[2px]">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-1.5 text-hudc-dark/40 hover:text-hudc-blue transition-colors border border-transparent hover:border-hudc-light/30 rounded-[2px]">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <p className="text-xs font-mono text-hudc-dark/70 line-clamp-2 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack: Clean Labels */}
              <div className="flex flex-wrap gap-2 mt-auto mb-6">
                {project.tech_stack.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-[9px] font-mono font-bold uppercase tracking-tight px-2 py-0.5 bg-hudc-bg/50 text-hudc-blue border border-hudc-light/20 rounded-[2px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Creator Metadata */}
              <div className="pt-4 border-t border-hudc-light/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User2 className="w-3 h-3 text-hudc-dark/40" />
                  <span className="text-[10px] font-mono font-bold text-hudc-dark/50 uppercase">
                    dev: {project.creator_name}
                  </span>
                </div>
                <button className="text-[10px] font-mono font-bold text-hudc-blue uppercase hover:underline flex items-center gap-1">
                  view_docs <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* LOAD MORE / NAVIGATION */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <button className="flex items-center gap-3 px-8 py-3 bg-white border border-hudc-light/30 text-hudc-dark font-mono text-xs font-bold rounded-[4px] hover:bg-hudc-bg transition-all border-b-4 border-black/10 active:border-b-0 active:translate-y-[2px]">
          <Terminal className="w-4 h-4 text-hudc-blue" />
          {'>'} fetch_more_builds
        </button>
        
        <p className="text-[10px] font-mono text-hudc-dark/40 uppercase tracking-widest">
          Showing 3 of 24 verified_entries
        </p>
      </div>
    </div>
  );
}