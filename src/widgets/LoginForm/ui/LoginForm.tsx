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
import { useLoginMutation } from "../model/api/useLoginMutation";

export const LoginForm = () => {
    const loginMutation = useLoginMutation();

    const formSchema = z.object({
        username: z.string().min(1).email(),
        password: z.string().min(4),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        loginMutation.mutate({ username, password });
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex-col gap-6 px-[60px] py-[50px]">
                    <Heading as="h2" text="Login" />
                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="username"
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
                                            label="Email"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button variant="loginRegisterButton">Login</Button>
                    {/* <span className="w-full text-center text-red-400">
                        Wrong credentials
                    </span> */}
                </div>
            </form>
        </Form>
    );
};
