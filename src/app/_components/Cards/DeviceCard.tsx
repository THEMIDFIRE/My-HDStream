import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DeviceCard({ icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <Card className="border p-6 h-full md:p-10 bg-linear-to-tr from-black to-red-900/25 from-35% to-90%">
            <CardHeader className="space-y-5">
                <CardTitle className="flex items-center gap-2.5 text-lg md:text-xl xl:text-2xl font-semibold">
                    <span className="[&>svg]:fill-red-700 [&>svg]:text-accent border rounded-xl p-2.5 md:p-3 xl:p-4 bg-gray-900/40 [&>svg]:size-11 [&>svg]:md:size-12 [&>svg]:xl:size-14">{icon}</span>
                    {title}
                </CardTitle>
                <CardDescription className="text-sm md:text-base lg:text-lg font-normal">{description}</CardDescription>
            </CardHeader>
        </Card>
    )
}
