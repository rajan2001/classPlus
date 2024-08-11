import { ClassRoomClient } from '@/components/dashboard/classroom/classroom-client';
import { auth, clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/connectdb';
import { format } from 'date-fns'
import { redirect } from 'next/navigation';


const BillboardsPage = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect('/')
    }

    const response = await prisma.classroom.findMany({})

    const Userdata = await clerkClient.users.getUserList({
        userId: response.map((data: any) => data.teacherId)
    })

    const formattedBillboards: any = response.map((item: any) => ({
        id: item.id,
        name: item.name,
        startTime: item.startTime,
        endTime: item.endTIme,
        teacher: item.teacherId,
        child: item.child.length,
        createdAt: format(item.createdAt, "MMMM do,yyyy"),
    }));

    const finaldata = JSON.parse(JSON.stringify(Userdata)).data.map((value: any, index: any) => {
        return {
            ...formattedBillboards[index],
            teacher: value.firstName
        }
    })



    return (
        <div className=" flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ClassRoomClient data={finaldata} />
            </div>
        </div>
    );
};

export default BillboardsPage;
