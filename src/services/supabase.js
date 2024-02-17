import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nruobkekgbifyuwmkggz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ydW9ia2VrZ2JpZnl1d21rZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NTc1MDUsImV4cCI6MjAyMzQzMzUwNX0.buuf4Q7eCzuwAKCvgFtJZnBys-Jf6lVIVLAXiXL9oh8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
