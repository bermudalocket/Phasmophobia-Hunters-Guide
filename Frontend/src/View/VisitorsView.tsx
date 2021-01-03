import { FC } from "react";
import { useGameContext } from "../Model/GameContext";
import { Text, HStack, VStack, Avatar } from '@chakra-ui/react'

export const VisitorsView: FC = () => {
    const context = useGameContext()
    return (
        <HStack>

            {context.gameState.gameVisitors.map(v => <>
                <VStack>
                    <Avatar bg="teal.500" name="Moldy Marzipan" />
                    <Text>Moldy Marzipan</Text>
                </VStack>
            </>)}
        </HStack>
    )
}