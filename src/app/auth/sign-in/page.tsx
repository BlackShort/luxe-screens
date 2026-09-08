import AuthForm from "@/components/auth/auth-form";

export default function SignInPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
            <div className="glow-gold absolute -left-32 -top-32 h-96 w-96 opacity-40" />

            <div className="glow-gold absolute -bottom-40 -right-32 h-112 w-md opacity-25" />

            <div className="grain-overlay fixed inset-0 opacity-[0.025]" />

            <AuthForm mode="signin" />
        </main>
    );
}