"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboradColumn = {
    id: string
    name: string
    startTime: string
    endTime: string
    teacher: string
    child: string
}

export const columns: ColumnDef<BillboradColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "startTime",
        header: "StartTime",
    },
    {
        accessorKey: "endTime",
        header: "EndTime",
    },
    {
        accessorKey: "teacher",
        header: "Teacher",
    },
    {
        accessorKey: "child",
        header: "No.of Child",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => {

            return <CellAction data={row.original} />
        },
    }
]
