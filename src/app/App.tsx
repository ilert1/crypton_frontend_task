import { Header } from "@/widgets/Header";
import { LoginForm } from "@/widgets/LoginForm";

function App() {
    return (
        <div className="h-[100vh] relative flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center w-full bg-bg">
                <div className="bg-neutral-50 dark:bg-neutral-950 rounded-3xl max-w-[440px] w-full flex flex-col gap-4">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default App;
