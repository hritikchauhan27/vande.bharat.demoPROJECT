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
exports.seatOperation = void 0;
const models_1 = require("../models");
const response_1 = require("../core/response");
class seatOperation {
    static addSeat(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seatdata = yield models_1.SeatModel.create(detail);
                return response_1.Response.sendResponse("Seat register successfully", 201, { seatdata });
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static getSeat(seat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seatdata = yield models_1.SeatModel.findOne({ seatNumber: seat });
                console.log(seatdata);
                return response_1.Response.sendResponse("seat detail", 201, { seatdata });
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
}
exports.seatOperation = seatOperation;
//# sourceMappingURL=seat.controller.js.map