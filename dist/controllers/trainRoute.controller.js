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
exports.trainRouteOperation = void 0;
const response_1 = require("../core/response");
const models_1 = require("../models");
class trainRouteOperation {
    static addTrainRoute(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const route = yield models_1.TrainRouteModel.findOne({ start_point: detail.start_point, end_point: detail.end_point });
                if (!route) {
                    yield models_1.TrainRouteModel.create(detail);
                    return response_1.Response.sendResponse("TrainRoute register successfully", 201, {});
                }
                else {
                    return response_1.Response.sendResponse("route already exist", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static getTrainRoute(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(start, end);
                const routeData = yield models_1.TrainRouteModel.findOne({ start_point: start, end_point: end });
                console.log(routeData);
                return response_1.Response.sendResponse("TrainRoute route detail", 201, { routeData });
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static deleteTrainRoute(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routedata = yield models_1.TrainRouteModel.findOne({ start_point: start, end_point: end });
                if (routedata) {
                    yield models_1.TrainRouteModel.deleteOne({ start_point: start, end_point: end });
                    return response_1.Response.sendResponse("Trainroute delete successfully", 201, {});
                }
                else {
                    return response_1.Response.sendResponse("route doesn't exist", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static updateRoute(start, end, detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routedata = yield models_1.TrainRouteModel.findOne({ start_point: start, end_point: end });
                if (routedata) {
                    let data = yield models_1.TrainRouteModel.updateOne({ start_point: start, end_point: end }, {
                        $set: {
                            start_point: detail.start_point,
                            stop_point: detail.stop_point,
                            end_point: detail.end_point
                        }
                    });
                    return response_1.Response.sendResponse("route updated successfully", 201, { data });
                }
                else {
                    return response_1.Response.sendResponse("route doesn't exist", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
}
exports.trainRouteOperation = trainRouteOperation;
//# sourceMappingURL=trainRoute.controller.js.map