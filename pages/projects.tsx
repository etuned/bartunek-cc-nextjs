import Head from 'next/head';
import ContentBox from '../components/ContentBox';
import { client } from '../lib/picosanity';
import {
  Group,
  Title,
  Text,
  Container,
  Image,
  Stack,
  Anchor,
} from '@mantine/core';
import ProjectsInProgressList from '../components/ProjectsInProgressList';
import { Project } from '../types';
import { NextLink } from '@mantine/next';

interface Props {
  projects: [Project];
}

export default function ProjectsPage({ projects }: Props) {
  return (
    <>
      <Head>
        <title>Projects - Edwin Bartunek</title>
      </Head>
      <Group style={{ width: '100%' }} position='center'>
        <Group position='center'>
          <ContentBox>
            <Image
              src='/character.svg'
              alt='Edwin as an SVG'
              width='auto'
              height={200}
            />
          </ContentBox>
          <Stack p={30} spacing='lg' sx={{ maxWidth: 580 }}>
            <Title p={30}>Projects are fun and exciting!</Title>
            <Text align='justify'>
              These are the projects I would like to share to highlight my
              skills. As I am always adding to this list, please check back
              often to see additions to my list. Thanks for viewing them!
            </Text>
          </Stack>
        </Group>
        <Container fluid>
          <ProjectsInProgressList projects={projects} />
        </Container>
      </Group>
    </>
  );
}

export async function getStaticProps() {
  const projects = await client
    .fetch(
      `*[_type == "project"] | order(dates.startDate desc){
        _id,
        _createdAt,
        _updatedAt,
        name,
        mainImage{
          alt,
          "src": image.asset->url,
          "lqip": image.asset->metadata.lqip,
          "colorDominant": image.asset->metadata.palette.dominant{
             background, foreground, title
            },
            "colorVibrant": image.asset->metadata.palette.vibrant{
              background, foreground, title
            }
          },
        codeUrl{
          isPrivate,
          link
        },
        liveUrl{
          isPrivate,
          link
        },
        dates{
          isInProgress,
          startDate,
          endDate,
        },
        "employer": employer->{
          _id,
          name,
         image{
          alt,
          "src": image.asset->url,
          "lqip": image.asset->metadata.lqip,
          "colorDominant": image.asset->metadata.palette.dominant{
            background, foreground, title
          },
          "colorVibrant": image.asset->metadata.palette.vibrant{
            background, foreground, title
          }
          },
        },
        "technologies": techList[] {
             _type == 'reference' => @->{_id,title,description},
        },
        short,
        description,
        "self": *[_type == "author" && name == "Edwin Bartunek"][0]{
          name,
          image{
          alt,
          "src": image.asset->url,
          "lqip": image.asset->metadata.lqip,
          "colorDominant": image.asset->metadata.palette.dominant{
            background, foreground, title
            },
            "colorVibrant": image.asset->metadata.palette.vibrant{
              background, foreground, title
            }
          }
        }
      }
      `
    )
    .then((projects) => projects);

  return {
    props: {
      projects,
    },
  };
}
