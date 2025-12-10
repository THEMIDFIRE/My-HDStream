import { Laptop, Smartphone, Tablet, Tv2 } from "lucide-react"
import { DeviceCard } from "../Cards/Cards"

const devices: { icon: any, title: string, description: string }[] = [
    {
        icon: <Smartphone />,
        title: "Smartphone",
        description: "My HDStream is available on all major smartphones, including iPhone, Android, and Windows Phone."
    },
    {
        icon: <Tablet />,
        title: "Tablet",
        description: "My HDStream is available on all major tablets, including iPad, Android, and Windows Phone."
    },
    {
        icon: <Laptop />,
        title: "Laptop",
        description: "My HDStream is available on all major streaming devices, including Roku, Apple TV, and Amazon Fire TV."
    }
]
export default function Devices() {
    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto space-y-10 md:space-y-[60px] 2xl:space-y-20">
                <div className="space-y-2 md:space-y-2.5 2xl:space-y-3.5">
                    <h2 className="text-[28px] md:text-4xl 2xl:text-5xl font-bold">We Provide you streaming experience across various devices.</h2>
                    <p className="text-sm md:text-base 2xl:text-lg font-normal text-gray-500 md:hidden">With MY HDStream, you can enjoy your favorite movies and TV shows anytime, anywhere.</p>
                    <p className="text-sm md:text-base 2xl:text-lg font-normal text-gray-500 max-md:hidden">With MY HDStream, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 md:gap-7 justify-center items-center">
                    {devices.map((device, index) => (
                        <DeviceCard key={index} {...device} />
                    ))}
                </div>
            </div>
        </section>
    )
}
