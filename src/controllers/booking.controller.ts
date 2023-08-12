import { BookingModel, CoachModel, SeatModel } from "../models";
import { Response } from "../core/response";


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
            
            if(coach.bookedSeats<10){
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
                } else{
                    const bookingData = await BookingModel.create(detail);
                    for(let i=0;i<len;i++){
                     await SeatModel.create({
                        coachId: detail.coachId,
                        trainId: detail.trainId,
                        seatNumber: seatNumbers[i],
                        date: detail.bookingDate,
                        isBooked: true
                    });
                    }
                    const x = coach.bookedSeats + detail.no_of_seats;
                    console.log(x);
                    
                    const CaochData = await CoachModel.findByIdAndUpdate({ _id: detail.coachId }, { bookedSeats: x });
                    console.log(bookingData);
                    return Response.sendResponse("booking dnoe successfully",201,{bookingData});
                }
            } else {
                const bookingData = await BookingModel.create(detail);
                for(let i=0;i<len;i++){
                    await SeatModel.create({
                       coachId: detail.coachId,
                       trainId: detail.trainId,
                       seatNumber: seatNumbers[i],
                       date: detail.bookingDate,
                       isBooked: true
                   });
                   }
                    const x = coach.bookedSeats + detail.no_of_seats;
                    console.log(x);
                    
                    const CaochData = await CoachModel.findByIdAndUpdate({ _id: detail.coachId }, { bookedSeats: x });
                    console.log(CaochData,bookingData);
                    return Response.sendResponse("booking dnoe successfully",201,{bookingData});
            }
        }else{
            return Response.sendResponse("Coach is already booked check another coach for booking",403,{});
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