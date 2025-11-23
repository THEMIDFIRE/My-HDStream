"use client"

import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section>
      <div className="container max-w-11/12 lg:max-w-4/5 mx-auto relative border shadow rounded-lg overflow-hidden">
        <div className="bg-[url('/CTA-bg-mobile.png')] md:bg-[url('/CTA-bg.png')] bg-cover bg-center bg-no-repeat">
          <div className="bg-linear-to-b md:bg-linear-to-r from-black to-red-600/50 from-0% via-60% to-90% md:from-20% md:via-20% md:to-80% flex flex-col md:flex-row justify-between items-center max-md:px-7 max-md:py-12 lg:px-20 lg:py-24 max-md:space-y-12">
            <div className="space-y-3.5 max-md:text-center">
              <h3 className="text-2xl md:text-5xl font-bold">Start your free trial today!</h3>
              <p className="2xl:text-lg text-gray-400">This is a clear and concise call to action that encourages users to sign up for a free trial of My HDStream.</p>
            </div>
            <Button className="text-white bg-red-600 hover:bg-red-700 text-lg p-6">Start free trial</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
