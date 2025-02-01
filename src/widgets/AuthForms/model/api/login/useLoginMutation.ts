import { useMutation } from "@tanstack/react-query";
import { loginByEmail } from "./loginByEmail";
import { userStore } from "@/app/store/userStore";

export const useLoginMutation = () => {
    const setAuthData = userStore((state) => state.setAuthData);

    return useMutation({
        mutationFn: loginByEmail,
        onSuccess: (data) => {
            setAuthData(data.token);
        },
    });
};
