'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import Text from '@/components/atoms/Text';
import CTAButton from '@/components/atoms/CTAButton';
import PersonIcon from '@/assets/PersonIcon';
import PasswordIcon from '@/assets/PasswordIcon';
import { Input, InputContainer } from '@/styles/input';
import signIn from '../_lib/signin';
import { setAccessToken } from '../token';

const FIELD_LIST: {
  field: 'username' | 'password';
  placeholder: string;
  type: string;
  icon: ({ size }: { size: string }) => ReactNode;
}[] = [
  {
    field: 'username',
    placeholder: '아이디',
    type: 'text',
    icon: PersonIcon,
  },
  {
    field: 'password',
    placeholder: '비밀번호',
    type: 'password',
    icon: PasswordIcon,
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin: 0 1rem;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration-color: ${({ theme }) => theme.colors.gray[300]};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100%;
`;

const SignUpText = styled(Text)`
  color: ${({ theme }) => theme.colors.gray[300]};
  text-align: center;
`;

export default function SignInPage() {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accessToken = await signIn(data);
    console.log(data);
    console.log(accessToken);

    if (accessToken) {
      router.push('/home');
    } else {
      alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <Container>
      <Text variant="header1">SIGN IN!</Text>

      <Form onSubmit={handleLogin}>
        <InputWrapper>
          {FIELD_LIST.map((fieldItem) => {
            const { placeholder, field, type } = fieldItem;
            const value = data[field];

            return (
              <InputContainer key={field}>
                <fieldItem.icon size="1.5rem" />
                <Input
                  value={value}
                  onChange={(event) => {
                    const newData = { ...data };
                    newData[field] = event.target.value;
                    setData(newData);
                  }}
                  placeholder={placeholder}
                  type={type}
                  required
                />
              </InputContainer>
            );
          })}
        </InputWrapper>

        <CTAButton type="submit" text="로그인" />
      </Form>

      <StyledLink href="/signup">
        <SignUpText variant="caption1_rg">회원가입</SignUpText>
      </StyledLink>
    </Container>
  );
}
