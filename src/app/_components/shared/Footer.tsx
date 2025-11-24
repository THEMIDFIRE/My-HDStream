import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto pt-24 pb-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7 mb-24">
                    <div>
                        <h4 className="mb-6">Home</h4>
                        <ul className="space-y-6 text-gray-300/70">
                            <li>Categoties</li>
                            <li>Devices</li>
                            <li>Pricing</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6">Movies</h4>
                        <ul className="space-y-6 text-gray-300/70">
                            <li>Genres</li>
                            <li>Trending</li>
                            <li>New Release</li>
                            <li>Popular</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6">TV Shows</h4>
                        <ul className="space-y-6 text-gray-300/70">
                            <li>Genres</li>
                            <li>Trending</li>
                            <li>New Release</li>
                            <li>Popular</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6">Support</h4>
                        <ul className="space-y-6 text-gray-300/70">
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6">Subscription</h4>
                        <ul className="space-y-6 text-gray-300/70">
                            <li>Plans</li>
                            <li>Features</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6">Connect with us</h4>
                        <ul className="flex gap-3.5">
                            <li className="border aspect-square rounded-md">
                                <Button className="text-white h-full bg-slate-100/5 rounded-md hover:bg-slate-100/10">
                                    <Facebook className="size-6" />
                                </Button>
                            </li>
                            <li className="border aspect-square rounded-md">
                                <Button className="text-white h-full bg-slate-100/5 rounded-md hover:bg-slate-100/10">
                                    <Twitter className="size-6" />
                                </Button>
                            </li>
                            <li className="border aspect-square rounded-md">
                                <Button className="text-white h-full bg-slate-100/5 rounded-md hover:bg-slate-100/10">
                                    <Linkedin className="size-6" />
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-sm text-gray-400/80 flex flex-col md:flex-row justify-between space-y-5 border-t pt-6">
                    <p>@2025 My HDStream, All Rights Reserved</p>
                    <div className="flex gap-4">
                        <p>Terms of Use</p>
                        <p className="border-l border-r px-4">Privacy Policy</p>
                        <p>Cookie Policy</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
