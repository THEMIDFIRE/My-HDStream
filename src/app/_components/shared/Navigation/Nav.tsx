"use client"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "../../Search/Search";
import WatchLater from "../../WatchLater/WatchLater";
import MobileNav from "./MobileNav";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
                    <div className="space-x-2.5">
                        <Tooltip>
                            <TooltipTrigger>
                                <WatchLater />
                            </TooltipTrigger>
                            <TooltipContent>
                                Watch later list
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Search />
                            </TooltipTrigger>
                            <TooltipContent>
                                Search
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    {/* Mobile Navigation */}
                    <MobileNav links={links} />
                </div>
            </NavigationMenu>
        </>
    )
}