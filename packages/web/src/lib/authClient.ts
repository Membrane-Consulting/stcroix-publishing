import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL.toString()
const key = import.meta.env.VITE_SUPABASE_ANON_KEY.toString()

const supabase = createClient(url, key)

export default supabase
