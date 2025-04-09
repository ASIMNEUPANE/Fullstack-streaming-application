import express from "express";
import cors from "cors";
import multer  from "multer";
import {v4 as uuidv4} from "uuid"
import path from "path"


const app = express();

// multer middleware
const storage = multer.diskStorage({
    // cb is callback
    destination:function(req,res,cb){
        cb(null, "./uploads")

    },
    filename:function(req,file,cb){
        // path.extname allow extension to be at the end of the filename
        cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
})
// multer config
const upload = multer({
    storage:storage
})
app.use(cors({
    origin:[
        "http://localhost:3000",
        "http://localhost:5173",
        
    ],
    credentials:true
}))

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",)
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )

next();
})
app.use("/uploads", express.static("uploads"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.json({message:"Hello World"})
})
app.post("/upload",upload.single("file"),(req,res)=>{
    console.log("File uploaded")
})
app.listen(8080,()=>{
    console.log("server running")
})