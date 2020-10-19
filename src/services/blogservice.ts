import express from "express";
import { title } from "process";
import { blogModel } from "../models/blog";
import multer from "multer";

// import {ResponseService} from "../utils/ResponseService"



export class BlogService {
  constructor() {}
 
  public static async CreateBlog(req: any, res: express.Response) {
    try {
      if (req.files) {
        var file = req.files.selectedFile;
        console.log(file.mimetype);
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "video/mp4"
        ) {
          var filename = file.name;
          file.mv("./src/public/uploads/" + filename, function (err: any) {
            if (err) {
              res.send(err);
            } else {
              res.status(200).json({ blog: "blog added successfully" });
            }
          });
        }
      } else {
        let blogItem = new blogModel(req.body);
        await blogItem.save();
        res.status(200).json({ blog: "blog added successfully" });
      }
    } catch (err) {
      res.status(400).send("Adding new blog failed");
    }
  }

  public static async GetAllBlogs(req: any, res: express.Response) {
    try {
      let allBlogs = await blogModel.find();
      
      res.status(200).json(allBlogs);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public static async GetBlogByID(req: express.Request, res: express.Response) {
    try {
      let blog: any = await blogModel.findById(req.params.blogId);
      res.status(200).json(blog);
    } catch (err) {
      res.status(400).send(err);
    }
  }
  public static async UpdateBlog(req: express.Request, res: express.Response) {
    try {
      let blog: any = await blogModel.findById(req.params.blogId);
      if (!blog) {
        res.status(404).send("data is not found");
      }
      blog.title = req.body.title;
      blog.desc = req.body.desc;

      blog.save();
      res.json("Blog updated!");
    } catch (err) {
      res.status(400).send("Update not possible");
    }
  }

  public static async DeleteBlog(req: express.Request, res: express.Response) {
    try {
      let blog: any = await blogModel.findByIdAndDelete(req.params.blogId);
      res.json("blog Deleted");
    } catch (err) {
      res.status(400).send("Blog Cannot be deleted");
    }
  }
}
