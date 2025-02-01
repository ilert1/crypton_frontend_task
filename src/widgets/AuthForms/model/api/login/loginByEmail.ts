import { AxiosError } from "axios";
import { $api } from "@/shared/api/api";

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = async ({ email, password }: LoginByEmailProps) => {
    try {
        const response = await $api.post("/login", { email, password });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message || "Ошибка входа";
        throw new Error(errorMessage);
    }
};
