import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Rocket, Github, Layers, User, Send, Info, 
  Terminal, Lock, Unlock, FileText, Video, 
  Twitter, Disc, Tag 
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { submitProject } from '../../api/index.js';
import StatusIndicator from './components/StatusIndicator.jsx';
import ModeIndicator from './components/ModeIndicator.jsx';
import { useSystemConfig } from './hooks/useSystemConfig.js';
import LockedState from './components/LockState.jsx';

// 1. THE BLUEPRINT: Project Field Metadata
const PROJECT_FIELDS = [
  { id: 'field_project_title', name: 'title', label: 'Project_Title', placeholder: 'e.g. HUDC Dashboard', icon: Rocket, component: 'input', type: 'text' },
  { id: 'field_project_author', name: 'author', label: 'Author_Name', placeholder: 'e.g. Harry_root', icon: User, component: 'input', type: 'text' },
  { id: 'field_project_github', name: 'github_link', label: 'Source_Code_URL', placeholder: 'https://github.com/...', icon: Github, component: 'input', type: 'url' },
  { id: 'field_project_demo', name: 'demo_link', label: 'Live_Demo_URL', placeholder: 'https://demo.vercel.app', icon: Send, component: 'input', type: 'url' },
  { id: 'field_project_tech_stack', name: 'tech_stack', label: 'Environment_Stack', placeholder: 'React, Node, Tailwind (comma separated)', icon: Layers, component: 'input', type: 'text' },
  { id: 'field_project_type', name: 'project_type', label: 'Project_Category', placeholder: 'e.g. Web App, Mobile, Tool', icon: Tag, component: 'input', type: 'text' },
  { id: 'field_project_video', name: 'video_demo_url', label: 'Walkthrough_Video', placeholder: 'https://youtube.com/...', icon: Video, component: 'input', type: 'url' },
  { id: 'field_project_twitter', name: 'twitter_link', label: 'X_Twitter_Link', placeholder: 'https://x.com/...', icon: Twitter, component: 'input', type: 'url' },
  { id: 'field_project_discord', name: 'discord_handle', label: 'Discord_Handle', placeholder: 'username#0000', icon: Disc, component: 'input', type: 'text' },
  { id: 'field_project_description', name: 'description', label: 'Documentation_Summary', placeholder: 'What problem does this project solve?', icon: FileText, component: 'textarea' },
];

export default function ProjectForm({ isOpen }) {
  const {isLoading,isSubmitting, setIsSubmitting, getDBConfig} = useSystemConfig();

 

  // const { data: configs, isLoading } = useQuery({
  //   queryKey: ['system_config'],
  //   queryFn: async () => {
  //     const { data } = await supabase.from('system_config').select('*');
  //     return data;
  //   }
  // });

  // const getDBConfig = (id) => configs?.find(c => c.id === id) || { is_enabled: false, value: 'optional' };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData.entries());

    // Logic: Convert comma-separated string to Array for the database
    const projectData = {
      ...rawData,
      tech_stack: rawData.tech_stack ? rawData.tech_stack.split(',').map(s => s.trim()) : [],
      is_approved: false // Default for manual review
    };

    try {
      await submitProject(projectData);
      e.target.reset();
      alert("PROJECT_UPLOADED: Awaiting_Verification");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <div className="p-20 text-center font-mono text-[10px] animate-pulse">// SYNCING_SHOWCASE_CONFIG...</div>;
  if (!isOpen) return <LockedState head={"Showcase Offline"} text={"// status: submissions_suspended_by_admin"}/>;

  return (
    <div className="max-w-4xl mx-auto px-4 animate-in fade-in duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-hudc-light/20 pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-hudc-dark font-sans flex items-center gap-3">
            <Rocket className="text-hudc-blue w-6 h-6" /> Showcase_Your_Build
          </h2>
          <p className="text-sm font-mono text-hudc-dark/60 mt-1">Built something cool? Share it with the community.</p>
        </div>
        <ModeIndicator />
      </header>

      <div className="relative">
        <StatusIndicator open={true} />
        
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-sm border border-hudc-light/20 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {PROJECT_FIELDS.map((field) => {
              const dbRule = getDBConfig(field.id);
              if (!dbRule.is_enabled) return null;

              const isRequired = dbRule.value === 'required';
              const isFullWidth = field.component === 'textarea';
              const InputTag = field.component === 'textarea' ? 'textarea' : 'input';

              return (
                <div key={field.id} className={`space-y-2 ${isFullWidth ? 'md:col-span-2' : ''}`}>
                  <label className="font-mono text-[10px] font-bold text-hudc-blue uppercase tracking-widest flex items-center gap-2">
                    {field.icon && <field.icon className="w-3.5 h-3.5 opacity-60" />}
                    {field.label} {isRequired && <span className="text-red-500">*</span>}
                  </label>
                  
                  <InputTag
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={isRequired}
                    rows={field.component === 'textarea' ? 5 : undefined}
                    className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/10 focus:border-hudc-blue focus:bg-white outline-none transition-all font-sans text-sm placeholder:text-hudc-dark/20"
                  />
                </div>
              );
            })}
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="group w-full py-4 bg-hudc-blue text-white rounded-sm font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all border-b-4 border-black/20 active:border-b-0 active:translate-y-1"
            >
              {isSubmitting ? 'UPLOADING_ARCHIVE...' : '> execute_upload'}
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <p className="text-center text-[9px] font-mono text-hudc-dark/40 mt-4 flex items-center justify-center gap-2 uppercase tracking-tighter">
              <Info className="w-3 h-3" /> // note: projects undergo manual verification before indexing.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

// Internal Sub-Components




