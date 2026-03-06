'use client';
import { loginAdmin, logoutAdmin } from '../auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActionState } from 'react';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, null);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login Pemilik Toko
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Input
              type="password"
              name="password"
              placeholder="Masukkan Password Admin"
              required
            />
            {/* Tampilkan pesan error jika ada */}
            {state?.error && (
              <p className="text-red-500 text-sm font-medium">{state.error}</p>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-600"
            >
      
              {isPending ? 'Loading...' : 'Masuk'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
