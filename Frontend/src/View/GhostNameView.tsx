import React from "react";
import { FC } from "react";
import { useGameContext } from "../Model/GameContext";
import { Input, Skeleton } from "@chakra-ui/react"

export const GhostNameView: FC<{}> = () => {

    const context = useGameContext()

    return <Skeleton w={200} startColor="purple.500" endColor="#212529" isLoaded={!context.gameState.isLoading}>
        <Input placeholder="Name"
                      value={context.gameState.ghostName}
                      onChange={e => context.setGhostName(e.target.value)} />
    </Skeleton>

}