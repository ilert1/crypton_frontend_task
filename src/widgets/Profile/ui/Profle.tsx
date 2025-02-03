import { userStore } from "@/app/store/userStore";
import { Button } from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import { TextField } from "@/shared/ui/text-field";
import { useQuery } from "@tanstack/react-query";
import { Mail, Key } from "lucide-react";
import { getProfile } from "../model/api/getProfile/getProfile";
import { Skeleton } from "@/shared/ui/skeleton";
import { toast } from "sonner";

export const Profile = () => {
    const logout = userStore(state => state.logOut);
    const {
        data: profile,
        error,
        isLoading
    } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        retry: 3
    });

    if (error) {
        toast.error("Error", {
            description: "Failed to load profile",
            dismissible: true,
            duration: 3000
        });
        return "Failed to load profile";
    }

    if (isLoading) {
        return (
            <div className="bg-neutral-50 dark:bg-neutral-950 rounded-3xl max-w-[440px] w-full flex flex-col px-[30px] py-[50px] gap-4 mx-2 sm:mx-0">
                <Heading as="h2" text="Profile" />
                <Skeleton className="h-[62px] w-full" />
                <Skeleton className="h-[62px] w-full" />
                <Skeleton className="h-[40px] w-full" />
            </div>
        );
    }
    return (
        <div className="bg-neutral-50 dark:bg-neutral-950 rounded-3xl max-w-[440px] w-full flex flex-col px-[30px] py-[50px] gap-4 mx-2 sm:mx-0">
            <Heading as="h2" text="Profile" />
            <TextField Icon={<Mail />} text={profile?.email ?? ""} label={"Email"} />
            <TextField Icon={<Key />} text={profile?.id ?? ""} label={"ID"} />
            <Button onClick={logout}>Logout</Button>
        </div>
    );
};
