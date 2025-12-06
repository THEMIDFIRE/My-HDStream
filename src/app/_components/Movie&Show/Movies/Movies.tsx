import { Badge } from "@/components/ui/badge";
import Genres from "./Genres";

export default function Movies({ genres }: any) {
    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto border p-10 relative">
                <Badge variant={"default"} className="text-lg 2xl:text-xl font-semibold rounded bg-red-500 text-white py-2.5 px-6 absolute top-0 left-5 -translate-y-1/2">Movies</Badge>
                <Genres genres={genres} />
            </div>
        </section>
    )
}
