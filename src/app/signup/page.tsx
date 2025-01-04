'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import CTAButton from '@/components/atoms/CTAButton';
import Text from '@/components/atoms/Text';
import {
  AccountSection,
  ButtonWrapper,
  UserSection,
} from '../_components/styles';
import Dropdown from '../_components/Dropdown';
import styled from 'styled-components';
import signUp from '../_lib/signup';
import { Input, InputContainer } from '@/styles/input';
import PersonIcon from '@/assets/PersonIcon';
import PasswordIcon from '@/assets/PasswordIcon';
import EmailIcon from '@/assets/EmailIcon';

const DropdownContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0;
`;

const FIELD_LIST: {
  field: 'username' | 'password' | 'email' | 'name';
  placeholder: string;
  type: string;
  icon: ({ size }: { size: string }) => ReactNode;
}[] = [
  {
    field: 'name',
    placeholder: '이름',
    type: 'text',
    icon: PersonIcon,
  },
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
  {
    field: 'email',
    placeholder: '이메일',
    type: 'email',
    icon: EmailIcon,
  },
];

export default function Main() {
  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    team: '',
    part: '',
  });
  const router = useRouter();

  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);

    const response = await signUp(data);

    if (response) {
      router.push('/signin');
    } else {
      alert('회원가입 정보가 잘못되었습니다.');
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AccountSection>
        <Text variant="header1">SIGN UP!</Text>

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
      </AccountSection>

      <UserSection>
        <DropdownContainer>
          <Dropdown
            options={[
              { label: '포토그라운드', value: 'PHOTO_GROUND' },
              { label: '앤젤브릿지', value: 'ANGEL_BRIDGE' },
              { label: '페달지니', value: 'PEDAL_GENIE' },
              { label: '케이크WAY', value: 'CAKE_WAY' },
              { label: '커피딜', value: 'CUPFEE_DEAL' },
            ]}
            placeholder="팀 명"
            onSelect={(value) => setData({ ...data, team: value })}
          />

          <Dropdown
            options={[
              { value: 'FRONTEND', label: 'FRONTEND' },
              { value: 'BACKEND', label: 'BACKEND' },
            ]}
            placeholder="파트"
            onSelect={(value) => setData({ ...data, part: value })}
          />
        </DropdownContainer>
      </UserSection>

      <ButtonWrapper>
        <CTAButton type="submit" text="가입하기" disabled={pending} />
      </ButtonWrapper>
    </form>
  );
}
