"use client"

import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section>
      <div className="container max-w-4/5 mx-auto relative border rounded-lg overflow-hidden">
        <div className="bg-[url('/CTA-bg.png')] bg-cover bg-center bg-no-repeat">
          <div className="bg-linear-to-r from-black to-red-600/50 from-20% via-20% to-80% flex justify-between items-center px-20 py-24">
            <div className="space-y-3.5">
              <h3 className="text-5xl font-bold">Start your free trial today!</h3>
              <p className="text-lg text-gray-400">This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
            </div>
            <Button className="text-white bg-red-600 hover:bg-red-700 text-lg p-6">Start free trial</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
