'use client'

import MainNavBar from '@/components/dashboard/main-navbar'
import { UserButton } from '@clerk/nextjs'
import { BadgeIcon, CircleBackslashIcon, SketchLogoIcon } from '@radix-ui/react-icons'

const SideBar = () => {
    return <div className=" fixed inset-y-0 z-50 flex w-72 flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
                <SketchLogoIcon className='h-8 w-8 text-white' />
            </div>
            <nav className="flex flex-1 flex-col">
                <MainNavBar />
                <div className="mt-auto">
                    <UserButton />
                </div>
            </nav>
        </div>
    </div>
}

export default SideBar