import { useEffect } from "react";
import { userStore } from "./store/userStore";
import { Header } from "@/widgets/Header";
import { Toaster } from "@/shared/ui/sonner";
import { AuthContainer } from "@/widgets/AuthForms";
import { Profile } from "@/widgets/Profile/ui/Profle";
import { Loading } from "@/shared/ui/loader";

function App() {
    const _inited = userStore((state) => state._inited);
    const checkAuth = userStore((state) => state.checkAuth);
    const isLoading = userStore((state) => state.isLoading);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="h-[100vh] relative flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center w-full bg-bg">
                {_inited ? <Profile /> : <AuthContainer />}
            </div>
            <Toaster />
        </div>
    );
}

export default App;
