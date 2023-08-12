import { ServerRoute } from "@hapi/hapi";
import { bookingOperation } from "../controllers/booking.controller";

const bookingRoutes: ServerRoute[] =[
    {
        method:'POST',
        path:'/addBooking',
        handler:async (req, h) => {
            const detail  = req.payload as any;
            const bookingResponse =await bookingOperation.addBooking(detail);
            return bookingResponse;
        },
        options: {
            auth: 'user',
        },
    },
    {
        method:'GET',
        path:'/bookingHistory',
        handler:async (req, h) => {
            const date  = req.headers.date;
            const bookingResponse =await bookingOperation.bookingHistory(date);
            return bookingResponse;
        },
        options: {
            auth: 'user',
        },
    },
];
export default bookingRoutes;