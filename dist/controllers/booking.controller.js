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
exports.bookingOperation = void 0;
const models_1 = require("../models");
const response_1 = require("../core/response");
class bookingOperation {
    static addBooking(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coach = yield models_1.CoachModel.findOne({ _id: detail.coachId });
                const seatIds = detail.seats.map(seat => seat.seatId);
                const noOfBookingSeat = seatIds.length;
                console.log(coach, seatIds);
                console.log(noOfBookingSeat);
                if (noOfBookingSeat > 4) {
                    return response_1.Response.sendResponse("ONly four seats booking at a time", 403, {});
                }
                else {
                    const seatPromises = seatIds.map(seatId => models_1.SeatModel.findOne({ _id: seatId }));
                    const seats = yield Promise.all(seatPromises);
                    const allSeatsAvailable = seats.every(seat => !seat.isBooked);
                    if (allSeatsAvailable) {
                        const bookingData = yield models_1.BookingModel.create(detail);
                        const x = coach.bookedSeats + detail.no_of_seats;
                        yield models_1.CoachModel.findByIdAndUpdate({ _id: detail.coachId }, { bookedSeats: x });
                        const seats = yield models_1.SeatModel.updateMany({ _id: { $in: seatIds }, isBooked: false }, { isBooked: true });
                        return response_1.Response.sendResponse("booking register successfully", 201, { bookingData });
                    }
                    else {
                        return response_1.Response.sendResponse("seat is already booked", 400, {});
                    }
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static bookingHistory(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield models_1.BookingModel.findOne({ bookingDate: date });
                console.log(booking);
                return response_1.Response.sendResponse("Booking History", 201, { booking });
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
}
exports.bookingOperation = bookingOperation;
//# sourceMappingURL=booking.controller.js.map