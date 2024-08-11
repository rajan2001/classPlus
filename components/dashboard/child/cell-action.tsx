"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { EditIcon, MoreHorizontal, TrashIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const CellAction = ({ data }: any) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    async function onDelete() {
        try {
            setLoading(true);
            await axios.delete(`/api/dashboard/child/${data.id}`);
            router.refresh();
            toast.success("Child deleted");
        } catch (error) {
            toast.error(
                "Something went Wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/child/${data.id}`)} disabled={loading}>
                        <EditIcon className="h-4 w-4 mr-2" />
                        Update</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete()} disabled={loading}>
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}


export default CellAction