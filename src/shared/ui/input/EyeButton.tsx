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
        <button
            tabIndex={-1}
            type="button"
            className={cn(
                "flex items-center justify-center pr-3",
                "absolute inset-y-0 right-0",
                "bg-neutral-950"
            )}
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? (
                <EyeOff className="h-5 w-5 transition-colors duration-200 stroke-green-500" />
            ) : (
                <Eye className="h-5 w-5 transition-colors duration-200 stroke-green-500" />
            )}
        </button>
    );
};
