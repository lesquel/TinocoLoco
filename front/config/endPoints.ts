import { login } from "@/features/auth/services/auth";
import { serialize } from "v8";

export const endPoints = {
    business : {
        get: "business-configuration/configuration/",
        put: "business-configuration/configuration/",
    }, 
    user : {
        register: "users/",
        login: "users/login/",
    },
    events : {
        get : "events/event/",
        category : {
            get: "events/category/",
        },
        event :{
            mostPopular: {
                get: "events/event/most-popular/",
            },
            mostViewed: {
                get: "events/event/most-viewed/",
            },
        }
    },
    services : {
        get: "services/service/",
        category : {
            get: "services/category/",
        },
        service :{
            mostPopular: {
                get: "services/service/most-popular/",
            },
            mostViewed: {
                get: "services/service/most-viewed/",
            },
        }
    }
}