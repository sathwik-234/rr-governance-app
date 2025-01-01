import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') || null
  // const next = searchParams.get('next') ?? '/'

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
      return redirect("/details")
  }

  // redirect the user to an error page with some instructions if OTP verification fails
  redirect('/error')
}
