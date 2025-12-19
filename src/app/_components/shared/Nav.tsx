"use client"
import { MediaCard } from "@/app/_components/Cards/Cards";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSearch } from "@/hooks/useMovies";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/Movies&Shows", label: "Movies & Shows" },
    { href: "/Support", label: "Support" },
    // { href: "/Subscription", label: "Subscription" },

]

export default function Nav() {
    const path = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState<'movie' | 'tv'>('movie');
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data: searchResults, isLoading } = useSearch(searchType, debouncedQuery);

    const handleSearchTypeChange = (type: 'movie' | 'tv') => {
        setSearchType(type);
    };

    const handleResultClick = (item: any) => {
        const path = searchType === 'movie' ? `/Movies&Shows/movie/${item.id}` : `/Movies&Shows/tv/${item.id}`;
        router.push(path);
        setIsDrawerOpen(false);
        setSearchQuery("");
    };

    const getSearchTypeLabel = () => {
        return searchType === 'movie' ? 'Movies' : 'TV Shows';
    };

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
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerTrigger className="rounded-md p-2 border-2 hover:bg-gray-900">
                            <MagnifyingGlassIcon className="size-6 dark:text-white" />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader className="gap-y-3">
                                <DrawerClose className="w-fit self-end border-[3px] p-1.5 rounded-md">
                                    <X className="size-6" />
                                </DrawerClose>
                                <DrawerTitle className="font-medium text-lg">Search for a Movie/TV Show</DrawerTitle>
                                <div className="md:w-1/2 self-center">
                                    <InputGroup className="[--radius:1rem]">
                                        <InputGroupInput
                                            placeholder="Looking for a Movie/TV Show?"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                                                        {getSearchTypeLabel()} <ChevronDownIcon className="size-3" />
                                                    </InputGroupButton>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="[--radius:0.95rem]">
                                                    <DropdownMenuItem onClick={() => handleSearchTypeChange('movie')}>
                                                        Movies
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleSearchTypeChange('tv')}>
                                                        TV Shows
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </DrawerHeader>
                            <ScrollArea className="h-[80dvh] pb-44">
                                {isLoading && searchQuery && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                                        {Array.from({ length: 10 }).map((_, index) => (
                                            <div key={index} className="aspect-2/3 bg-gray-800 animate-pulse rounded-lg" />
                                        ))}
                                    </div>
                                )}

                                {!isLoading && searchResults && searchResults.results.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                                        {searchResults.results.map((item: any) => (
                                            <div key={item.id} onClick={() => handleResultClick(item)}>
                                                <MediaCard item={item} type={searchType} />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!isLoading && searchQuery && searchResults && searchResults.results.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <MagnifyingGlassIcon className="size-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
                                        <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                                    </div>
                                )}

                                {!searchQuery && (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <MagnifyingGlassIcon className="size-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg">Start typing to search</p>
                                        <p className="text-gray-500 text-sm mt-2">Search for {searchType === 'movie' ? 'movies' : 'TV shows'}</p>
                                    </div>
                                )}
                            </ScrollArea>
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
                                        <Link key={index} prefetch={true} href={link.href} className={`text-black dark:text-white rounded-xl text-lg px-6 py-3.5 font-normal bg-transparent hover:bg-gray-400/30 ${path === link.href ? "bg-gray-200/60 dark:bg-gray-200/10 dark:font-medium px-6" : ""}`}>
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