import React from "react";
import { FC } from "react";
import { useGameContext } from "../Model/GameContext";

import { Input } from "@chakra-ui/react"

export const GhostNameView: FC<{}> = () => {

    const context = useGameContext()

    return <Input placeholder="Name"
                  value={context.gameState.ghostName}
                  onChange={ async (e) => context.setGhostName(e.target.value) } />

}