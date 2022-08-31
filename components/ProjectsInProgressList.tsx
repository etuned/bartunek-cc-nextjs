import Image from 'next/image';
import {
  Grid,
  Card,
  Badge,
  Group,
  Title,
  Text,
  Avatar,
  Stack,
  Button,
  Space,
  Anchor,
  Center,
} from '@mantine/core';
import { PortableText } from '@portabletext/react';
import { Project } from '../types';

interface Props {
  projects: [Project];
}

export default function ProjectsInProgressList({ projects }: Props) {
  return (
    <Grid columns={12} mt={20} style={{ width: '100%' }}>
      {projects.map(
        ({
          _id,
          name,
          _createdAt,
          _updatedAt,
          mainImage,
          codeUrl,
          liveUrl,
          dates,
          employer,
          short,
          technologies,
          description,
          self,
        }) => (
          <Grid.Col xs={12} sm={6} md={6} lg={6} key={_id}>
            <Card
              sx={{ maxWidth: '100%', height: '100%' }}
              shadow='sm'
              p='sm'
              radius='md'
              withBorder
            >
              <Card.Section>
                {mainImage?.src ? (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 160,
                    }}
                  >
                    <Image
                      layout='fill'
                      objectFit='cover'
                      src={mainImage.src}
                      alt={mainImage.alt}
                      placeholder='blur'
                      blurDataURL={mainImage.lqip}
                    />
                  </div>
                ) : (
                  <Group
                    position='center'
                    sx={(theme) => ({
                      height: 160,
                      backgroundColor: theme.colors.cyan,
                    })}
                  >
                    <Text>Image coming soon!</Text>
                  </Group>
                )}
              </Card.Section>
              <Group position='apart' mt='xs' mb='xs'>
                <Badge radius='md' size='xl'>
                  {name}
                </Badge>
                {/* Will add status later */}
              </Group>

              <Group my={10} py={0} spacing={3}>
                {technologies.map(({ _id, title }, index) => (
                  <Text size='sm' color='cyan' key={_id}>
                    {title}
                    {index < technologies.length - 1 && ' | '}
                  </Text>
                ))}
              </Group>

              <Text size='sm' style={{ height: '49px' }} lineClamp={2}>
                {short}
              </Text>

              <Grid mb='sm' justify='center' align='center'>
                <Grid.Col span={6}>
                  <Text align='center' size='sm' color='dimmed'>
                    Code
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text align='center' size='sm' color='dimmed'>
                    Live
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Center>
                    {codeUrl.isPrivate ? (
                      <Text>Private</Text>
                    ) : (
                      <Anchor href={codeUrl.link} target='_blank'>
                        View Source
                      </Anchor>
                    )}
                  </Center>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Center>
                    {liveUrl.isPrivate ? (
                      <Text>Private</Text>
                    ) : (
                      <Anchor href={liveUrl.link} target='_blank'>
                        Live Version
                      </Anchor>
                    )}
                  </Center>
                </Grid.Col>
              </Grid>
              <Card.Section p='xs' mt='auto'>
                <Text size='sm' color='dimmed'>
                  Made for:
                </Text>

                {!employer ? (
                  <Group position='apart'>
                    <Text>{self.name}</Text>
                    <Avatar
                      radius='xl'
                      style={{
                        backgroundColor: `${self.image.colorVibrant.background}`,
                        boxShadow: `inset 0 0 3px ${self.image.colorVibrant.foreground}`,
                      }}
                      src={self.image.src}
                      alt={self.image.alt}
                    />
                  </Group>
                ) : (
                  <Group position='apart'>
                    <Text>{employer.name}</Text>
                    <Avatar
                      radius='xl'
                      style={{
                        backgroundColor: `${employer.image.colorVibrant.background}`,
                        boxShadow: `inset 0 0 3px ${employer.image.colorVibrant.foreground}`,
                      }}
                      src={employer.image.src}
                      alt={employer.image.alt}
                    />
                  </Group>
                )}
              </Card.Section>
            </Card>
          </Grid.Col>
        )
      )}
    </Grid>
  );
}
