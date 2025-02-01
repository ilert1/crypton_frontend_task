import { Header } from "@/widgets/Header";
import { userStore } from "./store/userStore";
import { Toaster } from "@/shared/ui/sonner";
import { AuthContainer } from "@/widgets/AuthForms";

function App() {
    const _inited = userStore((state) => state._inited);
    console.log(_inited);
    return (
        <div className="h-[100vh] relative flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center w-full bg-bg">
                {_inited ? "" : <AuthContainer />}
            </div>
            <Toaster />
        </div>
    );
}

export default App;
