import React, { FC } from 'react';
import { useGameContext } from "../Model/GameContext";
import Evidence from "../Model/Evidence";
import Ghost from "../Model/Ghost";
import { Text, Tr, Td } from '@chakra-ui/react';

interface GhostTableRowViewModel {
    ghost: Ghost;
}

export const GhostTableRowView: FC<GhostTableRowViewModel> = ({ghost}) => {

    const { gameState } = useGameContext()
 
    const className = () => {
        if (Evidence.all
            .filter(e => ghost.requiredEvidence.find(ev => e === ev) === undefined)
            .filter(e => gameState.evidences.get(e) === true)
            .length > 0) {
            return "notPossible"
        }
        if (ghost.requiredEvidence
            .filter(e => gameState.evidences.get(e) === false)
            .length > 0) {
            return "notPossible"
        }
        if (ghost.requiredEvidence
            .filter(e => gameState.evidences.get(e) === true)
            .length === ghost.requiredEvidence.length) {
            return "included"
        }
        return "none"
    }

    const color = (evidence: Evidence) => {
        switch (gameState.evidences.get(evidence)) {
            case true: return "included"
            case false: return "excluded"
            default: return "none"
        }
    }

    const padding = 1

    return (
        <Tr>
            <Td pt={padding} pb={padding}  className={className()}>
                <Text fontWeight="medium" textTransform="uppercase">
                    {ghost.name}
                </Text>
            </Td>
            {
                ghost.requiredEvidence.map(evidence => 
                    <Td layerStyle={color(evidence)} w={250} pt={0} pb={0} textAlign="center" key={ghost.name + evidence.name}>
                        <Text fontSize="sm">{evidence.name}</Text>
                    </Td>
                )
            }
        </Tr>
    )
}