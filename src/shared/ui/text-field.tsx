import { ReactNode } from "react";

interface TextFieldProps {
    Icon: ReactNode;
    text: string;
    label: string;
}
export const TextField = (props: TextFieldProps) => {
    const { Icon, text, label } = props;
    return (
        <div className="flex flex-col border dark:border-neutral-50 border-neutral-950 px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
                {Icon}{" "}
                <span className="text-input dark:text-neutral-50 text-neutral-950">
                    {label}
                </span>
            </div>
            <span className="text-input dark:text-neutral-50 text-neutral-950">
                {text}
            </span>
        </div>
    );
};
