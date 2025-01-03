'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Text from '@/components/atoms/Text';
import CTAButton from '@/components/atoms/CTAButton';
import SmallButton from '@/components/atoms/SmallButton';
import voteTeam from './action';

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
  candidateList: string[];
}) {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null,
  );

  return (
    <Container>
      <Text variant="header1">데모데이 투표</Text>

      <CardWrapper>
        {candidateList.map((candidate) => (
          <SmallButton.Secondary
            key={candidate}
            isSelected={selectedCandidate === candidate}
            text={candidate}
            onClick={() => setSelectedCandidate(candidate)}
          />
        ))}
      </CardWrapper>

      <ButtonArea>
        <CTAButton
          type="submit"
          text="투표하기"
          disabled={!selectedCandidate}
          onClick={() => {
            voteTeam(selectedCandidate!).then((response) => {
              alert(response);
            });
          }}
        />
        <Link href="/vote/demo-day/result">
          <CTAButton type="submit" text="결과 보기" variant="secondary" />
        </Link>
      </ButtonArea>
    </Container>
  );
}
