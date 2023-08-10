import { ServerRoute } from '@hapi/hapi';
import { CoachOperation } from '../controllers/coach.controller';

const coachRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/addCoach',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const coachResponse = await CoachOperation.addCoach(detail);
            return coachResponse;
        },
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'GET',
        path: '/trainDetail',
        handler: async (req, h) => {
            const detail = req.headers.coach;
            const coachResponse = await CoachOperation.trainDetail(detail);
            return coachResponse;
        },
        options: {
            auth: 'user',
        },
    },
];

export default coachRoutes;