import { CoachModel, TrainRouteModel } from "../models";
import { TrainModel } from "../models";
import { Response } from "../core/response";

export class CoachOperation {
  static async addCoach(detail) {
    try {
      const coach = await CoachModel.findOne({ coachNumber: detail.coachNumber, trainId: detail.trainId});
      console.log(coach);
      
      const trainId = detail.trainId;
      console.log(trainId);

      const train = await TrainModel.findOne({ _id: trainId });
      console.log(train.no_of_coaches);

      if (train.no_of_coaches >= 8 || coach) {
        return Response.sendResponse("Number of coaches should be less then 8 or coach already exist", 403, {});
      }
      else {
        console.log(train.no_of_coaches);
        const coachData = await CoachModel.create(detail);
        const trainData = await TrainModel.findOneAndUpdate({ _id: trainId }, { no_of_coaches: train.no_of_coaches + 1 })
        return Response.sendResponse("coach registered successfully", 201, { coachData, trainData });
      }
    } catch (error) {
      console.log(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }

  
  static async deleteCoach(coach) {
    try {
      const coachdata = await CoachModel.findOne({ coachNumber: coach});
      const trainId = coachdata.trainId;
      console.log(trainId);
      const train = await TrainModel.findOne({ _id: trainId });
      if (coachdata) {
        const data = await CoachModel.deleteOne({ coachNumber: coach});
        const trainData = await TrainModel.findOneAndUpdate({ _id: trainId }, { no_of_coaches: train.no_of_coaches - 1 })
        return Response.sendResponse("coach deleted successfully", 201, {data});
      }
      return Response.sendResponse("coach doesn't exist", 403, {})
    } catch (error) {
      console.log(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }

  static async updateCoach(coach, detail) {
    try {
      const coachdata = await CoachModel.findOne({_id: coach });
      console.log(coachdata);
      if (coachdata) {
        const data = await CoachModel.updateOne({_id: coach},{
          $set:{
            trainId: detail.trainId,
            coachNumber: detail.coachNumber,
            no_of_seat: detail.no_of_seat,
          }
        });
        return Response.sendResponse("update successfully",201,{data});
      }else{
        return Response.sendResponse("coach doesn't exist",403,{});
      }
    } catch (error) {
      console.log(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }

  
  static async getCoach(coach){
    try {
      const coachdata = await CoachModel.aggregate([
        {
          $match:{coachNumber:{$eq:coach}}
        },
        {
          $lookup:{
            from:'seats',
            localField:'_id',
            foreignField:'coachId',
            as:'Seats'
          }
        }
      ])

      console.log(JSON.stringify(coachdata));
      
      if(coachdata){
        return Response.sendResponse("coach detail",201,{coachdata});
      }else{
        return Response.sendResponse("coach doesn't exist",403,{})
      }
    } catch (error) {
      console.log(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }
}




// static async trainDetail(coachId, routeId) {
//   try {
//     const coach = await CoachModel.findOne({_id: coachId });
//     console.log(coach);

//     let detailData = [coach.trainId, coach.coachNumber, coach.no_of_seat];
//     detailData = detailData.map((data, index) => {
//       let message = "";
//       switch (index) {
//         case 0:
//           message = `Train ID: ${data}`;
//           break;
//         case 1:
//           message = `Coach Number: ${data}`;
//           break;
//         case 2:
//           message = `Total number of Seats: ${data}`;
//           break;
//         default:
//           message = `Unknown data: ${data}`;
//       }
//       return message;
//     })

//     console.log(detailData);

//     return Response.sendResponse("Train deatails", 201, { detailData });
//   }
//   catch (error) {
//     console.log(error);
//     return Response.sendResponse("Server error", 500, {});
//   }
// }