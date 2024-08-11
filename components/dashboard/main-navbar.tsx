"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNavBar = ({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/dashboard`,
            label: "Overview",
            active: pathname === `/dashboard`
        },
        {
            href: `/dashboard/teacher`,
            label: "Teacher List",
            active: pathname === `/dashboard/teacher`
        },
        {
            href: `/dashboard/child`,
            label: "Child List",
            active: pathname === `/dashboard/child`
        },
        {
            href: `/dashboard/classroom`,
            label: "Classroom List",
            active: pathname === `/dashboard/classroom`
        },
    ];
    return (
        <nav className={cn("flex flex-col  space-y-7", className)}>
            {routes.map((route) => (
                <Link
                    href={route.href}
                    key={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-white",
                        route.active
                            ? "text-white"
                            : "text-muted-foreground"
                    )}>
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};

export default MainNavBar;
