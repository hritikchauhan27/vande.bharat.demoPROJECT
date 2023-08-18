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
            auth: "admin",
        },
    },
    {
        method:'GET',
        path: '/getSeat',
        handler: async (req,h)=>{
            const seat =req.query.seat;
            const seatResponse = await seatOperation.getSeat(seat);
            return seatResponse;
        },
        options: {
            auth: "user",
        },
    },
    {
        method:'DELETE',
        path: '/deleteSeat',
        handler: async (req,h)=>{
            const seat =req.query.seat;
            const seatResponse = await seatOperation.deleteSeat(seat);
            return seatResponse;
        },
        options: {
            auth: "admin",
        },
    },
    {
        method:'PATCH',
        path: '/updateSeat',
        handler: async (req,h)=>{
            const seat =req.query.id;
            const detail = req.payload as any;
            const seatResponse = await seatOperation.updateSeat(seat,detail);
            return seatResponse;
        },
        options: {
            auth: "admin",
        },
    },
];

export default seatRoutes;