import { Response } from '../core/response';
import { TrainRouteModel } from '../models';

export class trainRouteOperation {
    static async addTrainRoute(detail) {
        try {
            const route =  await TrainRouteModel.findOne({start_point:detail.start_point , end_point: detail.end_point});
            if(!route){
                await TrainRouteModel.create(detail);
                return Response.sendResponse("TrainRoute register successfully", 201, {});
            }
            else{
                return Response.sendResponse("route already exist",403,{});
            }
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }

    static async getTrainRoute(start ,end){
        try {
            console.log(start,end);
            
            const routeData =  await TrainRouteModel.findOne({start_point:start , end_point:end});
            console.log(routeData);
            return Response.sendResponse("TrainRoute route detail", 201, {routeData});
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }
}