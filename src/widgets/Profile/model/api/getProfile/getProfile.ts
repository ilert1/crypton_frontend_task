import { AxiosError } from "axios";
import { $api } from "@/shared/api/api";
import { Profile } from "../../types/profile";

export const getProfile = async () => {
    try {
        const response = await $api.get<Profile>("/profile");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message || "Ошибка входа";
        throw new Error(errorMessage);
    }
};
