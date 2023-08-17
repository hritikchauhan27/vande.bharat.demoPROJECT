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
const train_controller_1 = require("../controllers/train.controller");
const trainRoutes = [
    {
        method: 'POST',
        path: '/addTrain',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const trainResponse = yield train_controller_1.TrainOperation.addTrain(detail);
            return trainResponse;
        }),
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'GET',
        path: '/getTrain',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const train = req.query.train;
            const trainResponse = yield train_controller_1.TrainOperation.getTrain(train);
            return trainResponse;
        }),
        options: {
            auth: 'user',
        },
    },
    {
        method: 'GET',
        path: '/getTrainRoute',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const trainNumber = req.query.train;
            const trainResponse = yield train_controller_1.TrainOperation.trainRoute(trainNumber);
            return trainResponse;
        }),
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'GET',
        path: '/deleteTrain',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const trainNumber = req.query.train;
            const trainResponse = yield train_controller_1.TrainOperation.deleteTrain(trainNumber);
            return trainResponse;
        }),
        options: {
            auth: 'admin',
        },
    },
    {
        method: 'PUT',
        path: '/updateTrain',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const trainNumber = req.query.train;
            const detail = req.payload;
            const trainResponse = yield train_controller_1.TrainOperation.updateTrain(trainNumber, detail);
            return trainResponse;
        }),
        options: {
            auth: 'admin',
        },
    },
];
exports.default = trainRoutes;
//# sourceMappingURL=train.route.js.map