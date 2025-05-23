// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gygkyqdmrkojskvdjsrx.supabase.co'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Z2t5cWRtcmtvanNrdmRqc3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NTE2MDQsImV4cCI6MjA2MzQyNzYwNH0.WJwj7wxTU_cwmPov80YeQZMmCyue1nF7342LzWVD1hA'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

