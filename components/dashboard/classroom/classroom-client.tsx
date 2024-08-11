"use client";

import Header from "@/components/dashboard/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";



export const ClassRoomClient: any = ({ data }: any) => {
    const router = useRouter()

    return (
        <>
            <div className="flex items-center justify-between">
                <Header title={`ClassRoom (${data.length})`} description="Manage Classes of your School" />
                <Button onClick={() => router.push(`/dashboard/classroom/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add New
                </Button>
            </div>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};
