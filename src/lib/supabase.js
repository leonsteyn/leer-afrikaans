import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only enable Supabase when the URL looks like a real project URL
const isConfigured = supabaseUrl?.startsWith('https://') && supabaseAnonKey?.length > 20;

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const supabaseEnabled = !!supabase;
