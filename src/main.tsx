import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { ThemeProvider } from "./app/providers/ThemeProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/api/react_query.ts";
import { ErrorBoundary } from "./app/providers/ErrorBoundary/index.ts";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <ErrorBoundary>
                <StrictMode>
                    <App />
                </StrictMode>
            </ErrorBoundary>
        </ThemeProvider>
    </QueryClientProvider>
);
