import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  imageName:{type:String, default:"none"},
  imageData:{type:String},
  image:{type:String},
  title:{type:String},
  desc:{type:String}
  
});

export const blogModel = mongoose.model("blog", blogSchema);
