import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
  } from "@heroui/react";
import { columns } from "./columns";
/**
 * @typedef {import('./types').AnswerSumRequest} AnswerSumRequest
 */


/**
 * DiagList component
 * @param {{ Diagnoses: AnswerSumRequest[] }} props
 */
export const DiagList = ({ Diagnoses }) => {
    const [DiagnosesArray, setCurrentDiagnoses] = useState(Diagnoses);

    useEffect(() => {
        // Ensure we set the state to an array
        setCurrentDiagnoses(Diagnoses);
        console.log("Diagnosed items:", Diagnoses);
    }, [Diagnoses]); 

    return (
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={DiagnosesArray} emptyContent={"No rows to display."} >
            {(item) => (
              <TableRow key={item.patient_id} className="w-full p-4 pr-12 rounded-2xl shadow-[0px_10px_10px_-5px_#cff0ff] border-spacing-20 focus:border-[#16205c]">
                {(columnKey) => (
                  <TableCell className="text-black">
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
    );
};

DiagList.propTypes = {
    Diagnoses: PropTypes.array.isRequired, // Ensure it expects an array
};
