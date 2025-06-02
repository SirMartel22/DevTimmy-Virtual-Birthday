import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wkeyxomsmntufmktrnlq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZXl4b21zbW50dWZta3RybmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MDA4MjAsImV4cCI6MjA2NDM3NjgyMH0.B0Pk_krNHs32GCVJTXiP8cai6nmfwRdgzrCBCDI3VqQ";

export const supabase = createClient(supabaseUrl, supabaseKey);

// helper function to upload image
export const uploadFile = async (file, bucket = 'throwback-images') => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file)

    if (error) throw error
    return data;
}

export const uploadImage = (file) => uploadFile(file, 'throwback-images');
export const uploadAudio = (file) => uploadFile(file, 'throwback-images');
export const uploadMessage = (file) => uploadFile(file, 'throwback-image');
export const uploadVideo = (file) => uploadFile(file, 'throwback-images');