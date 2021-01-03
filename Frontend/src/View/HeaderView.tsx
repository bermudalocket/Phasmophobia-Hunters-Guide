import { FC } from "react";
import { Heading, VStack, Text } from "@chakra-ui/react"

export const HeaderView: FC<{}> = () => {
    return <VStack>
        <Heading fontSize="6xl" fontFamily="october_crowregular" bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text">Phasmophobia</Heading>
        <Text>Hunter's Guide</Text>
    </VStack>
}