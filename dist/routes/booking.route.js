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
const booking_controller_1 = require("../controllers/booking.controller");
const bookingRoutes = [
    {
        method: 'POST',
        path: '/addBooking',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const bookingResponse = yield booking_controller_1.bookingOperation.addBooking(detail);
            return bookingResponse;
        }),
        options: {
            auth: 'user',
        },
    },
    {
        method: 'GET',
        path: '/bookingHistory',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const bookingId = req.query.id;
            const bookingResponse = yield booking_controller_1.bookingOperation.bookingHistory(bookingId);
            return bookingResponse;
        }),
        options: {
            auth: 'user',
        },
    },
    {
        method: 'Delete',
        path: '/cancelBooking',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const bookingId = req.query.id;
            const bookingResponse = yield booking_controller_1.bookingOperation.cancelBooking(bookingId);
            return bookingResponse;
        }),
        options: {
            auth: 'user',
        },
    },
];
exports.default = bookingRoutes;
//# sourceMappingURL=booking.route.js.map