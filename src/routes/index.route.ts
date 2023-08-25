import UserRoutes from "./user.route";
import StopRoutes from "./stop.route";
import routeRoutes from "./trainRoute.route";
import trainRoutes from "./train.route";
import coachRoutes from "./coach.route";
import seatRoutes from "./seat.route";
import bookingRoutes from "./booking.route";

export let routes = [
    ...UserRoutes, 
    ...StopRoutes, 
    ...routeRoutes, 
    ...trainRoutes,
    ...coachRoutes,
    ...seatRoutes,
    ...bookingRoutes,
];
