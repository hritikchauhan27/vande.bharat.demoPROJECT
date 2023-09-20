"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRoutes = void 0;
const google_auth_1 = require("../google login/google.auth");
const joi_1 = __importDefault(require("joi"));
const set_password_1 = require("../google login/set.password");
exports.GoogleRoutes = [
    {
        method: 'GET',
        path: '/',
        handler: google_auth_1.googleLogin,
        options: {
            auth: false,
            tags: ['api', 'google'],
        },
    },
    {
        method: 'GET',
        path: '/auth/google/callback',
        handler: google_auth_1.googleCallback,
        options: {
            auth: false,
            tags: ['api', 'google'],
        },
    },
    {
        method: 'POST',
        path: '/reset-password',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            let email = req.payload;
            let responseData = yield set_password_1.Password.reset_password(email);
            console.log(" responseData in reset password", responseData);
            return responseData;
        }),
        options: {
            auth: false,
            validate: {
                payload: joi_1.default.object({
                    email: joi_1.default.string().email().required(),
                }),
            },
        },
    }
];
//# sourceMappingURL=google.login.js.map