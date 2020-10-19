"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var blogservice_1 = require("../services/blogservice");
var multer_1 = __importDefault(require("multer"));
var blog_1 = require("../models/blog");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.RegisterAPIs = function (app) {
        app.get("/", blogservice_1.BlogService.GetAllBlogs);
        app.get("/:blogId", blogservice_1.BlogService.GetBlogByID);
        // // app.post("/createblog",BlogService.CreateBlog);
        app.put("/blog/:blogId", blogservice_1.BlogService.UpdateBlog);
        app.delete("/blog/:blogId", blogservice_1.BlogService.DeleteBlog);
        var storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './src/uploads');
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            }
        });
        var fileFilter = function (req, file, cb) {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        };
        var upload = multer_1.default({
            storage: storage,
            limits: {
                fileSize: 1024 * 1024 * 5
            },
            fileFilter: fileFilter
        });
        app.post("/uploadmulter", upload.single('imageData'), function (req, res, next) {
            try {
                if (req.files) {
                    var newImage = new blog_1.blogModel({
                        imageName: req.body.imageName,
                        imageData: req.file.path,
                        image: req.file.filename,
                        title: req.body.title,
                        desc: req.body.desc
                    });
                    newImage.save();
                    res.status(200).json({ newImage: newImage });
                }
                else {
                    var newImage = new blog_1.blogModel({
                        title: req.body.title,
                        desc: req.body.desc
                    });
                    newImage.save();
                    res.status(200).json({ newImage: newImage });
                }
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=route.js.map