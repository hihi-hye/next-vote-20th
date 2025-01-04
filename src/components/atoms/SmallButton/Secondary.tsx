import styled from 'styled-components';
import Text from '@/components/atoms/Text';
import Button from './styles';

const SecondaryButton = styled(Button)<{ $isSelected: boolean }>`
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.primary[100] : theme.colors.gray[900]};
`;

export default function Secondary({
  text,
  onClick = () => {},
  isSelected = false,
}: {
  text: string;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  return (
    <SecondaryButton type="button" onClick={onClick} $isSelected={isSelected}>
      <Text variant="title1_rg">{text}</Text>
    </SecondaryButton>
  );
}
