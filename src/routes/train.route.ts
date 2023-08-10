import { ServerRoute } from '@hapi/hapi';
import { TrainOperation } from '../controllers/train.controller';

const trainRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/addTrain',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const  trainResponse = await TrainOperation.addTrain(detail);
            return trainResponse;
        },
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'GET',
        path: '/getTrain',
        handler: async (req, h) => {
            const train = req.headers.train;
            const  trainResponse = await TrainOperation.getTrain(train);
            return trainResponse;
        },
        options: {
            auth: 'user',
        },
    },
    {
        method: 'GET',
        path: '/getTrainRoute',
        handler: async (req, h) => {
            const trainNumber = req.headers.train;
            const  trainResponse = await TrainOperation.trainRoute(trainNumber);
            return trainResponse;
        },
        options: {
            auth: 'admin',
        },
    },
];

export default trainRoutes;