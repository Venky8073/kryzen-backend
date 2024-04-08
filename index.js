const express=require('express')
const { connection } = require('./db')
const { tasksModel } = require('./model/tasks.model')
const cors=require('cors')

const app=express()

// middlewares
app.use(cors())
app.use(express.json())

// request and responce
app.get('/',async(req,res)=>{
    try{
        const tasks=await tasksModel.find()
        res.status(200).send({"data":tasks})
    }catch(err){
        res.status(400).send({"msg":"failed"})
    }
})

app.post('/add',async(req,res)=>{
    try{
        const new_task=new tasksModel(req.body)
        await new_task.save()
        res.status(200).send({"msg":"sucessfully saved","task":new_task})
    }catch(err){
        res.status(400).send({"msg":"failed to save"})
    }
})

app.patch('/edit/:id',async(req,res)=>{
    const id=req.params.id
    try{
        await tasksModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"Updated successfully"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
        await tasksModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"deleted successfully"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

app.listen(4500,async()=>{
    try{
        await connection
        console.log('running on 4500')
    }catch(err){
        console.log(err)
    }   
})
