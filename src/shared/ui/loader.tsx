import { useTheme } from "../providers";

export const Loading = ({ className = "" }: { className?: string }) => {
    return (
        <div
            className={`absolute inset-0 flex items-center justify-center bg-transparent ${className}`}
        >
            <RingSpinner />
        </div>
    );
};

// export const LoadingBlock = ({ className = "" }: { className?: string }) => {
//     return (
//         <div className={`flex justify-center items-center h-full w-full ${className}`}>
//             <RingSpinner />
//         </div>
//     );
// };

// export const LoadingBalance = ({ className = "" }: { className?: string }) => {
//     return (
//         <div className={`flex justify-center items-center ${className}`}>
//             <RingSpinner />
//         </div>
//     );
// };
export const RingSpinner = () => {
    return (
        <svg className={`animate-spin w-24 h-24`} viewBox="0 0 100 100">
            <defs>
                <linearGradient
                    id="spinner-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="28.01%" stopColor="#57CD8C" />
                    <stop offset="69.22%" stopColor="#57CD8C00" />
                </linearGradient>
            </defs>
            <circle
                className={`stroke-[10px] fill-none stroke-[url(#spinner-gradient)]`}
                cx="50"
                cy="50"
                r="45"
                strokeLinecap="round"
                strokeDasharray="282.7"
                strokeDashoffset="70.68"
            />
        </svg>
    );
};
