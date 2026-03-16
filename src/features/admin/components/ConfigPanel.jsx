import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabaseClient';
import { Settings, Eye, Lock, EyeOff, Unlock, Loader2 } from 'lucide-react';
import Loading from '../../../components/animation/Loading';

export default function ConfigPanel() {
  const queryClient = useQueryClient();

  // 1. Fetch Config from Supabase
  const { data: configs, isLoading } = useQuery({
    queryKey: ['system_config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_config')
        .select('*')
        .order('category', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  // 2. Update Mutation
  const updateConfig = useMutation({
    mutationFn: async ({ id, updates }) => {
      const { error } = await supabase
        .from('system_config')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['system_config']);
    }
  });

  if (isLoading) return <Loading text="Syncing_System_Variables..." />;

  const isUpdating = (id) => updateConfig.isPending && updateConfig.variables?.id === id;

  // Grouping configs by category for a cleaner UI
  const categories = ['projects_form', 'guest_form', 'status'];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-hudc-dark uppercase tracking-tighter font-sans">Master_Toggle_Board</h1>
        <p className="text-[10px] font-mono text-hudc-blue font-bold tracking-widest mt-1 uppercase">
          // Controlling_Public_Form_Architecture
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {categories.map((cat) => (
          <div key={cat} className="bg-white border border-hudc-light/30 rounded-sm overflow-hidden shadow-sm">
            <div className="bg-[#F8FAFC] p-4 border-b border-hudc-light/10 flex items-center justify-between">
              <h3 className="font-mono text-[10px] font-bold text-hudc-dark uppercase tracking-widest">
                {cat.replace('_', '::')}
              </h3>
              <div className="flex gap-4 text-[9px] font-mono text-hudc-dark/40 uppercase">
                {/* <span>Visibility</span>
                <span>Requirement</span> */}
              </div>
            </div>

            <div className="divide-y divide-hudc-light/10">
              {configs?.filter(c => c.category === cat).map((config) => {
                const mutating = isUpdating(config.id);
            return <div key={config.id} className="p-4 flex items-center justify-between hover:bg-hudc-bg/20 transition-colors">
                  <div>
                    {console.log(config)}
                    <p className="text-xs font-bold text-hudc-dark uppercase">{config.label}</p>
                    <p className="text-[9px] font-mono text-hudc-dark/30 tracking-tighter">{config.id}</p>
                  </div>

                  <div className="flex items-center gap-8">
                    {/* VISIBILITY TOGGLE */}
                    <button 
                        disabled={mutating}
                        onClick={() => updateConfig.mutate({ id: config.id, updates: { is_enabled: !config.is_enabled }})}
                        className={`p-2 rounded-sm transition-all border-b-2 active:border-b-0 active:translate-y-[2px] ${
                          config.is_enabled 
                            ? 'text-hudc-blue bg-hudc-blue/10 border-hudc-blue/20' 
                            : 'text-hudc-dark/20 bg-hudc-bg border-hudc-light/30'
                        } ${mutating ? 'opacity-50 cursor-wait' : 'hover:brightness-95'}`}
                      >
                        {mutating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          cat === 'status' ? (
                             config.is_enabled ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />
                          ) : (
                             config.is_enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />
                          )
                        )}
                      </button>

                      {/* REQUIREMENT TOGGLE */}
                      {cat !== 'status' && (
                        <button 
                          disabled={mutating}
                          onClick={() => updateConfig.mutate({ id: config.id, updates: { value: config.value === 'required' ? 'optional' : 'required' }})}
                          className={`px-4 py-1.5 rounded-sm font-mono text-[9px] font-bold border-2 transition-all active:translate-y-[1px] active:shadow-none ${
                            config.value === 'required' 
                              ? 'border-hudc-blue text-hudc-blue bg-white shadow-[0_2px_0_0_rgba(37,99,235,1)] active:shadow-none' 
                              : 'border-hudc-light/30 text-hudc-dark/30 bg-hudc-bg shadow-[0_2px_0_0_rgba(0,0,0,0.05)] active:shadow-none'
                          } ${mutating ? 'opacity-40' : ''}`}
                        >
                          {config.value === 'required' ? 'REQUIRED' : 'OPTIONAL'}
                        </button>)}
                  </div>
                </div>
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}