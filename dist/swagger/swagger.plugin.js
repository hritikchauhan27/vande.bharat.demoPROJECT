"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
const authAdmin_1 = __importDefault(require("../src/middleware/authAdmin"));
exports.plugins = [
    {
        plugin: authAdmin_1.default,
    },
    // Inert,
    // Vision,
    // {
    //     plugin: HapiSwagger,
    //     options: {
    //         info: {
    //             title: 'Vande Bharat Booking',
    //             version: '1.0.0',
    //         },
    //         securityDefinitions: {
    //             jwt: {
    //               type: 'apiKey',
    //               name: 'Authorization',
    //               in: 'header'
    //             }
    //         },
    //         security: [{ jwt: [] }],
    //         grouping:'tags',
    //         tags: [
    //             { name: 'user', description: 'user onboarding' },
    //             { name: 'trainroute', description: 'train route operation' },
    //             { name: 'train', description:'train operation'},
    //             { name: 'stop', description:'stop operation'},
    //             { name: 'seat', description:'seat operation'},
    //             { name: 'coach', description:'coach operation'},
    //             { name: 'booking', description:'booking operation'}
    //         ],
    //         documentationPath: '/documentation', 
    //     },
    // },
];
//# sourceMappingURL=swagger.plugin.js.map