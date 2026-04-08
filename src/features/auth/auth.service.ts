import type { loginFormSchema } from "@/components/LoginForm";
import type { registerFormSchema } from "@/components/RegisterForm";
import { http } from "@/lib/http";
import type z from "zod";

export class AuthService {
    /* static async register(data: z.infer<typeof registerFormSchema>) {
        const res = await http.post('/register', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    } */
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

    static async login(data: z.infer<typeof loginFormSchema>) {
        const res = await http.post('/login', data);
        const token = res.data.token;
        if (!token) {
            throw new Error('Token non valido');
        }
        localStorage.setItem('authToken', token);
        return res;
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
}
