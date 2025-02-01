import { cn } from "@/lib/utils";
import { EyeButton } from "./EyeButton";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Label } from "../label";

interface InputProps extends React.ComponentProps<"input"> {
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, value = "", label, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isFocused, setIsFocused] = useState(false);
        const inputContainerRef = useRef<HTMLDivElement>(null);

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            props.onFocus?.(e);
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (
                inputContainerRef.current &&
                !inputContainerRef.current.contains(e.target as Node)
            ) {
                setIsFocused(false);
            }
        };

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        console.log(isFocused);

        return (
            <div className="flex flex-col gap-1 bg-transparent">
                {label && <Label>{label}</Label>}
                <div
                    className={cn(
                        "flex rounded-md overflow-hidden border border-neutral-50 hover:border-green-400 relative transition-colors duration-200",
                        isFocused ? "!border-blue-500" : ""
                    )}
                    ref={inputContainerRef}
                >
                    <input
                        type={
                            type === "password" && showPassword ? "text" : type
                        }
                        className={cn(
                            "flex h-10 w-full bg-neutral-950 px-3 py-2 text-input text-neutral-50 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 z-1",
                            className
                        )}
                        onFocus={handleFocus}
                        // onBlur={handleBlur}
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
