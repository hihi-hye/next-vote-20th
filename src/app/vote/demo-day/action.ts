'use server';

import { cookies } from 'next/headers';

export default async function voteTeam(teamName: string) {
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

    return '투표가 완료되었습니다.';
  } catch (error) {
    console.error(error);
    return (error as any).toString();
  }
}
