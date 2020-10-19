"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var blogSchema = new mongoose_1.default.Schema({
    imageName: { type: String, default: "none" },
    imageData: { type: String },
    image: { type: String },
    title: { type: String },
    desc: { type: String }
});
exports.blogModel = mongoose_1.default.model("blog", blogSchema);
//# sourceMappingURL=blog.js.map