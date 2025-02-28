import express from "express";
import cors from "cors";

//servidor
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(_req, res)=>{
    res.send("hola desde servidor js")
})

export default app;
//endpoints