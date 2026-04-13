import { AuthService } from "@/features/auth/auth.service";
import { useQuery } from "@tanstack/react-query";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";

export default function RootLayout() {
    const { data, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: AuthService.currentUser,
    });

    if (isLoading) return <div>Loading...</div>;

    return data ? <AuthLayout /> : <MainLayout />;
}