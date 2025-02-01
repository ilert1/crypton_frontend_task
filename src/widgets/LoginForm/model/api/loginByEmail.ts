import axios from "axios";

interface LoginByEmailProps {
    username: string;
    password: string;
}

export const loginByEmail = async ({
    username,
    password,
}: LoginByEmailProps) => {
    const response = await axios.post("/api/auth/login", {
        username,
        password,
    });
    return response.data;
};
