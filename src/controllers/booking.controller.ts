import { BookingModel, CoachModel, SeatModel, UserModel } from "../models";
import { Response } from "../core/response";
import { bookingSeat } from "../core/response";
import Auth from "../middleware/decode";

export class bookingOperation{
    static async addBooking(detail){
        try {
            const seatNumbers = detail.seats.map((seat) => seat.seatNumber);
            console.log(seatNumbers);            
            let len = seatNumbers.length;
            const coach = await CoachModel.findOne({ _id: detail.coachId, date:detail.bookingDate});
            console.log(coach);            
            const booking = await BookingModel.findOne({
                trainId: detail.trainId,
                coachId: detail.coachId,
                bookingDate: detail.bookingDate
            })
            console.log(booking);
            console.log(coach.bookedSeats);
            
            if(coach.bookedSeats<11){
            if(booking){
                var booked=0;
                for(let i=0;i<len;i++){
                  let seat = await SeatModel.findOne({
                    seatNumber: seatNumbers[i],
                    date: detail.bookingDate,
                    isBooked:true
                  });
                  if(seat){
                      booked++;
                  }
                }
                console.log(booked);
                if(booked>0 || len>4){
                    return Response.sendResponse(`Seat is already booking or You are trying to book more than 4 seat at a time`,403,{});
                } 
            } 
            return bookingSeat.bookTheSeat(detail,len, seatNumbers);
        
        }else{
            return Response.sendResponse("Coach is already booked check another coach for booking",403,{});
        }
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }



    static async bookingHistory(bookingId) {
        try {
            const booking = await BookingModel.findOne({ _id: bookingId });
            console.log(booking);
            if(booking){
                return Response.sendResponse("Booking History", 201, { booking });
            }else{
                return Response.sendResponse("booking doesn't exist",403,{});
            }
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }


    static async cancelBooking(bookingId){
        try {
            const booking = await BookingModel.findOne({_id:bookingId});
            console.log(booking,"bookind data");
            const coach = await CoachModel.findOne({_id: booking.coachId});
            console.log(coach,"------coach data");            
            const seatNumbers = booking.seats.map((seat) => seat.seatNumber);
            console.log(seatNumbers);            
            let len = seatNumbers.length;
            for(let i=0;i<len;i++){
                await SeatModel.updateOne({
                    seatNumber: seatNumbers[i],
                    date: booking.bookingDate,
                },{
                    $set:{
                            isBooked:false 
                        }
                })
            }
            let x = coach.bookedSeats - booking.no_of_seats;
            const CaochData = await CoachModel.findByIdAndUpdate({ _id: booking.coachId }, { bookedSeats: x});
            const bookingData = await BookingModel.deleteOne({_id:bookingId});
            return Response.sendResponse("booking canceled successfully",201,{CaochData,bookingData});
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }


}












// export class bookingOperation {
//     static async addBooking(detail) {
//         try {
//             const coach = await CoachModel.findOne({ _id: detail.coachId });
//             const seatIds = detail.seats.map(seat => seat.seatId);
//             const noOfBookingSeat = seatIds.length;
//             console.log(coach, seatIds);
//             console.log(noOfBookingSeat);
//             const booking = await BookingModel.findOne({
//                 $and: [
//                   { bookingDate: detail.bookingDate },
//                   { coachId: detail.coachId },
//                   { "seats.seatId": detail.seats.seatId }
//                 ]
//               });            
//               console.log(booking);
//             // console.log(BookingModel);
            
            
//             if (noOfBookingSeat > 4) {
//                 return Response.sendResponse("ONly four seats booking at a time", 403, {});
//             }
//             else {
//                 // const seatPromises = seatIds.map(seatId => SeatModel.findOne({ _id: seatId }));
//                 // const seats = await Promise.all(seatPromises);
//                 // const allSeatsAvailable = seats.every(seat => !seat.isBooked);
//                 if (!booking) {
//                     const bookingData = await BookingModel.create(detail);
//                     const x = coach.bookedSeats + detail.no_of_seats;
//                     await CoachModel.findByIdAndUpdate({ _id: detail.coachId }, { bookedSeats: x });
//                     const seats = await SeatModel.updateMany({ _id: { $in: seatIds },  isBooked: true });
//                     return Response.sendResponse("booking register successfully", 201, { bookingData });
//                 } else {
//                     return Response.sendResponse("seat is already booked", 400, {});
//                 }
//             }

//         } catch (error) {
//             console.log(error);
//             return Response.sendResponse("Server error", 500, {});
//         }
//     }

//     static async bookingHistory(date) {
//         try {
//             const booking = await BookingModel.findOne({ bookingDate: date });
//             console.log(booking);
//             return Response.sendResponse("Booking History", 201, { booking });

//         } catch (error) {
//             console.log(error);
//             return Response.sendResponse("Server error", 500, {});
//         }
//     }
// }