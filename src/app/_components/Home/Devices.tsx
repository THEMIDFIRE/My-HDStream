import { Laptop, Smartphone, Tablet, Tv2 } from "lucide-react"
import DeviceCard from "../Cards/DeviceCard"

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
        <section className="mb-20">
            <div className="container max-w-11/12 mx-auto space-y-10">
                <div className="space-y-2.5">
                    <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold">We Provide you streaming experience across various devices.</h2>
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
