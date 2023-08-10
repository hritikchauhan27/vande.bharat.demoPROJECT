import { StopModel } from '../models';
import { Response } from '../core/response';

export class StopOperation{
    static async addStop(detail){
        try {
            const stop = await StopModel.findOne({stop_name:detail.stop_name});
            // console.log(train);
            if(!stop){
                await StopModel.create(detail);
                return Response.sendResponse("Stop register successfully",201,{});
            }
            else{
                return Response.sendResponse("Stop already exit",403,{});
            }
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error",500,{});
        }
    }

    static async getStop(stop){
        try{
            console.log(stop);
            
        const stopDetail = await StopModel.findOne({stop_name:stop});
        console.log(stopDetail);
        return Response.sendResponse("Stop detail",201,{stopDetail});
        }
        catch(error){
            console.log(error);
            return Response.sendResponse("Server error",500,{});
        }
    }
}