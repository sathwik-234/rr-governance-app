import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') || null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()
    console.log(1)
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if(error){
      console.error(error.message)
    }

    if (!error) {
      console.log(2)
      // Get user info after successful confirmation
      const { data: user, error: userError } = await supabase.auth.getUser()

      if (userError) {
        console.log(3)
        console.error("Error fetching user:", userError.message)
        return redirect('/error')
      }

      const uid = user?.id  // Get user UID

      // Assuming you have `cms_id` and need to associate the UID in the `crew` table
      const cms_id = 'SCMN123'  // You should pass `cms_id` as part of the URL query or fetch it from somewhere

      // Update the crew table with the UID (authentication ID) and cms_id
      const { error } = await supabase
        .from('Crew')
        .update({ authentication_id: uid })
        .eq("cms_id",cms_id)

      if (error) {
        console.error("Error updating crew table:", error.message)
        return redirect('/error')
      }

      // After successfully updating, redirect to the desired page
      return redirect(next)
    }
  }

  // redirect the user to an error page with some instructions if OTP verification fails
  redirect('/error')
}
