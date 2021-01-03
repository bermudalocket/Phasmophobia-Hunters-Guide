import React, { FC } from "react";
import { useGameContext } from "../Model/GameContext";
import { GhostNameView } from "./GhostNameView";
import { VStack, Select, Skeleton, HStack } from "@chakra-ui/react"

export const GhostInfoView: FC<{}> = () => {

    const context = useGameContext()

    const selectedShyness = () => {
        switch (context.gameState.aloneGhost) {
            case undefined: return 0
            case true: return 1
            case false: return 2
        }
    }

    return <VStack>
        <div className="spookyFont">Ghost Info</div>

        <HStack>
            <GhostNameView />
            <Skeleton startColor="purple.500" endColor="#212529" isLoaded={!context.gameState.isLoading}>
                <Select placeholder="???" width="200px" value={selectedShyness()} onChange={(e) => {
                    switch (e.target.value) {
                        case "0": context.setAloneGhost(undefined); break;
                        case "1": context.setAloneGhost(true); break;
                        case "2": context.setAloneGhost(false); break;
                    }
                }}>
                    <option value={0}
                            label="???"
                            onChange={() => context.setAloneGhost(undefined) }
                    />
                    <option value="1"
                            label="ALONE"
                            onChange={() => context.setAloneGhost(true) }
                    />
                    <option value="2"
                            label="EVERYONE"
                            onChange={() => context.setAloneGhost(false) }
                    />
                </Select>
            </Skeleton>

            <Skeleton startColor="purple.500" endColor="#212529" isLoaded={!context.gameState.isLoading}>
                <Select placeholder="Map" width="200px" value="Ridgeview Road House" onChange={(e) => {
                    switch (e.target.value) {
                        case "0": context.setAloneGhost(undefined); break;
                        case "1": context.setAloneGhost(true); break;
                        case "2": context.setAloneGhost(false); break;
                    }
                }}>
                    <option value={0}
                            label="Ridgeview Road House"
                            onChange={() => context.setAloneGhost(undefined) }
                    />
                    <option value="1"
                            label="Edgefield Street House"
                            onChange={() => context.setAloneGhost(true) }
                    />
                    <option value="2"
                            label="Prison"
                            onChange={() => context.setAloneGhost(false) }
                    />
                </Select>
            </Skeleton>
        </HStack>
    </VStack>

}