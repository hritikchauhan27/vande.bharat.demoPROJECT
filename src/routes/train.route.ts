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
            const train = req.query.train;
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
            const trainNumber = req.query.train;
            const  trainResponse = await TrainOperation.trainRoute(trainNumber);
            return trainResponse;
        },
        options: {
            auth: 'user',
        },
    },
    {
        method: 'GET',
        path: '/deleteTrain',
        handler: async (req, h) => {
            const trainNumber = req.query.train;
            const  trainResponse = await TrainOperation.deleteTrain(trainNumber);
            return trainResponse;
        },
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'PUT',
        path: '/updateTrain',
        handler: async (req, h) => {
            const trainNumber = req.query.train;
            const detail = req.payload as any;
            const  trainResponse = await TrainOperation.updateTrain(trainNumber,detail);
            return trainResponse;
        },
        options: {
            auth: 'admin',
        },
    },
];

export default trainRoutes;