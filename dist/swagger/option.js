"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const d = require('user.servicedoc.yaml');
exports.options = {
    info: {
        title: "Vande Bharat",
        version: "1.0.0"
    },
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Vande Bharat",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3002/"
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        role: {
                            type: 'string',
                            enum: ["admin", "user"]
                        }
                    },
                    required: ['username', 'password', 'email', 'role']
                }
            }
        }
    },
    apis: ['user.servicedoc.yaml']
};
//# sourceMappingURL=option.js.map