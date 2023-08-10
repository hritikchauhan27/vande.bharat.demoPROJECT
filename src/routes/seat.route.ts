import { ServerRoute } from "@hapi/hapi";
import { seatOperation } from "../controllers/seat.controller";

const seatRoutes: ServerRoute[]=[
    {
        method:'POST',
        path: '/addSeat',
        handler: async (req,h)=>{
            const detail =req.payload as any;
            const seatResponse = await seatOperation.addSeat(detail);
            return seatResponse;
        },
        options: {
            auth: false,
        },
    },
    {
        method:'GET',
        path: '/getSeat',
        handler: async (req,h)=>{
            const seat =req.headers.seat;
            const seatResponse = await seatOperation.getSeat(seat);
            return seatResponse;
        },
        options: {
            auth: false,
        },
    },
];

export default seatRoutes;