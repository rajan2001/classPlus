"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MultiSelect } from "../multi-select"


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    startTime: z.string().min(5),
    endTime: z.string().min(5),
    teacherId: z.string(),
    child: z
        .array(z.string().min(1))
        .min(1)
        .nonempty("Please select at least one Child."),
})


const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function ClassRoomForm({ initialData, teachers, child }: any) {

    const fromattedChild = child.map((child: any) => ({
        label: child.firstName,
        value: child.id,
    }))



    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            startTime: '',
            endTime: '',
            teacherId: '',
            child: []

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/dashboard/classroom/${params.teacherId}`, values);
            }
            else {
                await axios.post(`/api/dashboard/classroom`, values);
            }
            form.reset()
            router.refresh();
            toast.success(`${initialData ? "ClassRoom updated Succesfully" : "ClassRoom Created"}`);
        } catch (error: any) {
            toast.error("Something went Wrong");
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Day</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select Day" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                {days.map((day) => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>StartTime</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="font-normal focus:ring-0">
                                                <SelectValue placeholder="Select Start Time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <ScrollArea >
                                                    {Array.from({ length: 96 }).map((_, i) => {
                                                        const hour = Math.floor(i / 4)
                                                            .toString()
                                                            .padStart(2, "0");
                                                        const minute = ((i % 4) * 15)
                                                            .toString()
                                                            .padStart(2, "0");
                                                        return (
                                                            <SelectItem key={i} value={`${hour}:${minute}`}>
                                                                {hour}:{minute}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </ScrollArea>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>EndTime</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="font-normal focus:ring-0">
                                                <SelectValue placeholder="Select End Time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <ScrollArea >
                                                    {Array.from({ length: 96 }).map((_, i) => {
                                                        const hour = Math.floor(i / 4)
                                                            .toString()
                                                            .padStart(2, "0");
                                                        const minute = ((i % 4) * 15)
                                                            .toString()
                                                            .padStart(2, "0");
                                                        return (
                                                            <SelectItem key={i} value={`${hour}:${minute}`}>
                                                                {hour}:{minute}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </ScrollArea>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="teacherId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assign Teacher</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select Teacher" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                {teachers.map((teacher: any) => <SelectItem key={teacher.id} value={teacher.id}>{teacher.firstName}</SelectItem>)}
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="child"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select Children</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={fromattedChild}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            placeholder="Select options"
                                            variant="inverted"
                                            animation={2}
                                            maxCount={3}
                                        />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {initialData ? "Save changes" : "Submit"}
                    </Button>
                </form>
            </Form>
        </>
    )

}
