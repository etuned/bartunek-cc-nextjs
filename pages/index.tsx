import { client } from "../lib/picosanity";
import Head from 'next/head'
import Image from 'next/image';
import { 
  createStyles,
  Group,
  Title, 
  Text, 
  Container,
  Stack, 
  Center,
  Space,
  Avatar
  } from '@mantine/core';

import ContentBox from '../components/ContentBox';
import ProjectsInProgressList from "../components/ProjectsInProgressList";
import {Project, Self} from '../types'

interface Props {
  projects: [Project];
  self: Self;
}

const useStyles = createStyles((theme) => ({
  projectTitle: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    // Dynamic media queries, define breakpoints in theme, use anywhere
    [`@media (max-width: ${theme.breakpoints.md}px)`
    ]: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
    },
  },
}));

export default function Home({projects, self}: Props) {
  const { classes } = useStyles();
  return (
    <>
    <Head>
        <title>Edwin Bartunek</title>
    </Head>
    <Group style={{width: "100%"}} position="center">
    <Group position="center">
        <Stack spacing="lg" sx={{maxWidth: 580}}>
        <Title>Hello. I am Edwin.</Title>
        <Text p={30}>
            I am frontend software engineer with a passion for building
            amazing experiences. I enjoy coffee, I love dogs, and I highly 
            enjoy cooking! Learn more about me and my projects {`I've`} done below!
        </Text>
        </Stack>
        <ContentBox>
            <Image 
              style={{borderRadius: "50%"}} 
              src={self.image.src} 
              alt="A SVG version of Edwin" width={190} 
              height={190} 
              blurDataURL={self.image.lqip} 
              priority
            />
        </ContentBox>
    </Group>
   
    <Container fluid> 
      <div className={classes.projectTitle}>
        <Avatar
        radius={180}
         size={110}
          sx={(theme)=>({
            backgroundColor: theme.colors.orange
          })}
          src="/character.svg"
          alt="Edwin as a drawing in svg form"
        />
        <Title>
          Here are my current projects in process
        </Title>
      </div>
        
        <ProjectsInProgressList projects={projects} />
    </Container>
</Group>
</>
  )
};



export async function getStaticProps() {
  const projects = await client
  .fetch(`
  *[_type == "project" && dates.isInProgress][0..3]| order(dates.startDate asc){
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
      },
    }
  }
  `)
  .then((projects) => projects)

  const self = await client
  .fetch(`*[_type == "author" && name == "Edwin Bartunek"][0]{
      name,
      image{
      alt,
      "src": image.asset->url,
      "lqip": image.asset->metadata.lqip,
      "colorDominant": image.asset->metadata.palette.dominant{
        background, foreground, title
      }
    }
  }
  `)
  .then((self) => self)

  return {
    props: {
      projects,
      self
    },
  }
}