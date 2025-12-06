"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ShowsGenresCardProps {
    genre: {
        id: number;
        name: string;
    };
}

export default function ShowsGenresCard({ genre }: ShowsGenresCardProps) {
    return (
        <Link href={`/Movies&Shows/shows/genre/${genre.id}`} className="block transition-transform hover:scale-105">
            <Card className="cursor-pointer hover:border-red-500 transition-colors">
                <CardHeader>
                    <CardTitle className="text-center">{genre.name}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}