import React, { FC } from "react";
import Objective from "../Model/Objective";
import { ObjectiveTableRowView } from "./ObjectiveTableRowView";
import { CheckIcon, CloseIcon, TimeIcon } from "@chakra-ui/icons";
import { Table, Tr, Td, Tbody, Thead, HStack, Text } from "@chakra-ui/react";

export const ObjectivesTableView: FC<{}> = () => {
    return <Table variant="simple" >
            <Thead>
                <Tr>
                    <Td>
                        <Text bgGradient="linear(to-r, green.200, pink.500)" fontSize="2xl" fontWeight="extrabold" bgClip="text">
                            OBJECTIVES
                        </Text>
                    </Td>
                    <Td>
                        <HStack>
                            <CheckIcon color="green.200" w={4} h={4} />
                            <CloseIcon color="red.200" w={4} h={3} />
                            <TimeIcon color="blue.200" w={4} h={4} />
                            <Text w={4} h={4} />
                        </HStack>
                    </Td>
                </Tr>
            </Thead>
            <Tbody>{
                Objective.all.map(o => <ObjectiveTableRowView key={o.rowName} objective={o} />)
            }</Tbody>
        </Table>
}