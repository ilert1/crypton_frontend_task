import { AxiosError } from "axios";
import { $api } from "@/shared/api/api";

interface RegisterProps {
    email: string;
    password: string;
}

export const register = async ({ email, password }: RegisterProps) => {
    try {
        const response = await $api.post("/register", { email, password });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message || "Ошибка входа";
        throw new Error(errorMessage);
    }
};
