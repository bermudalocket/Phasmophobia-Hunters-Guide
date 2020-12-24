import React, { FC } from 'react';
import { useGameContext } from "../Model/GameContext";
import { Evidence } from "../../../Shared Model/Evidence";

interface EvidenceTableRowViewModel {
    evidence: Evidence
}

export const EvidenceTableRowView: FC<EvidenceTableRowViewModel> = ({evidence}) => {

    const context = useGameContext()

    return (
        <tr>
            <td>{evidence.name}</td>
            <td>
                <input name={evidence.rowName}
                       type="radio"
                       checked={context.gameState.evidences.get(evidence) === true}
                       onChange={() => { context.setEvidence(evidence, true) }}
                />
            </td>
            <td>
                <input name={evidence.rowName}
                       type="radio"
                       checked={context.gameState.evidences.get(evidence) === false}
                       onChange={() => { context.setEvidence(evidence, false) }}
                />
            </td>
            <td>
                <input name={evidence.rowName}
                       type="radio"
                       checked={context.gameState.evidences.get(evidence) === undefined}
                       onChange={() => { context.setEvidence(evidence, undefined) }}
                />
            </td>
        </tr>
    )

}