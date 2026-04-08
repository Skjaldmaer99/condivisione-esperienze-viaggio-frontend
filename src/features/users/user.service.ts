import { http } from "@/lib/http";
import type { User } from "./user.type";

/*  dal path /user mi recupero lo user autenticato e lo uso per la sezione profilo */
export class UserService {
    static async currentUser(): Promise<User> {
        try {
            const res = await http.get('/user');
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Errore generico');
        }
    }
    static async topUsers(): Promise<User[]> {
        try {
            const res = await http.get('/users/top-users');
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Errore generico');
        }
    }
}