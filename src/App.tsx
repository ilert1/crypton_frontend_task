import { LoginForm } from "./widgets/LoginForm";

function App() {
    return (
        <div className="h-[100dvh] w-full bg-bg flex items-center justify-center">
            <div className="bg-neutral-950 rounded-3xl max-w-[440px] w-full h-96 flex flex-col gap-4">
                <LoginForm />
            </div>
        </div>
    );
}

export default App;
