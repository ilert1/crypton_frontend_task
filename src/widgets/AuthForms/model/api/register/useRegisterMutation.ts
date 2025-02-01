import { useMutation } from "@tanstack/react-query";
import { userStore } from "@/app/store/userStore";
import { register } from "./register";

export const useRegisterMutation = () => {
    const setAuthData = userStore((state) => state.setAuthData);

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            setAuthData(data.token);
        },
    });
};
