import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabaseClient';

export function useSystemConfig() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles,setSelectedFiles] = useState([])

  const { data: configs, isLoading } = useQuery({
    queryKey: ['system_config'],
    queryFn: async () => {
      const { data, error } = await supabase.from('system_config').select('*');
      if (error) throw error;
      return data;
    },
    // Keep the config in cache for 5 minutes to avoid flickering
    staleTime: 1000 * 60 * 5, 
  });

  // Helper to find specific field settings
  const getDBConfig = (id) => 
    configs?.find(c => c.id === id) || { is_enabled: false, value: 'optional' };

  return {
    configs,
    isLoading,
    isSubmitting,
    setIsSubmitting, // We return this so you can control it in your handleSubmit
    getDBConfig,
    selectedFiles,
    setSelectedFiles
  };
}