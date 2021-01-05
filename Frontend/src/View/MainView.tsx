import { useGameContext } from "../Model/GameContext";
import { EvidenceTableView } from "./EvidenceTableView";
import { GhostInfoView } from "./GhostInfoView";
import { GhostTableView } from "./GhostTableView";
import { HeaderView } from "./HeaderView";
import { ObjectivesTableView } from "./ObjectivesTableView";
import { Text, Button, Center, VStack, useColorMode, Grid, GridItem, Link, Box } from "@chakra-ui/react"
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type MainViewModel = {
    uuid: string
}

export const Main = ({uuid}: MainViewModel) => {

    const state = useGameContext()
    state.gameState.uuid = uuid

    const { colorMode, toggleColorMode } = useColorMode()

    console.log("---> RENDERING MAIN { uuid: " + state.gameState.uuid + " } ")

    // noinspection RequiredAttributes TODO Center and Spacer set this off
    return <>
        <Grid templateRows="repeat(4, 1fr)" 
            templateColumns="repeat(4, 1fr)"
            height={1000}
            padding={5}>
            <GridItem colSpan={2} rowSpan={1}>
                <Center height="100%">
                    <HeaderView />
                </Center>
            </GridItem>
            <GridItem colSpan={2} rowSpan={1}>
                <Center>
                    <GhostInfoView />
                </Center>
            </GridItem>
            <GridItem colSpan={3} rowSpan={1}>
                <Center p={1}>
                    <GhostTableView />
                </Center>
            </GridItem>
            <GridItem p={1} colSpan={1} rowSpan={1}>
                <EvidenceTableView />
            </GridItem>
            <GridItem colSpan={3} rowSpan={1}>
                <ObjectivesTableView />
            </GridItem>
            <GridItem colSpan={4} rowSpan={1}>
                <Center p={10}>
                    <VStack fontSize="sm" spacing={1} >
                        <Text>Copyright 2020-2021. All rights reserved.</Text>
                        <Text>Phasmophobia is copyright {""}
                            <Link color="teal.500" href="https://www.kineticgames.co.uk/" isExternal>
                                Kinetic Games <ExternalLinkIcon mx="2px" />
                            </Link>
                        </Text>
                    </VStack>
                </Center>
            </GridItem>
        </Grid>
        <Box className="floater">
            <Button onClick={toggleColorMode}>{ colorMode === "light" ? "Dark" : "Light" } Mode</Button>
        </Box>
    </>

}