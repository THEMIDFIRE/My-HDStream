"use client"
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/Movies&Shows", label: "Movies & Shows" },
    { href: "/Support", label: "Support" },
    // { href: "/Subscription", label: "Subscription" },
]

export default function Nav() {
    const path = usePathname();

    return (
        <>
            <NavigationMenu className="justify-between max-w-full z-50 sticky top-0 backdrop-blur-xs">
                <div className="container max-w-11/12 md:max-w-4/5 mx-auto flex justify-between items-center py-6">
                    <Link href="/" className="flex flex-row items-center gap-1.5 font-semibold hover:bg-transparent">
                        <img src="/logo.svg" alt="My HDStream" className="size-1/4" />
                        <h2 className="text-lg">My HDStream</h2>
                    </Link>
                    <NavigationMenuList className="border-4 rounded-md p-2.5 gap-7 bg-black max-md:hidden">
                        {links.map((link) => (
                            <NavigationMenuItem key={link.href}>
                                <NavigationMenuLink href={link.href} className={`text-gray-500 rounded-md text-sm xl:text-lg xl:px-8 xl:py-6 font-normal bg-transparent ${path === link.href ? "text-white bg-gray-200/60 dark:bg-gray-200/10 font-medium" : ""}`}>
                                    {link.label}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                    <Drawer>
                        <DrawerTrigger className="rounded-md p-2 border-2 hover:bg-gray-900">
                            <MagnifyingGlassIcon className="size-6 dark:text-white " />
                        </DrawerTrigger>
                        <DrawerContent className="h-[80dvh]">
                            <DrawerHeader className="gap-y-3">
                                <DrawerClose className="w-fit self-end border-[3px] p-1.5 rounded-md">
                                    <X className="size-6" />
                                </DrawerClose>
                                <DrawerTitle className="font-medium text-lg">Looking for a Movie/TV Show?</DrawerTitle>
                                <form className="md:w-1/2 self-center">
                                    <Input className="" id="search" placeholder="Looking for a Movie/TV Show?" />
                                </form>
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger className="border-4 p-2 rounded-lg bg-gray-950">
                                <Bars3BottomRightIcon className="size-8" />
                            </SheetTrigger>
                            <SheetContent className="lg:hidden">
                                <div className="flex flex-col grow gap-6 justify-center items-center align-middle">
                                    {links.map((link, index) => (
                                        <Link prefetch={true} href={link.href} className={`text-black dark:text-white rounded-xl text-lg px-6 py-3.5 font-normal bg-transparent hover:bg-gray-400/30 ${path === link.href ? "bg-gray-200/60 dark:bg-gray-200/10 dark:font-medium px-6" : ""}`}>
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </NavigationMenu>
        </>
    )
}
