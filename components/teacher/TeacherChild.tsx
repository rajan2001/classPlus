"use client";

import Header from "@/components/dashboard/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { columns } from "@/components/dashboard/teacher/column";
import { DataTable } from "@/components/ui/data-table";



export const TeacherChild: any = ({ data }: any) => {
    const router = useRouter()

    return (
        <>
            <div className="flex items-center justify-between">
                <Header title={`Child (${data.length})`} description="Manage Children of your classroom" />
                <Button onClick={() => router.push(`/dashboard/child/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add New
                </Button>
            </div>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};
