"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
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
            <NavigationMenu className="fixed top-0 z-50 inset-x-0 max-w-11/12 md::max-w-4/5 mx-auto justify-between items-center py-6">
                <Link href="/" className="flex flex-row items-center gap-1 text-md xl:text-xl font-bold hover:bg-transparent">
                    <img src="/logo.svg" alt="My HDStream" className="size-1/4" />
                    <h1>My HDStream</h1>
                </Link>
                {/* Links */}
                <NavigationMenuList className="border-4 rounded-md p-2.5 gap-7 bg-black hidden lg:flex">
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
                {/* Others */}
                <NavigationMenuList className="hidden lg:flex">
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
                <Sheet>
                    <SheetTrigger className="border-4 p-2 rounded-lg bg-gray-950">
                        <Bars3BottomRightIcon className="size-8" />
                    </SheetTrigger>
                    <SheetContent>
                        <div className="flex flex-col grow gap-6 justify-center items-center align-middle">
                            {links.map((link, index) => (
                                <Button key={index} onClick={() => router.push(link.href)} className={`text-black dark:text-white rounded-[8px] text-lg px-6 py-3.5 font-normal bg-transparent hover:bg-gray-400/30 ${path === link.href ? "bg-gray-200/60 dark:bg-gray-200/10 dark:font-medium px-6" : ""}`}>
                                    {link.label}
                                </Button>
                            ))}
                        </div>
                        <SheetFooter>
                            <form className="flex items-center gap-3">
                                <Input id="search" placeholder="Looking for a Movie/TV Show?" />
                                <MagnifyingGlassIcon className="size-7" />
                            </form>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </NavigationMenu>
        </>
    )
}
