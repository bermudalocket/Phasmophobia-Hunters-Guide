import React from "react";
import { FC } from "react";
import { useGameContext } from "../Model/GameContext";
import { Objective } from "../../../Shared Model/Objective";

interface ObjectiveTableRowViewModel {
    objective: Objective
}

export const ObjectiveTableRowView: FC<ObjectiveTableRowViewModel> = ({objective}) => {

    const context = useGameContext()

    const className = (objective: Objective) => {
        return (objective === Objective.main) ? "" : "defaultObj"
    }

    return (
        <tr key={objective.rowName}>
            <td className={className(objective)}>
                {objective.text}
            </td>
            <td>
                <input type="radio"
                       name={objective.rowName}
                       value="true"
                       checked={context.gameState.objectives.get(objective) === true}
                       onChange={() => { context.setObjective(objective, true) }} />
            </td>
            <td>
                <input type="radio"
                       name={objective.rowName}
                       value="false"
                       checked={context.gameState.objectives.get(objective) === false}
                       onChange={() => { context.setObjective(objective, false) }} />
            </td>
        </tr>
    )

}