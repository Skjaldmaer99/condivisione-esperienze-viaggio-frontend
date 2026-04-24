import type { loginFormSchema } from "@/features/auth/LoginForm";
import { http } from "@/lib/http";
import type z from "zod";
import type { User } from "../users/user.type";
import type { registerFormSchema } from "./RegisterForm";
import type { forgotPasswordFormSchema } from "./ForgotPasswordForm";
import type { resetPasswordFormSchema } from "./ResetPasswordForm";

type AuthResponse = {
    token: string;
    user: {
        email: string;
        email_verified_at: string | null;
        // aggiungi altri campi se vuoi
    };
};

export class AuthService {
    static async currentUser(): Promise<User> {
        try {
            const res = await http.get('/user');
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Errore generico');
        }
    }

    static async register(data: z.infer<typeof registerFormSchema>) {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);

        if (data.img) {
            formData.append("img", data.img);
        }

        // versione 1
        return http.post('/register', formData); // Con Axios se passi FormData lui imposta automaticamente l’header corretto
        // versione 2
        /* const res = await http.post('/register', formData);
        return res; */
    }


    static async login(data: z.infer<typeof loginFormSchema>): Promise<AuthResponse> {
        const res = await http.post('/login', data);
        const token = res.data.token;
        const user = res.data.user;

        if (!token) {
            throw new Error('Token non valido');
        }

        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        //return res;
        return { token, user };
    }

    static authToken() {
        return localStorage.getItem('authToken');
    }

    static async me() {
        return http.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${this.authToken()}`
            }
        })
    }

    static async logout() {

        await http.post('/logout');

        localStorage.removeItem('authToken');
    }

    static async forgotPassword(data: z.infer<typeof forgotPasswordFormSchema>) {
        try {
            const res = await http.post('/forgot-password', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "errore generico");
        }
    }
    static async resetPassword(data: z.infer<typeof resetPasswordFormSchema>) {
        try {
            const res = await http.post('/reset-password', data);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "errore generico");
        }
    }
}
