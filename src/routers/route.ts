import express from "express"
import {BlogService} from "../services/blogservice"
import multer from "multer"
import { blogModel } from "../models/blog";
import fs from "fs"



export class Routes{
    constructor(){}
    
    public static RegisterAPIs(app:express.Application){
        
        
        app.get("/",BlogService.GetAllBlogs);
        app.get("/:blogId",BlogService.GetBlogByID);
        // // app.post("/createblog",BlogService.CreateBlog);
        app.put("/blog/:blogId",BlogService.UpdateBlog);
        app.delete("/blog/:blogId",BlogService.DeleteBlog);
     
        const storage=multer.diskStorage({
          destination:function(req,file,cb){
            cb(null,'./src/uploads')
          },
          filename:function (req,file,cb){
            cb(null,Date.now()+ file.originalname)
          }
        });

        const fileFilter=(req:any,file:any,cb:any)=>{
          if(file.mimetype==="image/jpeg" || file.mimetype==="image/jpg" || file.mimetype==="image/png"){
            cb(null,true)
          }else{
            cb(null,false)
          }
        }

        const upload=multer({
          storage:storage,
          limits:{
            fileSize:1024 * 1024 *5
          },
          fileFilter:fileFilter
        
        });

        app.post("/uploadmulter",upload.single('imageData'),(req:any,res:any,next:any)=>{
    
          try{
            if(req.files){
                      const newImage=new blogModel({
            imageName:req.body.imageName,
            imageData:req.file.path,
            image:req.file.filename,
            title:req.body.title,
            desc:req.body.desc
          });
          newImage.save()
          res.status(200).json({newImage})
        }
        else{
          const newImage=new blogModel({
            title:req.body.title,
            desc:req.body.desc
          });
          newImage.save()
          res.status(200).json({newImage})
        }
        }
        catch(err){
          res.status(400).send(err);
        }
         
          })
          
      
 } }