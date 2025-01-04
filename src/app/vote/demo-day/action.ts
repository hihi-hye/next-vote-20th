'use server';

import { cookies } from 'next/headers';
type VoteResponse = {
  message: string;
  code: string;
  status: string;
};
export default async function voteTeam(
  teamName: string,
): Promise<VoteResponse> {
  try {
    const formData = new FormData();
    formData.set('leaderId', teamName);

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value!;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/votes/team`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access: accessToken,
        },
        body: JSON.stringify({ teamName }),
      },
    );
    const result = await response.json();

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
