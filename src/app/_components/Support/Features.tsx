import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Type definitions
interface FeatureLabels {
    title: string;
    price: string;
    content: string;
    devices: string;
    trial: string;
    cancel: string;
    hdr: string;
    dolby: string;
    ads: string;
    offline: string;
    sharing: string;
}

interface Plan {
    title: string;
    popular: boolean;
    price: string;
    content: string;
    devices: string;
    trial: string;
    cancel: boolean;
    hdr: boolean;
    dolby: boolean;
    ads: boolean;
    offline: boolean | string;
    sharing: boolean | string;
}

// Data
const featureLabels: FeatureLabels = {
    title: "Features",
    price: "Price",
    content: "Content",
    devices: "Devices",
    trial: "Free Trial",
    cancel: "Cancel Anytime",
    hdr: "HDR",
    dolby: "Dolby Atmos",
    ads: "Ad-Free",
    offline: "Offline Viewing",
    sharing: "Family Sharing"
};

const plans: Plan[] = [
    {
        title: "Basic",
        popular: false,
        price: "$9.99/Month",
        content: "Access to a wide selection of movies and shows, including some new releases.",
        devices: "Watch on one device simultaneously",
        trial: "7 Days",
        cancel: true,
        hdr: false,
        dolby: false,
        ads: false,
        offline: false,
        sharing: false
    },
    {
        title: "Standard",
        popular: true,
        price: "$12.99/Month",
        content: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
        devices: "Watch on two devices simultaneously",
        trial: "7 Days",
        cancel: true,
        hdr: true,
        dolby: true,
        ads: true,
        offline: "Yes, for select titles.",
        sharing: "Yes, up to 5 family members."
    },
    {
        title: "Premium",
        popular: false,
        price: "$14.99/Month",
        content: "Access to the widest selection of movies and shows, including all new releases and offline viewing",
        devices: "Watch on four devices simultaneously",
        trial: "7 Days",
        cancel: true,
        hdr: true,
        dolby: true,
        ads: true,
        offline: "Yes, for all titles.",
        sharing: "Yes, up to 6 family members."
    }
];

const featureKeys: (keyof Omit<FeatureLabels, 'title'>)[] = [
    'price', 'content', 'devices', 'trial', 'cancel',
    'hdr', 'dolby', 'ads', 'offline', 'sharing'
];

export default function Features() {
    const renderCellValue = (value: boolean | string): string => {
        return typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;
    };

    const PlanHeader = ({ plan }: { plan: Plan }) => (
        <div className="flex items-center gap-2 w-fit">
            {plan.title}
            {plan.popular && (
                <Badge variant="default" className="rounded bg-red-500 text-white hover:bg-red-600 text-xs">
                    Popular
                </Badge>
            )}
        </div>
    );

    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-[91.67%] md:max-w-[80%] mx-auto space-y-10 md:space-y-[60px] 2xl:space-y-20">
                {/* Header Section */}
                <div className="space-y-2 md:space-y-2.5 2xl:space-y-3.5">
                    <h2 className="text-[28px] md:text-4xl 2xl:text-5xl font-bold">
                        Compare our plans and find the right one for you
                    </h2>
                    <p className="text-sm md:text-base 2xl:text-lg font-normal text-gray-500">
                        My HDStream offers three different plans to fit your needs: Basic, Standard, and Premium.
                        Compare the features of each plan and choose the one that's right for you.
                    </p>
                </div>

                {/* Desktop Table - Hidden on Mobile */}
                <Table className="hidden md:block border">
                    <TableHeader className="bg-black text-lg 2xl:text-xl font-semibold">
                        <TableRow>
                            <TableHead className="w-1/4 p-5">{featureLabels.title}</TableHead>
                            {plans.map((plan) => (
                                <TableHead key={plan.title} className="w-1/4 p-5">
                                    <PlanHeader plan={plan} />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="font-medium 2xl:text-lg">
                        {featureKeys.map((featureKey) => (
                            <TableRow key={featureKey}>
                                <TableCell className="p-5 text-gray-300/80">{featureLabels[featureKey]}</TableCell>
                                {plans.map((plan) => (
                                    <TableCell key={`${plan.title}-${featureKey}`} className="whitespace-normal p-5 text-gray-300/80">
                                        {renderCellValue(plan[featureKey])}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Mobile Tabs */}
                <Tabs defaultValue="Standard" className="md:hidden gap-5">
                    <TabsList className="border bg-black w-full h-auto p-2">
                        {plans.map((plan) => (
                            <TabsTrigger
                                key={plan.title}
                                value={plan.title}
                                className="py-3 px-6 data-[state=active]:border-none dark:data-[state=active]:bg-gray-200/10"
                            >
                                {plan.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {plans.map((plan) => (
                        <TabsContent key={plan.title} value={plan.title} className="border">
                            <div className="space-y-6 p-6 rounded-lg border border-gray-800 bg-black">
                                <div className="flex gap-5">
                                    <div className="w-full space-y-1">
                                        <p className="text-gray-400 text-sm font-medium">{featureLabels.price}</p>
                                        <p className="text-sm">{plan.price}</p>
                                    </div>
                                    <div className="w-full space-y-1">
                                        <p className="text-gray-400 text-sm font-medium">{featureLabels.trial}</p>
                                        <p className="text-sm">{plan.trial}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-400 text-sm font-medium">{featureLabels.content}</p>
                                    <p className="text-sm">{plan.content}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-400 text-sm font-medium">{featureLabels.devices}</p>
                                    <p className="text-sm">{plan.devices}</p>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-full space-y-1">
                                        <p className="text-gray-400 text-sm font-medium">{featureLabels.cancel}</p>
                                        <p className="text-sm">{plan.cancel ? 'Yes' : 'No'}</p>
                                    </div>
                                    <div className="w-full space-y-1">
                                        <p className="text-gray-400 text-sm font-medium">{featureLabels.hdr}</p>
                                        <p className="text-sm">{plan.hdr ? 'Yes' : 'No'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-full space-y-1">
                                        <p className="text-gray-400 text-sm font-medium">{featureLabels.dolby}</p>
                                        <p className="text-sm">{plan.dolby ? 'Yes' : 'No'}</p>
                                    </div>
                                    <div className="w-full space-y-1">
                                        <p className="text-gray-400 text-sm font-medium">{featureLabels.ads}</p>
                                        <p className="text-sm">{plan.ads ? 'Yes' : 'No'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-full space-y-1">
                                        <p className="text-gray-400 text-sm font-medium">{featureLabels.offline}</p>
                                        <p className="text-sm">{plan.offline ? plan.offline : 'No'}</p>
                                    </div>
                                    <div className="w-full space-y-1">
                                        <p className="text-gray-400 text-sm font-medium">{featureLabels.sharing}</p>
                                        <p className="text-sm">{plan.sharing ? String(plan.sharing).slice(11) : 'No'}</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}