import { loadEnv } from "vite";

const env = loadEnv("development", process.cwd(), "");
console.log("LOADED_NAMES=" + Object.keys(env).sort().join(","));
for (const k of ["SUPABASE_URL", "SUPABASE_PUBLISHABLE_KEY", "VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"]) {
  const v = env[k] ?? "";
  console.log(
    `${k}: present=${Boolean(v)} len=${v.length} quoted=${v.startsWith('"') || v.startsWith("'")} https=${v.startsWith("https://")} sbkey=${v.startsWith("sb_")}`,
  );
}
