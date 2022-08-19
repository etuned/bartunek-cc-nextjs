import {
  Grid,
  Card,
  Badge,
  Group,
  Title,
  Image,
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
          description,
          self,
        }) => (
          <Grid.Col xs={12} sm={6} md={6} lg={4} key={_id}>
            <Card
              sx={{ maxWidth: '100%', height: '100%' }}
              shadow='sm'
              p='sm'
              radius='md'
              withBorder
            >
              <Card.Section>
                {mainImage?.src ? (
                  <Image
                    width='100%'
                    height={160}
                    src={mainImage.src}
                    alt={mainImage.alt}
                    placeholder={
                      <Image
                        width='auto'
                        height={160}
                        src={mainImage.lqip}
                        alt={mainImage.alt}
                      />
                    }
                  />
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

              <Group position='apart' mt='md' mb='xs'>
                <Badge radius='md' size='xl'>
                  {name}
                </Badge>
                {/* Will add status later */}
              </Group>

              <Text size='sm' mb='sm' style={{ height: '85px' }} lineClamp={4}>
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
              <Stack>
                <Text size='sm' color='dimmed'>
                  Made for:
                </Text>

                {!employer ? (
                  <Group position='apart' mt={10} mb={10}>
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
                  <Group position='apart' mt={10} mb={10}>
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
              </Stack>
            </Card>
          </Grid.Col>
        )
      )}
    </Grid>
  );
}
