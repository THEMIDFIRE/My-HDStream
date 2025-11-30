import Image from "next/image";

export default function ContactForm() {
    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div>
                        <h2>Welcome to our support page!</h2>
                        <p>We're here to help you with any problems you may be having with our product.</p>
                        <Image
                        src={"/Support-img.png"}
                        width={449} height={547}
                        alt="Support Image"
                        className="border-8 rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
