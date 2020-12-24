import React from "react";
import { FC } from "react";
import { useGameContext } from "../Model/GameContext";

import { Input } from "@chakra-ui/react"

export const GhostNameView: FC<{}> = () => {

    const context = useGameContext()

    return <Input placeholder="Name"
                  value={context.gameState.ghostName}
                  onChange={async (e) => {
                      let start = Date.now()
                      console.log("Change detected")
                      context.setGhostName(e.target.value)
                      let end = Date.now()
                      console.log(`Took ${end-start} ms.`)
                  }} />
}