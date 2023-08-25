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
exports.Response = void 0;
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
// export class bookingSeat {
//     static async bookTheSeat(detail, len, seatNumbers) {
//         const coach = await CoachModel.findOne({ _id: detail.coachId, date:detail.bookingDate});
//         const bookingData = await BookingModel.create(detail);
//         for (let i = 0; i < len; i++) {
//             await SeatModel.updateOne({ seatNumber: seatNumbers[i], date: detail.bookingDate }, { isBooked: true });
//         }
//         const x = coach.bookedSeats + detail.no_of_seats;
//         console.log(x);
//         const CaochData = await CoachModel.findByIdAndUpdate({ _id: detail.coachId }, { bookedSeats: x });
//         console.log(bookingData);
//         return Response.sendResponse("booking done successfully", 201, { bookingData });
//     }
// }
//# sourceMappingURL=response.js.map