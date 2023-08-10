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
exports.TrainOperation = void 0;
const models_1 = require("../models");
const response_1 = require("../core/response");
class TrainOperation {
    static addTrain(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const train = yield models_1.TrainModel.findOne({ trainNumber: detail.trainNumber });
                console.log(train);
                if (!train) {
                    const train = yield models_1.TrainModel.create(detail);
                    return response_1.Response.sendResponse("train register successfully", 201, { train });
                }
                else {
                    return response_1.Response.sendResponse("train already exit", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static trainRoute(trainNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const train = yield models_1.TrainModel.findOne({ trainNumber: trainNumber });
                let routeId = train.routeId;
                console.log(routeId);
                const route = yield models_1.TrainRouteModel.findOne({ _id: routeId });
                console.log(route);
                return response_1.Response.sendResponse("train is running on route", 201, { route });
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static getTrain(train) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const traindata = yield models_1.TrainModel.findOne({ trainNumber: train });
                console.log(traindata);
                return response_1.Response.sendResponse("train detail", 201, { traindata });
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
}
exports.TrainOperation = TrainOperation;
//# sourceMappingURL=train.controller.js.map