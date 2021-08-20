"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var requests_1 = __importDefault(require("./routes/requests"));
var error_1 = __importDefault(require("./middlewares/error"));
var app = express_1.default();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/requests', requests_1.default);
app.use(error_1.default);
app.listen(PORT, function () { return console.log("Server is running on port " + PORT + "..."); });
