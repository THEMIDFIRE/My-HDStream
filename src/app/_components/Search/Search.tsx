import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSearch } from '@/hooks/useMovies'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MediaCard } from '../Cards/Cards'
import { Button } from '@/components/ui/button'

export default function Search() {
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
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} repositionInputs={false}>
            <DrawerTrigger className="rounded-md p-2 border-2 hover:bg-gray-900" asChild>
                <Button variant={'ghost'} size={'icon'}>
                    <MagnifyingGlassIcon className="size-6 dark:text-white" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[90dvh]">
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
                <ScrollArea className="h-[80dvh] pb-10 md:pb-44">
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
    )
}
