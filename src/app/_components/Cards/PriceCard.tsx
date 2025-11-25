import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PriceCard({ title, description, price, currency, period }: { title: string, description: string, price: number, currency: string, period: string }) {
  return (
    <>
      <Card className="min-w-[30%] 2xl:px-7 2xl:py-12 space-y-2 md:space-y-3 2xl:space-y-7">
        <CardHeader className="space-y-2.5 md:space-y-3 2xl:space-y-4">
          <CardTitle className="text-lg md:text-xl 2xl:text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-sm md:text-base 2xl:text-lg text-gray-300/50">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm md:text-base 2xl:text-lg font-medium text-gray-300/50">
          <span className="text-white text-2xl md:text-3xl 2xl:text-4xl font-semibold">{currency}{price}</span> /{period}
        </CardContent>
        <CardFooter className="gap-3 justify-center">
          <Button className="bg-black text-white text-sm 2xl:text-lg font-semibold rounded px-7 py-6 ">Start free trial</Button>
          <Button className="bg-red-500 text-white text-sm 2xl:text-lg font-semibold rounded px-7 py-6 ">Choose Plan</Button>
        </CardFooter>
      </Card>
    </>
  )
}
