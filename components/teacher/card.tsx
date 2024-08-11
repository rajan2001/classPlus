import { auth, clerkClient } from "@clerk/nextjs/server";
import { GroupIcon, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";



export default async function Card() {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  const children = await prisma?.classroom.findMany({
    where: {
      teacherId: userId
    }
  })



  const stats = [

    {
      id: 2,
      name: "Total Children",
      stat: children?.length,
      icon: GroupIcon,
      href: "/teacher-dashboard/child"
    },

  ];

  return (
    <>
      <h3 className='text-base font-semibold leading-6 text-gray-900'>
        Number of Children
      </h3>

      <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {stats.map((item) => (
          <div
            key={item.id}
            className='relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6'>
            <dt>
              <div className='absolute rounded-md bg-gray-900 p-3'>
                <item.icon aria-hidden='true' className='h-6 w-6 text-white' />
              </div>
              <p className='ml-16 truncate text-sm font-medium text-gray-500'>
                {item.name}
              </p>
            </dt>
            <dd className='ml-16 flex items-baseline pb-6 sm:pb-7'>
              <p className='text-2xl font-semibold text-gray-900'>
                {item.stat}
              </p>

              <div className='absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6'>
                <div className='text-sm'>
                  <Link
                    href={item.href}
                    className='font-medium text-gray-500 hover:text-gray-800'>
                    View all
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </div>
    </>
  )

}
