"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var todoSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String },
    completed: { type: Boolean },
});
exports.todoModel = mongoose_1.default.model("todo", todoSchema);
//# sourceMappingURL=todo.js.map