import React, { FC } from "react";
import Ghost from "../Model/Ghost";
import { GhostTableRowView } from "./GhostTableRowView";
import { Table, Tbody, Th, Text, Thead, Tr } from "@chakra-ui/react"

export const GhostTableView: FC<{}> = () => {

    return <>
        <Table>
            <Thead>
                <Tr>
                    <Th colSpan={4}>
                        <Text p={2} w={250} bgGradient="linear(to-r, green.200, pink.500)" fontSize="2xl" fontWeight="extrabold" bgClip="text">
                            SPIRIT EVIDENCE
                        </Text>
                    </Th>
                </Tr>
            </Thead>
            <Tbody id="rx-ghosts-table">
                { Ghost.all.map(ghost => <GhostTableRowView key={ghost.name} ghost={ghost} />) }
            </Tbody>
        </Table>
    </>
}