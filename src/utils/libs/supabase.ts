import { createClient } from '@supabase/supabase-js';

import { Database } from '@/utils/libs/supabase.types';

console.log(
	'process.env.NEXT_PUBLIC_SUPABASE_URL',
	process.env.NEXT_PUBLIC_SUPABASE_URL
);
console.log(
	'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY',
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
