import { AppProps } from 'next/app';
import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics';

import Link from 'next/link';
import {
  MantineProvider,
  AppShell,
  Header,
  Footer,
  Text,
  Group,
  Container,
  Anchor,
} from '@mantine/core';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  usePageViews();
  return (
    <>
      <GoogleAnalytics />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          colors: {
            'ocean-blue': [
              '#7AD1DD',
              '#5FCCDB',
              '#44CADC',
              '#2AC9DE',
              '#1AC2D9',
              '#11B7CD',
              '#09ADC3',
              '#0E99AC',
              '#128797',
              '#147885',
            ],
            'bright-pink': [
              '#F0BBDD',
              '#ED9BCF',
              '#EC7CC3',
              '#ED5DB8',
              '#F13EAF',
              '#F71FA7',
              '#FF00A1',
              '#E00890',
              '#C50E82',
              '#AD1374',
            ],
            dark: [
              '#d5d7e0',
              '#acaebf',
              '#8c8fa3',
              '#666980',
              '#4d4f66',
              '#34354a',
              '#2b2c3d',
              '#272343',
              '#0c0d21',
              '#01010a',
            ],
          },
        }}
      >
        <AppShell
          header={
            <Header style={{ border: 'none' }} py={20} height={65}>
              <Container size={920}>
                <Group position='left'>
                  <Link href='/' passHref>
                    <Anchor underline={false} component='a'>
                      Home
                    </Anchor>
                  </Link>
                  <Link href='/projects' passHref>
                    <Anchor underline={false} component='a'>
                      Projects
                    </Anchor>
                  </Link>
                </Group>
              </Container>
            </Header>
          }
        >
          <Container>
            <Component {...pageProps} />
            <Group my={30} position='center'>
              <Text>Built 2022 by Edwin Bartunek, all rights reserved</Text>
            </Group>
          </Container>
        </AppShell>
      </MantineProvider>
    </>
  );
}
