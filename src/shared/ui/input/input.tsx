import { cn } from "@/lib/utils";
import { EyeButton } from "./EyeButton";
import { forwardRef, useState } from "react";
import { Label } from "../label";

interface InputProps extends React.ComponentProps<"input"> {
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, value, label, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const [isFocused, setIsFocused] = useState(false);

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            props.onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            props.onBlur?.(e);
        };
        return (
            <div className="flex flex-col gap-1 bg-transparent">
                {label && <Label>{label}</Label>}
                <div
                    className={cn(
                        "flex rounded-md overflow-hidden border-[2px] hover:border-green-400",
                        isFocused && "!border-blue-500"
                    )}
                >
                    <input
                        type={
                            type === "password" && showPassword ? "text" : type
                        }
                        className={cn(
                            "flex h-10 w-full bg-background px-3 py-2 text-input text-red-400 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 z-1",
                            className
                        )}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        ref={ref}
                        value={value}
                        {...props}
                    />
                    {type === "password" && (
                        <EyeButton
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            inputValue={value}
                        />
                    )}
                </div>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
