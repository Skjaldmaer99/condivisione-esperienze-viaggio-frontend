import axios from "axios";
import myEnv from "./env";

export const http = axios.create({
    baseURL: myEnv.backendApiUrl
})