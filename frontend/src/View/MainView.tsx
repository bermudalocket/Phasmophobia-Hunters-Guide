import { useGameContext } from "../Model/GameContext";
import { EvidenceTableView } from "./EvidenceTableView";
import { GhostInfoView } from "./GhostInfoView";
import { GhostTableView } from "./GhostTableView";
import { HeaderView } from "./HeaderView";
import { ObjectivesTableView } from "./ObjectivesTableView";
import { Center, HStack, VStack } from "@chakra-ui/react"

type MainViewModel = {
    uuid: string
}

export const Main = ({uuid}: MainViewModel) => {

    const state = useGameContext()
    state.gameState.uuid = uuid

    console.log("---> RENDERING MAIN { uuid: " + state.gameState.uuid + " } ")

    // noinspection RequiredAttributes
    return <>
        <VStack align="center">
            <Center padding={30}>
                <HeaderView />
            </Center>
            <HStack>
                <GhostTableView />
                <VStack>
                    <GhostInfoView />
                    <EvidenceTableView />
                </VStack>
            </HStack>
            <ObjectivesTableView />
        </VStack>
    </>

}