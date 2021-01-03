import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Text, Table, Thead, Tr, Td, Th, HStack, Tbody } from '@chakra-ui/react';
import React, { FC } from 'react';
import Evidence from "../Model/Evidence";
import { EvidenceTableRowView } from './EvidenceTableRowView';

export const EvidenceTableView: FC<{}> = () => {
    return <Table variant="simple" w="100%">
        <Thead>
            <Tr>
                <Th>
                    <Text p={2} w={150} bgGradient="linear(to-r, green.200, pink.500)" fontSize="2xl" fontWeight="extrabold" bgClip="text">
                        EVIDENCE
                    </Text>
                </Th>
                <Td>
                    <HStack>
                        <CheckIcon color="green.200" w={4} h={4} />
                        <CloseIcon color="red.200" w={4} h={3} />
                    </HStack>
                </Td>
            </Tr>
        </Thead>
        <Tbody>
            { Evidence.all.map(e => <EvidenceTableRowView key={e.rowName} evidence={e} />) }
        </Tbody>
    </Table>
}