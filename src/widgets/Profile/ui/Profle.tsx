import { userStore } from "@/app/store/userStore";
import { Button } from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import { TextField } from "@/shared/ui/text-field";
import { Mail, Key } from "lucide-react";

export const Profile = () => {
    const logout = userStore((state) => state.logOut);

    return (
        <div className="bg-neutral-50 dark:bg-neutral-950 rounded-3xl max-w-[440px] w-full flex flex-col px-[30px] py-[50px] gap-4">
            <Heading as="h2" text="Profile" />
            <TextField Icon={<Mail />} text={"a@mail.ru"} label={"Email"} />
            <TextField Icon={<Key />} text={"123345678"} label={"ID"} />
            <Button onClick={logout}>Loguot</Button>
        </div>
    );
};
