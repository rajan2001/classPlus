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
            href: `/teacher-dashboard`,
            label: "Overview",
            active: pathname === `/teacher-dashboard`
        },
        {
            href: `/teacher-dashboard/child`,
            label: "Children",
            active: pathname === `/teacher-dashboard/child`
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
