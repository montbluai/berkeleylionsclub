import { createClient } from '@supabase/supabase-js';

// ⚠️ IMPORTANT: Replace these with your actual Supabase credentials
// Get these from your Supabase project dashboard: https://app.supabase.com
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

// Check if Supabase is properly configured
export const isSupabaseConfigured = 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface FeaturedEvent {
  id: string;
  event_name: string;
  event_description: string;
  event_date: string;
  event_time: string;
  location_name: string;
  location_address: string;
  volunteers_needed: string;
  age_requirements: string;
  volunteer_tasks: string[]; // Array of task strings
  ticket_price: string; // e.g., "$80" or "Free"
  is_free: boolean;
  square_payment_link: string | null;
  additional_info: string | null;
  to_go_available: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
}