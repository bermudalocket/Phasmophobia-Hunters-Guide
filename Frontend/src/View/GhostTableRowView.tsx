import React, { FC } from 'react';
import { useGameContext } from "../Model/GameContext";
import Evidence from "../Model/Evidence";
import Ghost from "../Model/Ghost";
import { Text, Tr, Td, Icon, Circle, HStack, VisuallyHidden, Box } from '@chakra-ui/react';

interface GhostTableRowViewModel {
    ghost: Ghost;
}

type CircleIconViewModel = {
    color: string
}
const CircleIcon = ({color}: CircleIconViewModel) => (
    <Icon viewBox="0 0 200 200" boxSize={2} color={color}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  )

export const GhostTableRowView: FC<GhostTableRowViewModel> = ({ghost}) => {

    const { gameState } = useGameContext()

    const matchedEvidence = ghost.requiredEvidence
        .filter(e => gameState.evidences.get(e) === true)
        .length

    const isRuledOut = ghost.requiredEvidence
        .filter(e => gameState.evidences.get(e) === false)
        .length > 0
 
    const className = () => {
        if (ghost.requiredEvidence
            .filter(e => gameState.evidences.get(e) === false)
            .length > 0) {
            return "red.400"
        }
        if (ghost.requiredEvidence
            .filter(e => gameState.evidences.get(e) === true)
            .length === ghost.requiredEvidence.length) {
            return "green.400"
        }
        return "none"
    }

    const color = (evidence: Evidence) => {
        switch (gameState.evidences.get(evidence)) {
            case true: return "green.400"
            case false: return "red.400"
            default: return "none"
        }
    }

    const padding = 1

    return (
        <Tr>
            <Td pt={padding} pb={padding} bgColor={className()}>
                <HStack spacing={1}>
                    <Text pr={1} fontWeight="medium" textTransform="uppercase">
                        {ghost.name}
                    </Text>
                    <Box hidden={isRuledOut}>
                        <CircleIcon color={matchedEvidence >= 1 ? "white.400" : "black" } />
                        <CircleIcon color={matchedEvidence >= 2 ? "white.400" : "gray.500" } />
                        <CircleIcon color={matchedEvidence >= 3 ? "white.400" : "gray.600" } />
                    </Box>
                </HStack>
            </Td>
            {
                ghost.requiredEvidence.map(evidence => 
                    <Td w={250} pt={0} pb={0} textAlign="center" key={ghost.name + evidence.name}>
                        <Text color={color(evidence)} fontSize="xs">{evidence.name}</Text>
                    </Td>
                )
            }
        </Tr>
    )
}