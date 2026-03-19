
import { Terminal, Github, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";


function ProjectModal({ project, onClose }) {

const modalRef = useRef(null);

  useEffect(() => {
    // 1. ESC Key Listener
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    // 2. Click Outside Listener
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('mousedown', handleClickOutside);
    
    // 3. Scroll Lock
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);
  if (!project) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hudc-dark/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div ref={modalRef} className="bg-white border border-hudc-light/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl ">
        
        {/* Terminal Header */}
        <div className="sticky top-0 bg-[#F8FAFC] border-b border-hudc-light/20 px-6 py-3 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-hudc-blue" />
            <span className="font-mono text-[10px] font-bold text-hudc-dark/40 uppercase tracking-widest">
              Project_ID: {project.id.split('-')[0]} // Documentation_View
            </span>
          </div>
          <button onClick={onClose} className="text-hudc-dark/40 hover:text-red-500 font-mono text-xs uppercase font-bold transition-colors">
            close_x
          </button>
        </div>

        <div className="p-6 md:p-10">
          {/* Main Title Area */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-hudc-dark tracking-tighter uppercase italic">
              {project.title}
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] font-mono text-hudc-blue font-bold uppercase tracking-widest bg-hudc-bg px-2 py-0.5 border border-hudc-light/20">
                Author: {project.author}
              </span>
              <span className="text-[10px] font-mono text-hudc-dark/30 uppercase">
                Created: {new Date(project.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Screenshot Gallery */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-10 space-y-4">
               <p className="font-mono text-[10px] font-bold text-hudc-dark/40 uppercase tracking-widest border-b border-hudc-light/10 pb-2">
                 // visual_assets
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {project.screenshots.map((url, i) => (
                   <div key={i} className="border border-hudc-light/20 p-1 bg-hudc-bg shadow-inner group">
                     <img 
                       src={url} 
                       alt="Screenshot" 
                       className="w-full h-64 object-cover grayscale-[20%] group-hover:grayscale-0 transition-all cursor-zoom-in"
                       onClick={() => window.open(url, '_blank')}
                     />
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* Technical Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="font-mono text-[10px] font-bold text-hudc-blue uppercase mb-3">01_Overview</h4>
                <p className="text-sm text-hudc-dark/70 leading-relaxed font-sans whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-mono text-[10px] font-bold text-hudc-blue uppercase mb-3">02_Environment_Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map(tech => (
                    <span key={tech} className="text-[9px] font-mono font-bold bg-hudc-dark text-white px-2 py-1 rounded-none uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[10px] font-bold text-hudc-blue uppercase mb-3">03_Remote_Links</h4>
                <div className="flex flex-col gap-2">
                  <a href={project.github_link} target="_blank" className="flex items-center justify-between p-3 border border-hudc-light/20 text-[11px] font-mono uppercase hover:bg-hudc-bg transition-all group">
                    Source_Code <Github className="w-3 h-3 group-hover:text-hudc-blue" />
                  </a>
                  {project.demo_link && (
                    <a href={project.demo_link} target="_blank" className="flex items-center justify-between p-3 border border-hudc-light/20 text-[11px] font-mono uppercase hover:bg-hudc-bg transition-all group">
                      Live_Deployment <ExternalLink className="w-3 h-3 group-hover:text-hudc-blue" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
  document.body //tells react to directly render this component at the root level of the DOM, which is necessary for modals to break out of parent container styles and ensure proper overlay behavior
  );

}

export default ProjectModal