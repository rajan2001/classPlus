import SideBar from "@/components/teacher/sidebar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";



export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in")
    }


    return (

        <div >
            <Toaster />
            <SideBar />
            <div className="pl-72 py-10">
                {children}
            </div>
        </div>

    )
}