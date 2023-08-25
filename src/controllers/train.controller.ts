import { TrainModel, TrainRouteModel } from '../models';
import { Response } from '../const/response';
import { log } from 'console';

export class TrainOperation {
    static async addTrain(detail) {
        try {
            const train = await TrainModel.findOne({ trainNumber: detail.trainNumber});
            console.log(train);
            if (!train) {
                const train = await TrainModel.create(detail);
                return Response.sendResponse("train register successfully", 201, { train });
            }
            else {
                return Response.sendResponse("train already exit", 403, {});
            }
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }

    static async trainRoute(trainNumber) {
        try {
            const train = await TrainModel.findOne({ trainNumber: trainNumber });
            console.log(train);
            if(train){
            let routeId = train.routeId;
            console.log(routeId);
            const route = await TrainRouteModel.findOne({ _id: routeId });
            console.log(route);

            return Response.sendResponse("train is running on route", 201, { route });}
            else{
                return Response.sendResponse("train doesn't exist",403,{});
            }
        }
        catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }

    static async getTrain(train) {
        try {
            const traindata = await TrainModel.aggregate([
                {
                    $match:{trainNumber:{$eq:train}}
                },
                {
                    $lookup:{
                        from:'coaches',
                        localField:"_id",
                        foreignField:"trainId",
                        as:"Coaches"
                    }
                },
                {
                    $lookup:{
                        from:"trainroutes",
                        localField:"routeId",
                        foreignField:"_id",
                        as:"Train Route"
                    }
                }
            ])
            console.log(traindata);
            return Response.sendResponse("train detail", 201, { traindata });

        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }


    static async deleteTrain(train) {
        try {
            const traindata = await TrainModel.findOne({_id: train });
            if (traindata) {
                await TrainModel.deleteOne({ trainNumber: train });
                return Response.sendResponse("Train Delete successfully", 201, {});
            }
            return Response.sendResponse("train doesn't exist",403,{});
        }
        catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }

    static async updateTrain(trainNumber,detail){
        try {
            const train = await TrainModel.findOne({_id: detail.trainNumber });
            if(train){
                const data = await TrainModel.updateOne({trainNumber:trainNumber},{
                    $set:{
                        trainNumber: detail.trainNumber,
                        routeId: detail.routeId,
                        destination: detail.destination,
                        no_of_coaches: detail.no_of_coaches,
                    }
                });
                return Response.sendResponse("update successfully",201,{data});
            }else{
                return Response.sendResponse("train doesn't exist",403,{});
            }
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }
}