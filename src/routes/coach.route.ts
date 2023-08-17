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
            const detail = req.query.coach;
            const coachResponse = await CoachOperation.trainDetail(detail);
            return coachResponse;
        },
        options: {
            auth: 'user',
        },
    },
    {
        method: 'DELETE',
        path: '/deleteCoach',
        handler: async (req, h) => {
            const coach = req.query.coach;
            const coachResponse = await CoachOperation.deleteCoach(coach);
            return coachResponse;
        },
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'PUT',
        path: '/updateCoach',
        handler: async (req, h) => {
            const coach = req.query.coach;
            const detail = req.payload as any;
            const coachResponse = await CoachOperation.updateCoach(coach,detail);
            return coachResponse;
        },
        options: {
            auth: 'admin',
        },
    },
];

export default coachRoutes;