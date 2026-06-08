import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xemlpmehwyccmfbghmwb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlbWxwbWVod3ljY21mYmdobXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NDMxMDYsImV4cCI6MjA5NTQxOTEwNn0.CoxM2sDYt8AllzjPzEFk5vgcmeKHgmpDv8B2Uh_kkps";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
