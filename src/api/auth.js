import { supabase } from '../lib/supabaseClient.js';

export const loginAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};


export const logoutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};