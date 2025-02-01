import { Button } from "@/shared/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/shared/ui/form";
import Heading from "@/shared/ui/heading";
import { Input } from "@/shared/ui/input/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRegisterMutation } from "../model/api/register/useRegisterMutation";

export const RegisterForm = () => {
    const loginMutation = useRegisterMutation();
    const { mutate, isPending } = loginMutation;

    const formSchema = z
        .object({
            email: z.string().min(1).email(),
            password: z.string().min(4),
            passwordRepeat: z.string(),
        })
        .refine((args) => args.password === args.passwordRepeat, {
            message: "Passwords must match",
            path: ["passwordRepeat"],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordRepeat: "",
        },
    });

    const onSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        mutate(
            { email, password },
            {
                onError: (error) => {
                    toast.error("Error", {
                        description: error.message,
                        dismissible: true,
                        duration: 3000,
                    });
                },
            }
        );
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex-col gap-6 px-[60px] py-[50px]">
                    <Heading as="h2" text="Register" />
                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input label="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            label="Password"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordRepeat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            label="Repeat password"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={isPending} variant="loginRegisterButton">
                        {isPending ? "Please wait" : "Register"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
