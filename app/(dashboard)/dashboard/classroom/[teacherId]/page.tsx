import ClassRoomForm from "@/components/dashboard/create-class";
import { auth, clerkClient } from "@clerk/nextjs/server";

const Page = async ({ params }: { params: { teacherId: string } }) => {

    const { userId } = auth();

    const ListOfUser: any = userId && await clerkClient.users.getUserList({})

    const Teachers = ListOfUser?.data.filter((user: any) => user.publicMetadata.role === "TEACHER")
    const children = ListOfUser?.data.filter((user: any) => user.publicMetadata.role === "CHILD")
    const response = await prisma?.classroom.findUnique({
        where: {
            id: params.teacherId
        }
    })

    const formattedData = response && {
        name: response.name,
        startTime: response.startTime,
        endTime: response.endTIme,
        teacherId: response.teacherId,
        child: response.child
    }

    return <div className="px-4 sm:px-6 lg:px-8">
        <ClassRoomForm initialData={formattedData} teachers={JSON.parse(JSON.stringify(Teachers))} child={JSON.parse(JSON.stringify(children))} />
    </div>
}

export default Page