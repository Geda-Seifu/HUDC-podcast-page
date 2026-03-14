import {supabase} from "../lib/supabaseClient.js"

// --- PROJECTS ---
export const submitProject = async (projectData) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData]);
  if (error) throw error;
  return data;
};

// --- GUESTS ---
export const submitGuest = async (guestData) => {
  const { data, error } = await supabase
    .from('guests')
    .insert([guestData]);
  if (error) throw error;
  return data;
};