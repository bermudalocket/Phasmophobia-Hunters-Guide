import { FC } from "react";
import { Objective } from "../../../Shared Model/Objective";
import { ObjectiveTableRowView } from "./ObjectiveTableRowView";

export const ObjectivesTableView: FC<{}> = () => {
    return <>
        <table id="objectiveBoard">
            <thead>
                <tr>
                    <th>Objectives</th>
                    <th>&#10003;</th>
                    <th>&#10005;</th>
                </tr>
            </thead>
            <tbody id="objectiveList"> {
                Objective.all.map(obj => <ObjectiveTableRowView key={obj.rowName} objective={obj} />)
            } </tbody>
        </table>
    </>
}