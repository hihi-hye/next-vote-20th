'use server';

import { cookies } from 'next/headers';
type VoteResponse = {
  message: string;
  code: string;
  status: string;
};
export default async function voteBE(leaderId: number): Promise<VoteResponse> {
  try {
    const formData = new FormData();
    formData.set('leaderId', leaderId.toString());

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value!;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/votes/leader?part=BACKEND`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access: accessToken,
        },
        body: JSON.stringify({ leaderId }),
      },
    );
    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      throw new Error(result.message);
    }

    return {
      message: result.message,
      code: result.code,
      status: result.status,
    };
  } catch (error) {
    throw error;
  }
}
