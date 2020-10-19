"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var db_1 = require("./db");
var route_1 = require("./routers/route");
var TodoApp = /** @class */ (function () {
    function TodoApp() {
        this.app = express_1.default();
        this.app.listen(7000, "localhost", function () {
            console.log("Server listening on port 7000");
        });
        db_1.DB.ConnectMongoDB();
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use("/src", express_1.default.static("src"));
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        route_1.Routes.RegisterAPIs(this.app);
    }
    return TodoApp;
}());
var blog = new TodoApp();
//# sourceMappingURL=app.js.map