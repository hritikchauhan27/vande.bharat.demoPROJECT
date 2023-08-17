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
const seat_controller_1 = require("../controllers/seat.controller");
const seatRoutes = [
    {
        method: 'POST',
        path: '/addSeat',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const seatResponse = yield seat_controller_1.seatOperation.addSeat(detail);
            return seatResponse;
        }),
        options: {
            auth: false,
        },
    },
    {
        method: 'GET',
        path: '/getSeat',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const seat = req.query.seat;
            const seatResponse = yield seat_controller_1.seatOperation.getSeat(seat);
            return seatResponse;
        }),
        options: {
            auth: false,
        },
    },
    {
        method: 'DELETE',
        path: '/deleteSeat',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const seat = req.query.seat;
            const seatResponse = yield seat_controller_1.seatOperation.deleteSeat(seat);
            return seatResponse;
        }),
        options: {
            auth: false,
        },
    },
    {
        method: 'PATCH',
        path: '/updateSeat',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const seat = req.payload;
            const seatResponse = yield seat_controller_1.seatOperation.updateSeat(seat);
            return seatResponse;
        }),
        options: {
            auth: "admin",
        },
    },
];
exports.default = seatRoutes;
//# sourceMappingURL=seat.route.js.map