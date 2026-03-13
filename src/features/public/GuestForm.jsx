
import { User, MessageSquare, Link, Mail, Terminal, Lock, Unlock, Phone, Send, Linkedin } from 'lucide-react';

export default function GuestForm({ isOpen }) {
  // Common Status Indicator Component 
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
      <div className="max-w-3xl mx-auto px-4 relative">
        <div className="text-center p-12 bg-white border border-hudc-light/30 rounded-sm shadow-sm relative">
          <StatusIndicator open={false} />
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 border border-red-100 rounded-sm mb-4">
            <Lock className="text-red-500 w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-hudc-dark font-sans uppercase tracking-tight">Suggestions_Paused</h3>
          <p className="text-sm font-mono text-hudc-dark/50 mt-2 italic">
            // current_status: locked_by_admin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Section Header */}
      <div className="mb-10 flex items-center justify-between border-b border-hudc-light/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-hudc-dark font-sans">
            <span className="text-hudc-blue font-mono font-normal mr-2">{'>'}</span>
            Suggest a Guest
          </h2>
          <p className="text-sm font-mono text-hudc-dark/60 mt-1">Know a dev who should join the podcast?</p>
        </div>
        <Terminal className="text-hudc-light/40 w-5 h-5 hidden sm:block" />
      </div>

      <div className="relative">
        <StatusIndicator open={true} />

        <form className="bg-white border border-hudc-light/20 p-6 md:p-10 rounded-sm shadow-sm space-y-6">
          
          {/* Row 1: Name and Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest">
                Guest_Name *
              </label>
              <input 
                type="text" 
                placeholder="e.g. Dr. Elias"
                className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue outline-none transition-all font-sans text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest">
                Professional_Role
              </label>
              <input 
                type="text" 
                placeholder="e.g. AI Researcher / Lead Dev"
                className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue outline-none transition-all font-sans text-sm"
              />
            </div>
          </div>

          {/* Row 2: Telegram and Phone (New Contact Matrix) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest flex items-center gap-2">
                <Send className="w-3 h-3 text-sky-500" /> Telegram_Handle
              </label>
              <input 
                type="text" 
                placeholder="@username"
                className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue outline-none transition-all font-sans text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest flex items-center gap-2">
                <Phone className="w-3 h-3 text-green-500" /> Phone_Number
              </label>
              <input 
                type="text" 
                placeholder="+251..."
                className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue outline-none transition-all font-sans text-sm"
              />
            </div>
          </div>

          {/* Row 3: Reference Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest flex items-center gap-2">
                <Linkedin className="w-3 h-3 text-blue-600" /> LinkedIn_Profile
              </label>
              <input 
                type="url" 
                placeholder="https://linkedin.com/..."
                className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue outline-none transition-all font-sans text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest flex items-center gap-2">
                <Link className="w-3 h-3 text-hudc-dark/40" /> Portfolio_or_GitHub
              </label>
              <input 
                type="url" 
                placeholder="https://github.com/..."
                className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue outline-none transition-all font-sans text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[11px] font-bold text-hudc-blue uppercase tracking-widest">
              Rationale *
            </label>
            <textarea 
              rows="4"
              placeholder="Why is their story valuable to the community?"
              className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/20 focus:border-hudc-blue outline-none transition-all resize-none font-sans text-sm"
              required
            ></textarea>
          </div>

          <div className="flex items-center gap-3 p-3 bg-hudc-bg/20 border border-hudc-light/10 rounded-sm">
            <input 
              type="checkbox" 
              id="anonymous"
              className="w-4 h-4 accent-hudc-blue cursor-pointer"
            />
            <label htmlFor="anonymous" className="font-mono text-[11px] text-hudc-dark/70 cursor-pointer uppercase tracking-tight">
              Enable_Anonymous_Submission
            </label>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-hudc-blue text-white rounded-sm font-mono text-sm font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all border-b-4 border-black/20 active:border-b-0 active:translate-y-0.5"
          >
            {'>'} push --suggestion
          </button>
        </form>
      </div>
    </div>
  );
}