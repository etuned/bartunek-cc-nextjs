import { Container } from '@mantine/core';

type Props = {
  children: JSX.Element;
};

export default function ContentBox({ children }: Props) {
  return (
    <Container
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '18rem',
        width: '18rem',
        minHeight: 'auto',
        height: 'auto',
        marginTop: '1em',
        marginBottom: '1em',
        padding: '1rem',
        borderRadius: '.25rem',
        backgroundColor: theme.colors.cyan,
      })}
    >
      {children}
    </Container>
  );
}
