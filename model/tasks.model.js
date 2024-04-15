const mongoose=require("mongoose")

const tasksSchema=mongoose.Schema({
    name:String,
    status:String,
},{
    versionKey:false,
    timestamps:true
})

const tasksModel=mongoose.model('task',tasksSchema)

module.exports={tasksModel}