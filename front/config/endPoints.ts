import { login } from "@/features/auth/services/auth";
import { image } from "@nextui-org/react";
import { serialize } from "v8";

export const endPoints = {
    business : {
        get: "business-configuration/configuration/",
        put: "business-configuration/configuration/",
    }, 
    user : {
        register: "users/",
        login: "users/login/",
        edit : "users/",
        get : "users/",
        sendVerificationEmail: "users/send-email-verification-code/",
        verificationEmail: "users/validate-email/"
    },
    events : {
        get : "events/event/",
        post: "events/event/",
        category : {
            get: "events/category/",
            post: "events/category/",
        },
        event :{
            mostPopular: {
                get: "events/event/most-popular/",
            },
            mostViewed: {
                get: "events/event/most-viewed/",
            },
        },
        image: {
            post: "/upload-images/",
        },
    },
    services : {
        get: "services/service/",
        post: "services/service/",
        category : {
            get: "services/category/",
            post: "services/category/",
        },
        service :{
            mostPopular: {
                get: "services/service/most-popular/",
            },
            mostViewed: {
                get: "services/service/most-viewed/",
            },
        },
        image: {
            post: "/upload-images/",
        },
    },

}