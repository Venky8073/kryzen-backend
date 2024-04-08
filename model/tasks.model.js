const mongoose=require("mongoose")

const tasksSchema=mongoose.Schema({
    name:String,
    status:String,
    date:String
},{
    versionKey:false
})

const tasksModel=mongoose.model('task',tasksSchema)

module.exports={tasksModel}