"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const hapi_1 = require("@hapi/hapi");
const connection_1 = require("./core/connection");
const dotenv = __importStar(require("dotenv"));
const index_route_1 = require("./routes/index.route");
const authAdmin_1 = __importDefault(require("./middleware/authAdmin"));
const Inert = __importStar(require("@hapi/inert"));
const Vision = __importStar(require("@hapi/vision"));
const HapiSwagger = __importStar(require("hapi-swagger"));
dotenv.config();
class Init {
    static hapiserver() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = new hapi_1.Server({
                port: process.env.PORT,
                host: process.env.HOST,
            });
            yield (0, connection_1.connectToDatabase)();
            const plugins = [
                {
                    plugin: authAdmin_1.default,
                },
                Inert,
                Vision,
                {
                    plugin: HapiSwagger,
                    options: {
                        info: {
                            title: 'Vande Bharat Booking',
                            version: '1.0.0',
                        },
                        securityDefinitions: {
                            jwt: {
                                type: 'apiKey',
                                name: 'Authorization',
                                in: 'header'
                            }
                        },
                        security: [{ jwt: [] }],
                        grouping: 'tags',
                        tags: [
                            { name: 'user', description: 'user onboarding' },
                            { name: 'trainroute', description: 'train route operation' },
                            { name: 'train', description: 'train operation' },
                            { name: 'stop', description: 'stop operation' },
                            { name: 'seat', description: 'seat operation' },
                            { name: 'coach', description: 'coach operation' },
                            { name: 'booking', description: 'booking operation' }
                        ],
                        documentationPath: '/documentation',
                    },
                },
            ];
            yield server.register(plugins);
            server.route(index_route_1.routes);
            yield server.start();
            console.log(`Server running on ${server.info.uri}`);
        });
    }
}
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
Init.hapiserver();
//# sourceMappingURL=server.js.map