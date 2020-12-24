import React, { FC } from 'react';
import { useGameContext } from "../Model/GameContext";
import { Evidence } from "../Model/Evidence";
import { Ghost } from "../Model/Ghost";

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
        const state = gameState.evidences.get(evidence)
        switch (state) {
            case true:
                return "included"
            case false:
                return "excluded"
            case undefined:
                return "none"
        }
    }

    return (
        <tr>
            <td className={className()}>
                {ghost.name}
            </td>
            {
                ghost.requiredEvidence.map(evidence =>
                    <td key={ghost.name + evidence.name} className={color(evidence)}>
                        {evidence.name}
                    </td>
                )
            }
        </tr>
    )
}