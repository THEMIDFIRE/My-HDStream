import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Popcorn, X } from "lucide-react";
import { MediaCard } from "../Cards/Cards";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WatchLater() {
    const [watchLaterItems, setWatchLaterItems] = useState<any[]>([]);

    useEffect(() => {
        loadWatchLaterItems();
    }, []);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "watchLater") {
                loadWatchLaterItems();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        const handleWatchLaterUpdate = () => {
            loadWatchLaterItems();
        };

        window.addEventListener("watchLaterUpdated", handleWatchLaterUpdate);
        return () => window.removeEventListener("watchLaterUpdated", handleWatchLaterUpdate);
    }, []);

    const loadWatchLaterItems = () => {
        const items = JSON.parse(localStorage.getItem("watchLater") || "[]");
        setWatchLaterItems(items);
    };

    const clearWatchLater = () => {
        localStorage.removeItem("watchLater");
        setWatchLaterItems([]);
        window.dispatchEvent(new Event('watchLaterUpdated'));
    };

    const removeItem = (itemId: number) => {
        const watchLater = localStorage.getItem('watchLater') || '[]';
        const watchLaterList = JSON.parse(watchLater);
        const updatedList = watchLaterList.filter((item: any) => item.id !== itemId);

        localStorage.setItem('watchLater', JSON.stringify(updatedList));
        setWatchLaterItems(updatedList);

        window.dispatchEvent(new Event('watchLaterUpdated'));
    };

    return (
        <Drawer direction="left">
            <DrawerTrigger className="rounded-md p-2 border-2 hover:bg-gray-900" asChild>
                <Button variant={"ghost"} size={"icon"}>
                    <Popcorn className="size-6 dark:text-white" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-lg">
                <DrawerHeader className="gap-y-3">
                    <DrawerClose className="w-fit self-end border-[3px] p-1.5 rounded-md">
                        <X className="size-6" />
                    </DrawerClose>
                    <DrawerTitle className="font-medium text-lg">Watch Later</DrawerTitle>
                    <Button onClick={clearWatchLater} variant={"destructive"}
                        disabled={watchLaterItems.length === 0}>Delete All</Button>
                </DrawerHeader>
                <ScrollArea className="h-[80dvh]">
                    <div className="grid grid-cols-2 gap-3 p-4 overflow-y-auto">
                        {watchLaterItems.length === 0 ? (
                            <p className="text-center w-full text-gray-500 col-span-2">No items in Watch Later.</p>
                        ) : (
                            watchLaterItems.map((item: any) => (
                                <Link key={item.id} href={`/${item.type === 'movie' ? 'Movies&Shows/movie' : 'Movies&Shows/tv'}/${item.id}`}>
                                    <MediaCard
                                        item={item}
                                        showRemoveButton={true}
                                        onRemove={removeItem}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}