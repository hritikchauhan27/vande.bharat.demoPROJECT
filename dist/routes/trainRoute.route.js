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
Object.defineProperty(exports, "__esModule", { value: true });
const trainRoute_controller_1 = require("../controllers/trainRoute.controller");
const routeRoutes = [
    {
        method: 'POST',
        path: '/addRoute',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const routeResponse = yield trainRoute_controller_1.trainRouteOperation.addTrainRoute(detail);
            return routeResponse;
        }),
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'GET',
        path: '/getRoute',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const start = req.headers.start;
            const end = req.headers.end;
            const routeResponse = yield trainRoute_controller_1.trainRouteOperation.getTrainRoute(start, end);
            return routeResponse;
        }),
        options: {
            auth: 'user',
        },
    },
];
exports.default = routeRoutes;
//# sourceMappingURL=trainRoute.route.js.map