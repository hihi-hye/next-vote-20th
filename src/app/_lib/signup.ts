'use server';

import { redirect } from 'next/navigation';

// [회원 가입 처리]
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000';

export default async function signUp(
  data: object,
): Promise<{ message?: string }> {
  try {
    const response = await fetch(`${BASE_URL}/api/member/join`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }
  } catch (err) {
    return { message: 'server_error' };
  }

  return redirect('/signin');
}
