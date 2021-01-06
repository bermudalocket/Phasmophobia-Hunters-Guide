import React, { FC } from 'react';
import { useGameContext } from "../Model/GameContext";
import Evidence from "../Model/Evidence";
import Ghost from "../Model/Ghost";
import { Text, Tr, Td, Icon, HStack, Box } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

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
 
    const className = () => {
        if (ghost.requiredEvidence.some(e => gameState.evidences.get(e) === false)) {
            return "red.400"
        }
        if (gameState.positiveEvidence()
            .some(e => !ghost.requiredEvidence.some(ev => ev === e))
        ) {
            return "red.400"
        }
        if (ghost.requiredEvidence
            .filter(e => gameState.evidences.get(e) === true)
            .length === ghost.requiredEvidence.length) {
            return "green.400"
        }
        return "none"
    }

    const isRuledOut = (() => {
        return className() === "red.400"
    })()

    const color = (evidence: Evidence) => {
        switch (gameState.evidences.get(evidence)) {
            case true: return "green.400"
            case false: return "red.400"
            default: return "none"
        }
    }

    const padding = 1
    const colorDotEvidenceMatched = "green.400"

    return (
        <Tr>
            <Td pt={padding} pb={padding} bgColor={className()}>
                <HStack spacing={1}>
                    <Text as={isRuledOut ? "del" : "text"} fontWeight="medium" textTransform="uppercase">
                        {ghost.name}
                    </Text>
                    <Box hidden={isRuledOut || gameState.positiveEvidence().length === 0}>
                        <CircleIcon color={matchedEvidence >= 1 ? colorDotEvidenceMatched : "gray.400" } />
                        <CircleIcon color={matchedEvidence >= 2 ? colorDotEvidenceMatched : "gray.400" } />
                        <CircleIcon color={matchedEvidence >= 3 ? colorDotEvidenceMatched : "gray.400" } />
                    </Box>
                </HStack>
            </Td>
            {
                ghost.requiredEvidence.map(evidence => 
                    <Td w={250} pt={0} pb={0} textAlign="center" key={ghost.name + evidence.name}>
                        <CheckIcon color="green.400" opacity={isRuledOut ? 0.45 : 1.0} pr={1} w={3} h={2} hidden={gameState.evidences.get(evidence) !== true} />
                        <CloseIcon color="red.400" opacity={isRuledOut ? 0.45 : 1.0} pr={1} w={3} h={2} hidden={gameState.evidences.get(evidence) !== false} />


                        <Text as={isRuledOut ? "del" : "text"} opacity={isRuledOut ? 0.15 : 1.0} color={color(evidence)} fontSize="xs">{evidence.name}</Text>
                    </Td>
                )
            }
        </Tr>
    )
}