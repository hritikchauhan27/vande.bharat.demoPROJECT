import { BookingModel, CoachModel, SeatModel } from "../models";
import { Response } from "../core/response";

export class bookingOperation {
    static async addBooking(detail) {
        try {
            const coach = await CoachModel.findOne({ _id: detail.coachId });
            const seatIds = detail.seats.map(seat => seat.seatId);
            const noOfBookingSeat = seatIds.length;
            console.log(coach, seatIds);
            console.log(noOfBookingSeat);
            // const booking = await BookingModel.findOne({bookingDate:detail.bookingDate, coachId:detail})

            if (noOfBookingSeat > 4) {
                return Response.sendResponse("ONly four seats booking at a time", 403, {});
            }
            else {
                const seatPromises = seatIds.map(seatId => SeatModel.findOne({ _id: seatId }));
                const seats = await Promise.all(seatPromises);
                const allSeatsAvailable = seats.every(seat => !seat.isBooked);
                if (allSeatsAvailable) {
                    const bookingData = await BookingModel.create(detail);
                    const x = coach.bookedSeats + detail.no_of_seats;
                    await CoachModel.findByIdAndUpdate({ _id: detail.coachId }, { bookedSeats: x });
                    const seats = await SeatModel.updateMany({ _id: { $in: seatIds }, isBooked: false }, { isBooked: true });
                    return Response.sendResponse("booking register successfully", 201, { bookingData });
                } else {
                    return Response.sendResponse("seat is already booked", 400, {});
                }
            }

        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }

    static async bookingHistory(date) {
        try {
            const booking = await BookingModel.findOne({ bookingDate: date });
            console.log(booking);
            return Response.sendResponse("Booking History", 201, { booking });

        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }
}