'use client';

import styled from 'styled-components';
import { VoteResult } from './page';
import Text from '@/components/atoms/Text';
import CTAButton from '@/components/atoms/CTAButton';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  padding: 0 1.25rem;
  height: 100dvh;

  text-align: center;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.75rem 1.25rem;
  background: transparent;

  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
  border-radius: 2rem;
`;

const ButtonWrapper = styled(Link)`
  width: 100%;
`;

export default function VoteResultScreen({
  resultList,
}: {
  resultList: VoteResult[];
}) {
  return (
    <Container>
      <Text variant="title1_sb">BE 파트장 투표 결과</Text>

      <ListWrapper>
        {resultList.map((item) => (
          <Item key={item.leaderId}>
            <Text variant="body1_rg">{item.leaderName}</Text>
            <Text variant="body1_rg">{item.voteNum}표</Text>
          </Item>
        ))}
      </ListWrapper>

      <ButtonWrapper href="/vote/back-end">
        <CTAButton type="button" text="투표 페이지로 돌아가기" />
      </ButtonWrapper>
    </Container>
  );
}
