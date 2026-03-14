

import { Rocket, Github, Layers, User, Send, Info, Terminal, Lock, Unlock } from 'lucide-react';
import { submitProject } from '../../api/index.js';
import { useState } from 'react';

export default function ProjectForm({ isOpen }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);  
    const formData = new FormData(e.target);
    const projectData = {
    title: formData.get('project_name'),       
    description: formData.get('description'),  
    github_link: formData.get('source_url'),   
    author : formData.get("author")||"anonymous",
    demo_link: formData.get('demo_link') || null,
    tech_stack: formData.get('stack') 
      ? formData.get('stack').split(',').map(item => item.trim()) 
      : [],
      
    is_approved: false // Always default to false for manual review
  };

    try {
       await submitProject(projectData);
       e.target.reset(); // Clear form after successful submission
    } catch (error) {
      alert(error.message)
    }finally{
      setIsSubmitting(false);
    }
  }



  // Status Indicator Component
  const StatusIndicator = ({ open }) => (
    <div className={`absolute -top-3 -left-3 flex items-center gap-2 px-2 py-1 bg-white border ${open ? 'border-green-500/50' : 'border-red-500/50'} rounded-sm shadow-sm z-10`}>
      <div className="relative flex h-3 w-3">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${open ? 'bg-green-500' : 'bg-red-500'} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${open ? 'bg-green-500' : 'bg-red-500'}`}></span>
      </div>
      {open ? (
        <Unlock className="w-5 h-5 text-green-600" />
      ) : (
        <Lock className="w-5 h-5 text-red-600" />
      )}
    </div>
  );

  if (!isOpen) {
    return (
      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="bg-white border border-hudc-light/30 rounded-sm p-12 text-center relative">
          <StatusIndicator open={false} />
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 border border-red-100 rounded-sm mb-4">
            <Lock className="text-red-500 w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-hudc-dark font-sans uppercase tracking-tight">Showcase_Offline</h3>
          <p className="text-sm font-mono text-hudc-dark/50 mt-2 italic">
            // submissions_temporarily_suspended
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Section Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-hudc-light/20 pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-hudc-dark font-sans flex items-center gap-3">
            <Rocket className="text-hudc-blue w-6 h-6" /> 
            Showcase_Your_Build
          </h2>
          <p className="text-sm font-mono text-hudc-dark/60 mt-1">Built something cool? Share it with the community.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-hudc-bg/50 border border-hudc-light/20 rounded-xs">
          <Terminal className="w-3 h-3 text-hudc-blue" />
          <span className="font-mono text-[10px] font-bold text-hudc-blue uppercase tracking-widest">
            mode: manual_review
          </span>
        </div>
      </div>

      <div className="relative">
        <StatusIndicator open={true} />
        
        <form  onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-10 rounded-sm border border-hudc-light/20 shadow-sm">
          
          {/* Left Column: Core Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest">
                Project_Name *
              </label>
              <input 
                type="text" 
                name="project_name"
                placeholder="e.g. HUDC ThemeWave"
                className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue focus:ring-0 outline-none transition-all font-sans text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest">
                Author_Name *
              </label>
              <input 
                type="text" 
                name="author"
                placeholder="e.g. John Doe or @github_handle"
                className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue focus:ring-0 outline-none transition-all font-sans text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest">
                Source_Code_URL *
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hudc-light/60" />
                <input 
                  type="url" 
                  name="source_url"
                  placeholder="https://github.com/..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue focus:ring-0 outline-none transition-all font-sans text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest">
                Environment_Stack *
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hudc-light/60" />
                <input 
                  type="text" 
                  name="stack"
                  placeholder="e.g. React, Supabase, Tailwind"
                  className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue focus:ring-0 outline-none transition-all font-sans text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Column: Description & Creator */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest">
                Documentation_Summary *
              </label>
              <textarea 
                rows="5"
                name="description"
                placeholder="What problem does this project solve?"
                className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue focus:ring-0 outline-none transition-all resize-none font-sans text-sm"
                required
              ></textarea>
            </div>


          </div>

          <div className="space-y-2">
  <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest">
    Live_Demo_URL (Optional)
  </label>
  <div className="relative">
    <Rocket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hudc-light/60" />
    <input 
      type="url" 
      name="demo_link"
      placeholder="https://your-demo.vercel.app"
      className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue focus:ring-0 outline-none transition-all font-sans text-sm"

    />
  </div>
</div>

          {/* Full Width Footer Section */}
          <div className="md:col-span-2 pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="group w-full py-3.5 bg-hudc-blue text-white rounded-sm font-mono text-sm font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all border-b-4 border-black/20 active:border-b-0 active:translate-y-xs"
            >
              {isSubmitting ? 'uploading...' : '> upload project'}
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <p className="text-center text-[10px] font-mono text-hudc-dark/40 mt-4 flex items-center justify-center gap-2 uppercase tracking-tight">
              <Info className="w-3 h-3" /> // note: projects undergo manual verification before indexing.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}