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
const coach_controller_1 = require("../controllers/coach.controller");
const coachRoutes = [
    {
        method: 'POST',
        path: '/addCoach',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const coachResponse = yield coach_controller_1.CoachOperation.addCoach(detail);
            return coachResponse;
        }),
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'GET',
        path: '/trainDetail',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.query.coach;
            const coachResponse = yield coach_controller_1.CoachOperation.trainDetail(detail);
            return coachResponse;
        }),
        options: {
            auth: 'user',
        },
    },
    {
        method: 'DELETE',
        path: '/deleteCoach',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const coach = req.query.coach;
            const coachResponse = yield coach_controller_1.CoachOperation.deleteCoach(coach);
            return coachResponse;
        }),
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'PUT',
        path: '/updateCoach',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const coach = req.query.coach;
            const detail = req.payload;
            const coachResponse = yield coach_controller_1.CoachOperation.updateCoach(coach, detail);
            return coachResponse;
        }),
        options: {
            auth: 'admin',
        },
    },
];
exports.default = coachRoutes;
//# sourceMappingURL=coach.route.js.map