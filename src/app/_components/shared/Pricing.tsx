"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PriceCard from "../Cards/PriceCard"
import { useState } from "react"

const monthlyPrices: { title: string, description: string, price: number, currency: string, period: string }[] = [
    {
        title: 'Basic Plan',
        description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
        price: 9.99,
        currency: "$",
        period: "month",
    },
    {
        title: "Standard Plan",
        description: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
        price: 12.99,
        currency: "$",
        period: "month",
    },
    {
        title: "Premium Plan",
        description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
        price: 14.99,
        currency: "$",
        period: "month",
    }
]
const yearlyPrices: { title: string, description: string, price: number, currency: string, period: string }[] = [
    {
        title: 'Basic Plan',
        description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
        price: 9.99,
        currency: "$",
        period: "year",
    },
    {
        title: "Standard Plan",
        description: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
        price: 12.99,
        currency: "$",
        period: "year",
    },
    {
        title: "Premium Plan",
        description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
        price: 14.99,
        currency: "$",
        period: "year",
    }
]
export default function Pricing() {
    const [activeTab, setActiveTab] = useState("monthly")
    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-y-5 md:items-center mb-14">
                    <div className="space-y-2 md:space-y-2.5 2xl:space-y-3.5">
                        <h2 className="text-[28px] md:text-4xl 2xl:text-5xl font-bold">Choose the plan that's right for you</h2>
                        <p className="text-gray-200/60 text-sm md:text-base 2xl:text-lg">Join My HDStream and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
                    </div>
                    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="h-auto p-2 2xl:p-2.5 bg-black border *:border-none">
                            <TabsTrigger className="py-3 px-5 2xl:py-3.5 2xl:px-6 text-sm 2xl:text-lg font-medium dark:data-[state=active]:bg-gray-400/20" value="monthly" onClick={() => setActiveTab("monthly")}>Monthly</TabsTrigger>
                            <TabsTrigger className="py-3 px-5 2xl:py-3.5 2xl:px-6 text-sm 2xl:text-lg font-medium dark:data-[state=active]:bg-gray-400/20" value="yearly" onClick={() => setActiveTab("yearly")}>Yearly</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
                    <TabsContent value="monthly">
                        <div className="flex flex-wrap justify-center items-center gap-4 2xl:gap-7">
                            {monthlyPrices.map((price, index) => (
                                <PriceCard key={index} {...price} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="yearly">
                        <div className="flex flex-wrap justify-center items-center gap-4 2xl:gap-7">
                            {yearlyPrices.map((price, index) => (
                                <PriceCard key={index} {...price} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
