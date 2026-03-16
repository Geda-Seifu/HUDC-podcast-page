import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  User, Terminal, Send, Phone, Linkedin, Link, 
  Twitter, MessageSquare, Calendar, Disc, 
  Lock, Unlock, Terminal as TerminalIcon 
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { submitGuest } from "../../api/index";
import LockedState from './components/LockState';
import FormHeader from './components/FormHeader';

// 1. THE BLUEPRINT: Centralized UI Metadata
const GUEST_FIELDS = [
  { id: 'field_guest_name', name: 'name', label: 'Guest_Full_Name', placeholder: 'e.g. Harry Moi', icon: User, type: 'text', component: 'input' },
  { id: 'field_guest_role', name: 'role', label: 'Professional_Role', placeholder: 'e.g. Fullstack Developer', icon: Terminal, type: 'text', component: 'input' },
  { id: 'field_guest_telegram', name: 'telegram', label: 'Telegram_Handle', placeholder: '@username', icon: Send, type: 'text', component: 'input' },
  { id: 'field_guest_phone', name: 'phone', label: 'Phone_Number', placeholder: '+251...', icon: Phone, type: 'tel', component: 'input' },
  { id: 'field_guest_linkedin', name: 'linkedin', label: 'LinkedIn_Profile', placeholder: 'https://linkedin.com/in/...', icon: Linkedin, type: 'url', component: 'input' },
  { id: 'field_guest_twitter', name: 'twitter', label: 'Twitter_X_Handle', placeholder: 'https://x.com/...', icon: Twitter, type: 'url', component: 'input' },
  { id: 'field_guest_discord', name: 'discord_handle', label: 'Discord_Handle', placeholder: 'username#0000', icon: Disc, type: 'text', component: 'input' },
  { id: 'field_guest_portfolio', name: 'portfolio', label: 'Portfolio_Website', placeholder: 'https://...', icon: Link, type: 'url', component: 'input' },
  { id: 'field_guest_availability', name: 'availability', label: 'Meeting_Availability', placeholder: 'e.g. Weekends, 4PM-6PM', icon: Calendar, type: 'text', component: 'input' },
  { id: 'field_guest_topics', name: 'preferred_topics', label: 'Suggested_Topics', placeholder: 'What should we talk about?', icon: MessageSquare, component: 'textarea' },
  { id: 'field_guest_rationale', name: 'rationale', label: 'Rationale_Why_This_Guest', placeholder: 'Why is their story valuable?', icon: TerminalIcon, component: 'textarea' },
];

export default function GuestForm({ isOpen }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with your system_config table
  const { data: configs, isLoading } = useQuery({
    queryKey: ['system_config'],
    queryFn: async () => {
      const { data } = await supabase.from('system_config').select('*');
      return data;
    }
  });

  const getDBConfig = (id) => configs?.find(c => c.id === id) || { is_enabled: false, value: 'optional' };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const guestData = Object.fromEntries(formData.entries());
    console.log(guestData)
    // Special handling for checkbox
    guestData.is_anonymous = formData.get('is_anonymous') === 'on';

    try {
      await submitGuest(guestData);
      e.target.reset();
      alert("SUCCESS: Manifest_Pushed");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <div className="p-20 text-center font-mono text-[10px] animate-pulse text-hudc-blue uppercase tracking-widest">// INITIALIZING_FORM_STREAMS...</div>;

  if (!isOpen) return <LockedState head={"Access Denied"} text={"// form_status: encrypted_by_root"}/>;

  return (
    <div className="max-w-4xl mx-auto px-4 animate-in fade-in duration-700">
      <FormHeader />

      <form onSubmit={handleSubmit} className="bg-white border border-hudc-light/20 p-6 md:p-10 rounded-sm shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {GUEST_FIELDS.map((field) => {
            const dbRule = getDBConfig(field.id);
            if (!dbRule.is_enabled) return null;

            const isRequired = dbRule.value === 'required';
            const isFullWidth = field.component === 'textarea';
            const InputTag = field.component === 'textarea' ? 'textarea' : 'input';

            return (
              <div key={field.id} className={`space-y-2 ${isFullWidth ? 'md:col-span-2' : ''}`}>
                <label className="font-mono text-[10px] font-bold text-hudc-blue uppercase tracking-widest flex items-center gap-2">
                  {field.icon && <field.icon className="w-3.5 h-3.5 opacity-70" />}
                  {field.label} {isRequired && <span className="text-red-500">*</span>}
                </label>
                
                <InputTag
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={isRequired}
                  rows={field.component === 'textarea' ? 4 : undefined}
                  className="w-full px-4 py-2.5 rounded-sm bg-hudc-bg/30 border border-hudc-light/10 focus:border-hudc-blue focus:bg-white outline-none transition-all font-sans text-sm placeholder:text-hudc-dark/20"
                />
              </div>
            );
          })}
        </div>

        {/* Anonymous Submission Toggle */}
        {getDBConfig('field_guest_anonymous').is_enabled && (
          <div className="flex items-center gap-3 p-4 bg-hudc-bg/20 border border-hudc-light/10 rounded-sm">
            <input type="checkbox" name="is_anonymous" id="anon" className="w-4 h-4 accent-hudc-blue cursor-pointer" />
            <label htmlFor="anon" className="font-mono text-[10px] text-hudc-dark/60 cursor-pointer uppercase font-bold">
              Enable_Anonymous_Submission
            </label>
          </div>
        )}

        <button 
          disabled={isSubmitting}
          className="w-full py-4 bg-hudc-blue text-white rounded-sm font-mono text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all border-b-4 border-black/20 active:border-b-0 active:translate-y-1"
        >
          {isSubmitting ? 'Pushing_to_System...' : '> Execute_Submit'}
        </button>
      </form>
    </div>
  );
}

