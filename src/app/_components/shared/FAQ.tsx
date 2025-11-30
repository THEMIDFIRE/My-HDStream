import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

const items: { title: string; content: string; }[] = [
    {
        title: "What is MY HDStream?",
        content: "My HDStream is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
        title: "How much does MY HDStream cost?",
        content: "MY HDStream is a subscription-based service that costs $9.99 per month.",
    },
    {
        title: "What content is available on MY HDStream?",
        content: "MY HDStream offers a wide range of movies and TV shows, including popular and exclusive content.",
    },
    {
        title: "How can I watch MY HDStream?",
        content: "You can watch MY HDStream on any device with an internet connection.",
    },
    {
        title: "How do I sign up for MY HDStream?",
        content: "You can sign up for MY HDStream by creating an account on our website.",
    },
    {
        title: "What is the MY HDStream free trial?",
        content: "MY HDStream offers a 7-day free trial for new subscribers.",
    },
    {
        title: "How do I contact MY HDStream customer support?",
        content: "You can contact MY HDStream customer support at support@myhdstream.com.",
    },
    {
        title: "What are the MY HDStream payment methods?",
        content: "MY HDStream accepts credit cards, debit cards, and PayPal.",
    }
]

export default function FAQ() {
    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-y-8 md:items-center mb-14">
                    <div className="space-y-2.5">
                        <h2 className="text-2xl 2xl:text-4xl font-bold">Frequently Asked Questions</h2>
                        <p className="text-gray-200/60 text-sm md:text-base 2xl:text-lg">Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about MY HDStream.</p>
                    </div>
                    <Button className="bg-red-500 text-white font-semibold rounded px-6 py-5">Contact Us</Button>
                </div>
                <Accordion
                    type="single"
                    collapsible
                    className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 md:gap-y-4"
                >
                    <div>
                        {items.slice(0, 4).map((item, index) => (
                            <AccordionItem value={`item-${index}`} className="border-none" key={index}>
                                <AccordionTrigger className="items-center">
                                    <span className="text-base 2xl:text-xl bg-gray-900/80 p-3 rounded-sm border">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                                    <p className="text-lg md:text-xl 2xl:text-2xl grow">{item.title}</p>
                                </AccordionTrigger>
                                <AccordionContent className="text-balance">
                                    <p>
                                        {item.content}
                                    </p>
                                </AccordionContent>
                                <div className="h-px bg-linear-to-r from-red-600/0 from-0% via-red-600 via-30% to-red-600/0 to-80%"></div>
                            </AccordionItem>
                        ))}
                    </div>
                    <div>
                        {items.slice(4, 8).map((item, index) => (
                            <AccordionItem value={`item-${index + 4}`} className="border-none" key={index}>
                                <AccordionTrigger className="items-center">
                                    <span className="text-base 2xl:text-xl bg-gray-900/80 p-3 rounded-sm border">{index + 5 < 10 ? `0${index + 5}` : index + 5}</span>
                                    <p className="text-lg md:text-xl 2xl:text-2xl grow">{item.title}</p>
                                </AccordionTrigger>
                                <AccordionContent className="text-balance">
                                    <p>
                                        {item.content}
                                    </p>
                                </AccordionContent>
                                <div className="h-px bg-linear-to-r from-red-600/0 from-0% via-red-600 via-30% to-red-600/0 to-80%"></div>

                            </AccordionItem>
                        ))}
                    </div>
                </Accordion>
            </div>
        </section>
    )
}
