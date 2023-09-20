import { ServerRoute } from "@hapi/hapi";
import { googleLogin, googleCallback } from "../google login/google.auth";
import Joi from 'joi';
import { Password } from "../google login/set.password";

export const GoogleRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/',
        handler: googleLogin,
        options: {
            auth: false,
            tags: ['api', 'google'],
        },
    },
    {
        method: 'GET',
        path: '/auth/google/callback',
        handler: googleCallback,
        options: {
            auth: false,
            tags: ['api', 'google'],
        },
    },
    {
        method: 'POST',
        path: '/reset-password',
        handler: async (req, h) => {
            let email = req.payload;
            let responseData = await Password.reset_password(email);
            console.log(" responseData in reset password", responseData)
            return responseData;
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                }),
            },
        },
    }
];
