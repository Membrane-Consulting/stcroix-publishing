import { createClient } from '@supabase/supabase-js'
import { goto } from '$app/navigation'
import { dev } from '$app/env'

const url = import.meta.env.VITE_SUPABASE_URL.toString()
const key = import.meta.env.VITE_SUPABASE_ANON_KEY.toString()

export const client = createClient(url, key, { detectSessionInUrl: false, })

export const login = async (email, password) => {
   const { session,  error } = await 
    client.auth.signIn({ email, password })
    
    if (error) {alert(error.message)}
    else {goto('/publications')} 
}

export const logout = async () => {
  const { error } = await client.auth.signOut().then(() => goto('/'))
  if (error){
    return error
  }
}

export const forgot = async (email:string) => {
  const redirect = dev ? 'http://localhost:3000/reset' : 'https://stcroixpublishing.com/reset'
  const { data, error } = await client.auth.api
  .resetPasswordForEmail(email, {redirectTo: redirect})
  if (error){
    return error
  } else {
    alert('Link Sent!')
    return data
  }
}

export const updateUser = async (password:string, token:string) => {
  const { error, data } = await client.auth.api
      .updateUser(token, { password })

  if (error) return Promise.reject(error);
  
  return Promise.resolve(data);
}