import { CoachModel, TrainRouteModel } from "../models";
import { TrainModel } from "../models";
import { Response } from "../core/response";

export class CoachOperation {
  static async addCoach(detail) {
    try {
      const coach = await CoachModel.findOne({ coachNumber: detail.coachNumber });
      const trainId = detail.trainId;
      console.log(trainId);

      const train = await TrainModel.findOne({ _id: trainId });
      console.log(train.no_of_coaches);

      if (train.no_of_coaches >= 8) {
        return Response.sendResponse("Number of coaches should be less then 8", 403, {});
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

  static async trainDetail(detail) {
    try {
      const coach = await CoachModel.findOne({ coachNumber: detail });
      console.log(coach);

      let detailData = [coach.trainId, coach.coachNumber, coach.no_of_seat, coach.bookedSeats];
      detailData = detailData.map((data, index) => {
        let message = "";
        switch (index) {
          case 0:
            message = `Train ID: ${data}`;
            break;
          case 1:
            message = `Coach Number: ${data}`;
            break;
          case 2:
            message = `Total number of Seats: ${data}`;
            break;
          case 3:
            message = `Booked Seats: ${data}`;
            break;
          default:
            message = `Unknown data: ${data}`;
        }
        return message;
      })

      console.log(detailData);

      return Response.sendResponse("Train deatails", 201, { detailData });
    }
    catch (error) {
      console.log(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }

  static async deleteCoach(coach) {
    try {
      const coachdata = await CoachModel.findOne({ coachNumber: coach });
      console.log(coachdata,'coach info');

      if (coachdata) {
        const data = await CoachModel.deleteOne({ coachNumber: coach });
        console.log(data,'delete info');
        return Response.sendResponse("coach deleted successfully", 201, {});
      }
      return Response.sendResponse("coach doesn't exist", 403, {})
    } catch (error) {
      console.log(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }

  static async updateCoach(coach, detail) {
    try {
      const coachdata = await CoachModel.findOne({ coachNumber: coach });
      console.log(coachdata);
      if (coachdata) {
        const data = await CoachModel.updateOne({ coachNumber: coach},{
          $set:{
            trainId: detail.trainId,
            coachNumber: detail.coachNumber,
            no_of_seat: detail.no_of_seat,
            bookedSeats: detail.bookedSeats,
            date: detail.date
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
}