import ChildForm from "@/components/dashboard/create-child"
import { clerkClient } from "@clerk/nextjs/server";

const Page = async ({ params }: { params: { childId: string } }) => {



    const child = params.childId === "new" ? null : await clerkClient.users.getUser(params.childId);

    const formattedData = child && {
        name: child?.firstName,
        email: child.emailAddresses[0].emailAddress
    }


    return <div className="px-4 sm:px-6 lg:px-8">
        <ChildForm initialData={formattedData} />
    </div>
}

export default Page