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
exports.bookingSeat = exports.Response = void 0;
const models_1 = require("../models");
class Response {
    static sendResponse(message, code, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                message: message,
                code: code,
                data: data
            };
        });
    }
}
exports.Response = Response;
class bookingSeat {
    static bookTheSeat(detail, len, seatNumbers) {
        return __awaiter(this, void 0, void 0, function* () {
            const coach = yield models_1.CoachModel.findOne({ _id: detail.coachId, date: detail.bookingDate });
            const bookingData = yield models_1.BookingModel.create(detail);
            for (let i = 0; i < len; i++) {
                yield models_1.SeatModel.updateOne({ seatNumber: seatNumbers[i], date: detail.bookingDate }, { isBooked: true });
            }
            const x = coach.bookedSeats + detail.no_of_seats;
            console.log(x);
            const CaochData = yield models_1.CoachModel.findByIdAndUpdate({ _id: detail.coachId }, { bookedSeats: x });
            console.log(bookingData);
            return Response.sendResponse("booking done successfully", 201, { bookingData });
        });
    }
}
exports.bookingSeat = bookingSeat;
//# sourceMappingURL=response.js.map