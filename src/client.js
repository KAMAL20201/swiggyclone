import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zclfqvlkwtbrhubtevdz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjbGZxdmxrd3Ricmh1YnRldmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3OTgzMzcsImV4cCI6MjAwNTM3NDMzN30.cAHxhGWb-qw8-6T1M9k5Dj67vVvSeV_AeIyqyVSYHBA";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function loginWithGoogle() {
  
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    scopes: 'email profile',
  }
})

if (error) {
  console.error('Error signing in with Google:', error.message);
  return;
}


}


