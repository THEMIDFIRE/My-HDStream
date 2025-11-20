"use client"
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const links: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/Movies&Shows", label: "Movies & Shows" },
    { href: "/Support", label: "Support" },
    { href: "/Subscription", label: "Subscription" },
]

const others: { icon: any; label: string }[] = [
    { icon: <MagnifyingGlassIcon className="size-6 dark:text-white" />, label: "Search" },
    { icon: <BellIcon className="size-6 dark:text-white" />, label: "Notifications" }
]

export default function Nav() {
    const path = usePathname();
    const router = useRouter();
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
                <NavigationMenuList className="border-4 rounded-md p-2.5 gap-7">
                    {links.map((link) => (
                        <NavigationMenuItem key={link.href}>
                            <NavigationMenuLink asChild>
                                <Button onClick={() => router.push(link.href)} className={`text-black dark:text-white rounded-[8px] text-lg px-6 py-3.5 font-normal bg-transparent ${path === link.href ? "bg-gray-200/60 dark:bg-gray-200/10 dark:font-medium px-6" : ""}`}>
                                    {link.label}
                                </Button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
                <NavigationMenuList>
                    {others.map((other, index) => (
                        <NavigationMenuItem key={index}>
                            <NavigationMenuLink asChild>
                                <Button className={`text-black dark:text-white rounded-[8px] text-lg px-6 py-3.5 font-normal bg-transparent`}>
                                    {other.icon}
                                </Button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
