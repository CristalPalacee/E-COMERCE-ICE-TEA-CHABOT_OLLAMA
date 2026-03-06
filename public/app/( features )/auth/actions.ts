'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export interface ActionState {
  error?: string;
}
export async function loginAdmin(prevState: ActionState | null, formData: FormData) {
  const password = formData.get('password') as string
  const adminPass = process.env.ADMIN_PASSWORD

  if (password === adminPass) {
    // Simpan status login di cookie selama 7 hari
    (await cookies()).set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, 
      path: '/',
    })
    redirect('/admin')
  } else {
    return { error: "Password Salah!" }
  }
}

export async function logoutAdmin() {
  (await cookies()).delete('admin_session')
  redirect('/')
}