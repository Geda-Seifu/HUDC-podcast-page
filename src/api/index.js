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


export const uploadScreenshots = async (files) => {
  const uploadPromises = files.map(async (file) => {
    // Create a unique path: folder/timestamp-filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('project_screenshots') // Make sure this bucket exists!
      .upload(filePath, file);

    if (error) throw error;

    // Get the Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project_screenshots')
      .getPublicUrl(filePath);

    return publicUrl;
  });

  return Promise.all(uploadPromises);
};