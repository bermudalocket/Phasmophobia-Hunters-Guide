import React, { ReactText } from "react";
import { FC } from "react";
import { useGameContext } from "../Model/GameContext";
import Objective from "../Model/Objective";
import { RadioGroup, Radio, Text, Td, Tr, HStack } from "@chakra-ui/react"
import ObjectiveState from "../Model/ObjectiveState";

interface ObjectiveTableRowViewModel {
    objective: Objective
}

export const ObjectiveTableRowView: FC<ObjectiveTableRowViewModel> = ({objective}) => {

    const context = useGameContext()

    const setValue = (nextValue: ReactText) => {
        let newState = ObjectiveState.irrelevant
        switch (nextValue) {
            case "yes": newState = ObjectiveState.yes; break;
            case "no": newState = ObjectiveState.no; break;
            case "started": newState = ObjectiveState.started; break;
            case "irrelevant": newState = ObjectiveState.irrelevant; break;
        }
        context.setObjective(objective, newState)
    }

    return (
        <Tr>
            <Td pt={2} pb={2}>
                <Text textTransform="uppercase">{objective.text}</Text>
            </Td>
            <Td pt={1} pb={1}>
                <RadioGroup onChange={setValue} value={context.gameState.objectives.get(objective) ?? "undefined"}>
                    <HStack>
                        <Radio value="yes" colorScheme="green" w={4} h={4} />
                        <Radio value="no" colorScheme="red" w={4} h={4} />
                        <Radio value="started" colorScheme="blue" w={4} h={4} />
                        <Radio value="irrelevant" colorScheme="gray" w={4} h={4} />
                    </HStack>
                </RadioGroup>
            </Td>
        </Tr>
    )

}