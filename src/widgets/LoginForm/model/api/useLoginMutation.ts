import { useMutation } from "@tanstack/react-query";
import { loginByEmail } from "./loginByEmail";

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: loginByEmail,
        onSuccess: (data) => {
            console.log("Успешный вход:", data);
            localStorage.setItem("token", data.token);
        },
        onError: (error) => {
            console.error("Ошибка входа:", error);
        },
    });
};
