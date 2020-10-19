"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
var responseModel_1 = require("../dataTransferModel/responseModel");
var ResponseService = /** @class */ (function () {
    function ResponseService() {
    }
    ResponseService.getValidResponse = function (response) {
        return new responseModel_1.ResponseModel(true, response, null);
    };
    ResponseService.getInValidResponse = function (error) {
        return new responseModel_1.ResponseModel(false, null, error);
    };
    return ResponseService;
}());
exports.ResponseService = ResponseService;
//# sourceMappingURL=ResponseService.js.map