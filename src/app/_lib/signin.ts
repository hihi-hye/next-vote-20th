'use server';

import { cookies } from 'next/headers';

export default async function signIn(data: {
  username: string;
  password: string;
}): Promise<boolean> {
  try {
    const formData = new FormData();

    formData.set('username', data.username);
    formData.set('password', data.password);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const accessToken = response.headers.get('access')!;
    const refreshToken = response.headers.get('Set-Cookie')!;

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'refresh_token',
      value: refreshToken,
      httpOnly: true,
      secure: true,
      path: '/',
    });

    cookieStore.set({
      name: 'access_token',
      value: accessToken,
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return true;
  } catch (err) {
    return false;
  }
}
