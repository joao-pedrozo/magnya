import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: `../../.env.local` });

const supabaseUrl = process.env.SUPABASE_PROJECT_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
