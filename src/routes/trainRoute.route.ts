import { ServerRoute } from '@hapi/hapi';
import { trainRouteOperation } from '../controllers/trainRoute.controller';

const routeRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/addRoute',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const routeResponse = await trainRouteOperation.addTrainRoute(detail);
            return routeResponse;
        },
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'GET',
        path: '/getRoute',
        handler: async (req, h) => {
            const start = req.headers.start;
            const end = req.headers.end;
            const routeResponse = await trainRouteOperation.getTrainRoute(start,end);
            return routeResponse;
        },
        options: {
            auth: 'user',
        },
    },
];

export default routeRoutes;