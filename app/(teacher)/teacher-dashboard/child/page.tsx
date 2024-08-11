import { ChildClient } from '@/components/dashboard/child/child-client';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { format } from 'date-fns'
import { redirect } from 'next/navigation';


const BillboardsPage = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect('/')
    }

    const filteredData = await prisma?.classroom.findMany({
        where: {
            teacherId: userId
        }
    })

    return (
        <div className=" flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ChildClient data={filteredData} />
            </div>
        </div>
    );
};

export default BillboardsPage;
