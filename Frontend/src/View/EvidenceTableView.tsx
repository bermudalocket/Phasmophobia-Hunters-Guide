import React, { FC } from 'react';
import { Evidence } from "../../../Shared Model/Evidence";
import { EvidenceTableRowView } from "./EvidenceTableRowView";

export const EvidenceTableView: FC<{}> = () => {
    return <table id="selectionTable">
        <thead>
        <tr>
            <th>Signs</th>
            <th>&#10003;</th>
            <th>&#10005;</th>
            <th>?</th>
        </tr>
        </thead>
        <tbody id="rx-evidence-table"> {
            Evidence.all.map(evidence => <EvidenceTableRowView key={evidence.name} evidence={evidence} />)
        } </tbody>
    </table>;
}