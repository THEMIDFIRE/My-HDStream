import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav({links}: {links: { href: string; label: string }[]}) {
    const path = usePathname()
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger className="border-4 p-2 rounded-lg bg-gray-950">
                    <Bars3BottomRightIcon className="size-8" />
                </SheetTrigger>
                <SheetContent className="lg:hidden">
                    <div className="flex flex-col grow gap-6 justify-center items-center align-middle">
                        {links.map((link, index) => (
                            <Link key={index} prefetch={true} href={link.href} className={`text-black dark:text-white rounded-xl text-lg px-6 py-3.5 font-normal bg-transparent hover:bg-gray-400/30 ${path === link.href ? "bg-gray-200/60 dark:bg-gray-200/10 dark:font-medium px-6" : ""}`}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
