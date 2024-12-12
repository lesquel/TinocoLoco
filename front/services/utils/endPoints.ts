import { login } from "@/features/auth/services/auth";

export const endPoints = {
    business : {
        get: "business-configuration/",
        put: "business-configuration/",
    }, 
    user : {
        register: "users/",
        login: "users/login/",
    },
}