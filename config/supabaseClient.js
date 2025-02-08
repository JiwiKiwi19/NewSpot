import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvmrnlsczzvcnpimzqpf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bXJubHNjenp2Y25waW16cXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MzYyNjAsImV4cCI6MjA1MzAxMjI2MH0.Z896xdxbUS2al3YrSn0KDt10JSDq7EWiylLQWHJF_TM';


const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase