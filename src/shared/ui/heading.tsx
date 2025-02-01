import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const headingVariants = cva(
    "text-center text-neutral-950 dark:!text-neutral-50 ",
    {
        variants: {
            variant: {
                h1: "text-heading-1",
                h2: "text-heading-2",
                h3: "text-heading-3",
                h4: "text-heading-4",
                h5: "text-heading-5",
                h6: "text-heading-6",
            },
        },
        defaultVariants: {
            variant: "h2",
        },
    }
);

interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof headingVariants> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    text: string;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    (
        { as: Tag = "h1", className, text = "", variant = Tag, ...props },
        ref
    ) => {
        return (
            <Tag
                ref={ref}
                className={cn(headingVariants({ variant }), className)}
                {...props}
            >
                {text}
            </Tag>
        );
    }
);

Heading.displayName = "Heading";

export default Heading;
