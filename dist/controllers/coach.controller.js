"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachOperation = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
const response_1 = require("../core/response");
class CoachOperation {
    static addCoach(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coach = yield models_1.CoachModel.findOne({ coachNumber: detail.coachNumber });
                const trainId = detail.trainId;
                console.log(trainId);
                const train = yield models_2.TrainModel.findOne({ _id: trainId });
                console.log(train.no_of_coaches);
                if (train.no_of_coaches >= 8) {
                    return response_1.Response.sendResponse("Number of coaches should be less then 8", 403, {});
                }
                else {
                    console.log(train.no_of_coaches);
                    const coachData = yield models_1.CoachModel.create(detail);
                    const trainData = yield models_2.TrainModel.findOneAndUpdate({ _id: trainId }, { no_of_coaches: train.no_of_coaches + 1 });
                    return response_1.Response.sendResponse("coach registered successfully", 201, { coachData, trainData });
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static trainDetail(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coach = yield models_1.CoachModel.findOne({ coachNumber: detail });
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
                });
                console.log(detailData);
                return response_1.Response.sendResponse("Train deatails", 201, { detailData });
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
}
exports.CoachOperation = CoachOperation;
//# sourceMappingURL=coach.controller.js.map