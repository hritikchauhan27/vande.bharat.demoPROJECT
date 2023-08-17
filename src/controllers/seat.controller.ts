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

    static async deleteSeat(seat){
        try {
            const seatdata = await SeatModel.findOne({ seatNumber: seat })
            if(seatdata){
                await SeatModel.deleteOne({ seatNumber: seat });
                return Response.sendResponse("seat delete successfully",201,{})
            }
            return Response.sendResponse("Seat doesn't exist", 403, {});
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }

    static async updateSeat(seat){
        const seatnum = await SeatModel.findOne({seatNumber:seat.seatNumber, date:seat.date}); 
        if(seatnum){
            await SeatModel.updateOne({seatNumber:seat.seatNumber, date:seat.date},{isBooked: false});
            return Response.sendResponse("Seat update successfully",201,{});
        }
        else{
            return Response.sendResponse("seat doesn't exit",403,{});
        }
    } catch (error) {
        console.log(error);
        return Response.sendResponse("Server error",500,{});
    }
}