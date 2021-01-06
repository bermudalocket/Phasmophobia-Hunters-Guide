import React, { FC, ReactText } from 'react';
import { useGameContext } from "../Model/GameContext";
import Evidence from "../Model/Evidence";
import { Text, Tr, Td, RadioGroup, HStack, Radio } from '@chakra-ui/react';
import bool3 from '../Model/bool3';

interface EvidenceTableRowViewModel {
    evidence: Evidence
}

export const EvidenceTableRowView: FC<EvidenceTableRowViewModel> = ({evidence}) => {

    const context = useGameContext()

    const setValue = (nextValue: ReactText) => {
        let newState: bool3 = undefined
        switch (nextValue) {
            case "true": newState = true; break
            case "false": newState = false; break
            case "undefined": newState = undefined; break
        }
        context.setEvidence(evidence, newState)
    }

    const value = () => {
        switch (context.gameState.evidences.get(evidence)) {
            case true: return "true"
            case false: return "false"
            default: return "undefined"
        }
    }

    return (
        <Tr>
            <Td>
                <Text textTransform="uppercase">{evidence.name}</Text>
            </Td>
            <Td>
                <RadioGroup onChange={setValue} value={value()}>
                    <HStack>
                        <Radio value="true" colorScheme="green" w={4} h={4} />
                        <Radio value="false" colorScheme="red" w={4} h={4} />
                        <Radio value="undefined" colorScheme="gray" w={4} h={4} />
                    </HStack>
                </RadioGroup>
            </Td>
        </Tr>
    )

}