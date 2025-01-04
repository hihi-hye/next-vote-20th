'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Text from '@/components/atoms/Text';
import CTAButton from '@/components/atoms/CTAButton';
import SmallButton from '@/components/atoms/SmallButton';
import { Candidate } from '@/data/types';
import voteFE from './action';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  padding: 0 1.25rem;
  height: 100dvh;

  text-align: center;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, auto));
  gap: 1rem 0.5rem;
  width: 100%;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
`;

export default function VoteScreen({
  candidateList,
}: {
  candidateList: any[];
}) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const router = useRouter();

  async function handleVote() {
    if (!selectedCandidate) return;

    try {
      // 투표 API 호출
      const response = await voteFE(selectedCandidate.id);

      // 성공적인 응답 처리
      if (response.status === 'success') {
        alert(response.message); // 성공 메시지 표시
        router.push('/vote/front-end/result'); // 결과 페이지로 이동
      } else {
        throw new Error(response.message || 'Unexpected error occurred'); // 실패 시 에러 던지기
      }
    } catch (error: any) {
      alert(error.message || '투표에 실패했습니다.'); // 에러 메시지 표시
    }
  }

  return (
    <Container>
      <Text variant="header1">FE 파트장 투표</Text>

      <CardWrapper>
        {candidateList.map((candidate) => (
          <SmallButton.Secondary
            key={candidate.id}
            isSelected={selectedCandidate?.id === candidate.id}
            text={candidate.label}
            onClick={() => setSelectedCandidate(candidate)}
          />
        ))}
      </CardWrapper>

      <ButtonArea>
        <CTAButton
          type="submit"
          text="투표하기"
          disabled={!selectedCandidate}
          onClick={handleVote}
        />
        <Link href="/vote/front-end/result">
          <CTAButton type="submit" text="결과 보기" variant="secondary" />
        </Link>
      </ButtonArea>
    </Container>
  );
}
