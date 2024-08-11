"use client";

import Header from "@/components/dashboard/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { columns } from "@/components/dashboard/teacher/column";
import { DataTable } from "@/components/ui/data-table";



export const TeacherClient: any = ({ data }: any) => {
    const router = useRouter()

    return (
        <>
            <div className="flex items-center justify-between">
                <Header title={`Teachers (${data.length})`} description="Manage Teachers of your School" />
                <Button onClick={() => router.push(`/dashboard/teacher/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add New
                </Button>
            </div>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};
