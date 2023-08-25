"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerRoutes = void 0;
exports.SwaggerRoutes = [
    {
        method: 'GET',
        path: '/docs',
        handler: {
            file: 'swagger-ui/index.html',
        },
        options: {
            auth: false,
        }
    },
];
//# sourceMappingURL=swagger.route.js.map