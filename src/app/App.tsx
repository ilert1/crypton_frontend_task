import { Header } from "@/widgets/Header";
import { userStore } from "./store/userStore";
import { Toaster } from "@/shared/ui/sonner";
import { LoginForm } from "@/widgets/AuthForms";

function App() {
    const _inited = userStore((state) => state._inited);
    console.log(_inited);
    return (
        <div className="h-[100vh] relative flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center w-full bg-bg">
                <div className="bg-neutral-50 dark:bg-neutral-950 rounded-3xl max-w-[440px] w-full flex flex-col gap-4">
                    {_inited ? "Logined" : <LoginForm />}
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default App;
