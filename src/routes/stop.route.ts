import { ServerRoute } from '@hapi/hapi';
import { StopOperation } from '../controllers/stop.controller';

const StopRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/addStop',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const stopResponse = await StopOperation.addStop(detail);
            return stopResponse;
        },
        options: {
            auth: 'admin',
        }
    },
    {
        method: 'GET',
        path: '/getStop',
        handler: async (req, h) => {
            const stop = req.query.stop;
            const stopResponse = await StopOperation.getStop(stop);
            return stopResponse;
        },
        options: {
            auth: 'user',
        }
    },
    {
        method: 'DELETE',
        path: '/deleteStop',
        handler: async (req, h) => {
            const stop = req.query.stop;
            const stopResponse = await StopOperation.deleteStop(stop);
            return stopResponse;
        },
        options: {
            auth: 'admin',
        }
    },
    {
        method: 'PATCH',
        path: '/updateStop',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const stopResponse = await StopOperation.updateStop(detail);
            return stopResponse;
        },
        options: {
            auth: 'admin',
        }
    }
]

export default StopRoutes;