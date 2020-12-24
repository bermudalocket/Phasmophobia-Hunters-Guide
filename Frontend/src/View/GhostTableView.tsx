import { FC } from "react";
import { Ghost } from "../../../Shared Model/Ghost";
import { GhostTableRowView } from "./GhostTableRowView";

export const GhostTableView: FC<{}> = () => {
    return <table id="ghostTable">
            <thead>
            <tr>
                <th className="tableHeader">Spirit Evidence</th>
            </tr>
            </thead>
            <tbody id="rx-ghosts-table"> {
                Ghost.all.map(ghost => <GhostTableRowView key={ghost.name} ghost={ghost} />)
            } </tbody>
        </table>
}