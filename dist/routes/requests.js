"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var requests_1 = require("../controllers/requests");
var router = express_1.default.Router();
router.post('/process', requests_1.processRequests);
router.get('/all', requests_1.getRequests);
exports.default = router;
