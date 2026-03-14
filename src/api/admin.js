import { supabase } from '../lib/supabaseClient';

// --- FETCHERS ---
export const fetchAllProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select()
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const fetchAllGuests = async () => {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

// --- MUTATIONS ---

// Toggle Project Approval
export const updateProjectApproval = async (id, status) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ is_approved: status })
    .eq('id', id)
    .select()
    .single(); // Get the single updated record back

  if (error) throw error;
  return data;
};

// Update Guest Status
export const updateGuestStatus = async (id, statusValue) => {
  const { data, error } = await supabase
    .from('guests')
    .update({ status: statusValue }) // Ensure key matches your DB column name
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete permanently
export const deleteEntry = async (table, id) => {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true; 
};

// Fetch all toggles (guest_form, project_form)
export const fetchSystemConfig = async () => {
  const { data, error } = await supabase.from('system_config').select('*');
  if (error) throw error;
  return data;
};

// Update a specific toggle
export const updateConfig = async ({ id, is_enabled }) => {
  const { data, error } = await supabase
    .from('system_config')
    .update({ is_enabled })
    .eq('id', id);
  if (error) throw error;
  return data;
};