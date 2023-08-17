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
            const start = req.query.start;
            const end = req.query.end;
            const routeResponse = await trainRouteOperation.getTrainRoute(start,end);
            return routeResponse;
        },
        options: {
            auth: 'user',
        },
    },
    {
        method: 'GET',
        path: '/deleteRoute',
        handler: async (req, h) => {
            const start = req.query.start;
            const end = req.query.end;
            const routeResponse = await trainRouteOperation.deleteTrainRoute(start,end);
            return routeResponse;
        },
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'PUT',
        path: '/updateRoute',
        handler: async (req, h) => {
            const start = req.query.start;
            const end = req.query.end;
            const detail = req.payload as any;
            const routeResponse = await trainRouteOperation.updateRoute(start,end,detail);
            return routeResponse;
        },
        options: {
            auth: 'admin',
        },
    },
];

export default routeRoutes;