import { useRouter } from "next/router";
import ContentBox from "../components/ContentBox";
import { Group, Title, Text, Image, Space, Stack, Anchor } from "@mantine/core";



export default function Error404() {
    const location = useRouter();
    return (
        <Group position="center">
            <Stack justify="center" align="center">
                <Title>Error 404</Title>
                <Text>Not Found</Text>
                <ContentBox>
                    <Image src="/404img.png" alt="a dog eating paper" width="auto" height={200} placeholder />
                </ContentBox>
                <Text>Opps! Did the dog eat the page?!</Text>
                <Space h="sm"/>
                <Anchor component="a" >
                {`<-`} Sorry about that. {`Let's`} head back home.
                </Anchor>
            </Stack>
        </Group>
    )
}