import { model, Schema } from "mongoose";



const ChaskaSchema = new Schema({
    c_name:{
        type:String,
        required:true
    },
    c_description:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"users"
    }
})

export const ChaskaModel = model("chaskas",ChaskaSchema)