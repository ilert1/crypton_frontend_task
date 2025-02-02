import { useTheme } from "@/app/providers/ThemeProvider";
import { Switch } from "@/shared/ui/switch";

export const Header = () => {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <header className="flex items-center justify-end bg-white dark:bg-black h-20 w-full px-10 sm:px-52">
            <Switch
                className="w-[135px] h-[60px]"
                checked={theme === "light" ? false : true}
                onCheckedChange={toggleTheme}
            />
        </header>
    );
};
