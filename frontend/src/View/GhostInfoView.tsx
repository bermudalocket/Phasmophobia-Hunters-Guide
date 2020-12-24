import { FC } from "react";
import { useGameContext } from "../Model/GameContext";
import { GhostNameView } from "./GhostNameView";
import { VStack, Select } from "@chakra-ui/react"

export const GhostInfoView: FC<{}> = () => {

    const state = useGameContext()

    return <VStack padding={10}>
        <div className="spookyFont">Ghost Info</div>
        <GhostNameView />
        <Select placeholder="Shyness">
            <option value="0"
                    label="???"
                    selected={state.gameState.aloneGhost === undefined}
                    onChange={() => state.setAloneGhost(undefined) }
            />
            <option value="1"
                    label="ALONE"
                    selected={state.gameState.aloneGhost === true}
                    onChange={() => state.setAloneGhost(true) }
            />
            <option value="2"
                    label="EVERYONE"
                    selected={state.gameState.aloneGhost === false}
                    onChange={() => state.setAloneGhost(false) }
            />
        </Select>
    </VStack>

}