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
import { useLoginMutation } from "../model/api/login/useLoginMutation";
import { toast } from "sonner";

export const LoginForm = () => {
    const loginMutation = useLoginMutation();
    const { mutate, isPending } = loginMutation;

    const formSchema = z.object({
        email: z.string().min(1, "").email(),
        password: z.string().min(4),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
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
                <div className="flex flex-col gap-6 px-[20px] sm:px-[60px] pt-[50px] pb-[30px]">
                    <Heading as="h2" text="Login" />
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
                    </div>
                    <Button disabled={isPending} variant="loginRegisterButton">
                        {isPending ? "Please wait" : "Login"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
