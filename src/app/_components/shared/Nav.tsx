"use client"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/Movies&Shows", label: "Movies & Shows" },
    { href: "/Support", label: "Support" },
    { href: "/Subscription", label: "Subscription" },
]

const others: { icon: any; label: string }[] = [
    { icon: <MagnifyingGlassIcon />, label: "Search" },
    { icon: <BellIcon />, label: "Notifications" }
]

export default function Nav() {
    const path = usePathname();
    return (
        <>
            <NavigationMenu className="max-w-full justify-between items-center py-6 px-16">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/" className="flex flex-row items-center gap-1 text-xl font-bold">
                            <Image src="/logo.svg" alt="Abstract Design" width={60} height={60} />
                            My HDStream
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList className="border-2 rounded-md p-2.5">
                    {links.map((link) => (
                        <NavigationMenuItem key={link.href}>
                            <NavigationMenuLink asChild>
                                <Link href={link.href} className={`rounded-[8px] text-lg px-6 py-3.5 font-normal ${path === link.href ? "bg-gray-100/5 font-medium " : ""}`}>{link.label}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
                <NavigationMenuList>
                    {others.map((other) => (
                        <NavigationMenuItem key={other.label}>
                            <NavigationMenuLink href={other.icon}>
                                {other.icon}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
