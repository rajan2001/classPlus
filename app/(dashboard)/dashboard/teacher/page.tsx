import { TeacherClient } from '@/components/dashboard/teacher/teacher-client';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { format } from 'date-fns'
import { redirect } from 'next/navigation';


const BillboardsPage = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect('/')
    }

    const response = await clerkClient.users.getUserList();

    const formattedBillboards: any = JSON.parse(JSON.stringify(response)).data.map((item: any) => ({
        id: item.id,
        name: item.firstName,
        email: item.emailAddresses[0].emailAddress,
        role: item.publicMetadata.role,
        createdAt: format(item.createdAt, "MMMM do,yyyy"),
    }));

    const filteredData: any = formattedBillboards.filter((data: any) => data.role === "TEACHER")

    return (
        <div className=" flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TeacherClient data={filteredData} />
            </div>
        </div>
    );
};

export default BillboardsPage;
