import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";
import { columns } from "./columns";
import { EyeIcon, EditIcon, DeleteIcon } from "./icons";

const statusColorMap = {
  COMPLETED: "success",
  CANCELLED: "danger",
  PENDING: "warning",
};

/**
 * @typedef {import('./types').AnswerSumRequest} AnswerSumRequest
 */

/**
 * DiagList component
 * @param {{ Diagnoses: AnswerSumRequest[] }} props
 */
export const DiagList = ({ Diagnoses }) => {
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "patientName":
        return (
          <div className="flex items-center gap-2">
            <User avatarProps={{ radius: "lg", src: user.avatar }} />
            <p className="text-bold text-black text-sm capitalize">{cellValue}</p>
          </div>

        );
      case "diagnosisDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-black text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table 
      aria-label="Example table with custom cells"
      color='secondary'
      defaultSelectedKeys={["2"]}
      selectionMode="single"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={Diagnoses}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

DiagList.propTypes = {
  Diagnoses: PropTypes.array.isRequired, // Ensure it expects an array
};
