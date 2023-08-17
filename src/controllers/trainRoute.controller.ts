import { Response } from '../core/response';
import { TrainRouteModel } from '../models';

export class trainRouteOperation {
    static async addTrainRoute(detail) {
        try {
            const route = await TrainRouteModel.findOne({ start_point: detail.start_point, end_point: detail.end_point });
            if (!route) {
                await TrainRouteModel.create(detail);
                return Response.sendResponse("TrainRoute register successfully", 201, {});
            }
            else {
                return Response.sendResponse("route already exist", 403, {});
            }
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }

    static async getTrainRoute(start, end) {
        try {
            console.log(start, end);

            const routeData = await TrainRouteModel.findOne({ start_point: start, end_point: end });
            console.log(routeData);
            return Response.sendResponse("TrainRoute route detail", 201, { routeData });
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }

    static async deleteTrainRoute(start, end) {
        try {
            const routedata = await TrainRouteModel.findOne({ start_point: start, end_point: end });
            if (routedata) {
                await TrainRouteModel.deleteOne({ start_point: start, end_point: end });
                return Response.sendResponse("Trainroute delete successfully", 201, {});
            }
            else {
                return Response.sendResponse("route doesn't exist", 403, {});
            }
        }
        catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }

    static async updateRoute(start, end, detail) {
        try {
            const routedata = await TrainRouteModel.findOne({ start_point: start, end_point: end });
            if (routedata) {
                let data = await TrainRouteModel.updateOne({ start_point: start, end_point: end }, {
                    $set: {
                        start_point: detail.start_point,
                        stop_point: detail.stop_point,
                        end_point: detail.end_point
                    }
                });
                return Response.sendResponse("route updated successfully", 201, { data });
            }
            else {
                return Response.sendResponse("route doesn't exist", 403, {});
            }
        }
        catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }
}