"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { PhoneInput } from "./PhoneInput";

const schema = z.object({
    firstName: z.string().min(2, {
        message: "Please enter your first name",
    }),
    lastName: z.string().min(2, {
        message: "Please enter your last name",
    }),
    email: z.email({
        message: "Please enter a valid email address",
    }),
    phoneNumber: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    message: z.string().min(2, {
        message: "Please enter your message",
    }).max(100, {
        message: "Message must be at most 100 characters long",
    }),
})

export default function ContactForm() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            message: "",
        },
    })

    function onSubmit(data: z.output<typeof schema>) {
        console.log(data);
        form.reset()
    }

    return (
        <section>
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between gap-12 2xl:gap-20">
                    <div className="md:max-w-2/5 space-y-2.5">
                        <h2 className="text-[28px] md:text-4xl 2xl:text-5xl font-bold">Welcome to our support page!</h2>
                        <p className="text-sm md:text-base 2xl:text-lg font-normal text-gray-400">We're here to help you with any problems you may be having with our product.</p>
                        <div className="relative border-8 rounded-lg mt-8 md:mt-10 2xl:mt-12 min-h-2/3">
                            <Image
                                src={"/Support-img.png"}
                                fill
                                alt="Support Image"
                                className=" object-cover"
                            />
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grow flex md:flex-col bg-black border rounded-xl h-fit p-10 space-y-5">
                            <FieldGroup>
                                <div className="flex max-md:flex-col gap-5">
                                    <Controller name="firstName"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="firstName">
                                                    First Name
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    id="firstName"
                                                    placeholder="Enter your first name"
                                                    autoComplete="off"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller name="lastName"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="lastName">
                                                    Last Name
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    id="lastName"
                                                    placeholder="Enter your last name"
                                                    autoComplete="off"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>
                                <div className="flex max-md:flex-col gap-5">
                                    <Controller name="email"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="email">
                                                    Email
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    id="email"
                                                    placeholder="Enter your email"
                                                    autoComplete="off"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller name="phoneNumber"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="phoneNumber">
                                                    Phone Number
                                                </FieldLabel>
                                                <PhoneInput id="phoneNumber" placeholder="Enter phone number" {...field} />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>
                                <Controller name="message"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="message">
                                                Message
                                            </FieldLabel>
                                            <InputGroup>
                                                <InputGroupTextarea
                                                    {...field}
                                                    id="message"
                                                    placeholder="Enter your message."
                                                    rows={6}
                                                    className="min-h-24 resize-none"
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                <InputGroupAddon align="block-end">
                                                    <InputGroupText className="tabular-nums">
                                                        {field?.value?.length}/100 characters
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Button type="submit" className="text-sm font-semibold w-full md:w-fit bg-red-500 text-white py-6 px-7 rounded-md md:self-end">Send Message</Button>
                            </FieldGroup>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}