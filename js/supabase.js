const SUPABASE_URL = "https://rjlqovhuhoiadiwdcoup.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqbHFvdmh1aG9pYWRpd2Rjb3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDQzMjUsImV4cCI6MjA5NzAyMDMyNX0.OHhcpcmW-vdfQOtXnWg78KGqDrVveUZ2cXEYlfqiE_E";

const supabaseClient =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);