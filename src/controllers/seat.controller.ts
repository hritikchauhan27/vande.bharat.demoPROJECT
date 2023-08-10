import { SeatModel } from "../models";
import { Response } from "../core/response";

export class seatOperation {
    static async addSeat(detail) {
        try {
            const seatdata = await SeatModel.create(detail);
            return Response.sendResponse("Seat register successfully", 201, { seatdata });
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }

    static async getSeat(seat) {
        try {
            const seatdata = await SeatModel.findOne({ seatNumber: seat })
            console.log(seatdata);
            return Response.sendResponse("seat detail", 201, { seatdata })

        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }
}