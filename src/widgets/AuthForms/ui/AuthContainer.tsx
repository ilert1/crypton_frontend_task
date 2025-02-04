import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { Button } from "@/shared/ui/button";

export const AuthContainer = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="bg-neutral-50 dark:bg-neutral-950 rounded-3xl max-w-[440px] w-full flex flex-col mx-4">
            <AnimatePresence mode="wait">
                {isLogin ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <LoginForm />
                    </motion.div>
                ) : (
                    <motion.div
                        key="register"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <RegisterForm />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex items-center justify-center">
                <Button
                    className="w-52 bg-transparent text-red-700 dark:text-red-400 mb-4"
                    variant="ghost"
                    onClick={() => setIsLogin((prev) => !prev)}
                >
                    {isLogin ? "Создать аккаунт" : "Уже есть аккаунт?"}
                </Button>
            </div>
        </div>
    );
};
