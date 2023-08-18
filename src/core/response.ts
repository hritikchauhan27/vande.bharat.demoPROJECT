import { BookingModel, CoachModel, SeatModel } from "../models";

export class Response {
    static async sendResponse(message: string, code: number, data: any) {
        return {
            message: message,
            code: code,
            data: data
        }
    }
}

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