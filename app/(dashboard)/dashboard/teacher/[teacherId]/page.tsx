import TeacherForm from "@/components/dashboard/create-teacher"
import { clerkClient } from "@clerk/nextjs/server";

const Page = async ({ params }: { params: { teacherId: string } }) => {



    const teacher = params.teacherId === "new" ? null : await clerkClient.users.getUser(params.teacherId);

    const formattedData = teacher && {
        name: teacher?.firstName,
        email: teacher.emailAddresses[0].emailAddress
    }


    return <div className="px-4 sm:px-6 lg:px-8">
        <TeacherForm initialData={formattedData} />
    </div>
}

export default Page