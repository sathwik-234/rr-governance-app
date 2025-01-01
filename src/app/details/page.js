
import { redirect } from 'next/navigation';
import UserDetails from '../user_details/page'

import { createClient } from '@/utils/supabase/server'
// import { useState } from 'react'

export default async function details() {
  // const [formData,setFormData] = useState({})

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/signup')
  }

  return (
    <>
      <UserDetails user = {data.user}/>
    </>
  )
}