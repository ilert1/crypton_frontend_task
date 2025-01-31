import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface EyeButtonProps {
    showPassword: boolean;
    setShowPassword: (state: boolean) => void;
    inputValue?: string | number | readonly string[] | undefined;
}

export const EyeButton = (props: EyeButtonProps) => {
    const { showPassword, setShowPassword } = props;

    return (
        <div
            className={cn(
                "flex items-center justify-center cursor-pointer h-full pr-[10px]",
                "bg-background"
            )}
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? (
                <EyeOff
                    className={cn("h-5 w-5 transition-colors duration-200 ")}
                />
            ) : (
                <Eye
                    className={cn("h-5 w-5 transition-colors duration-200 ")}
                />
            )}
        </div>
    );
};
