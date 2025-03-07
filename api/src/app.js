import express from "express";
import cors from "cors";
import { getAllUsers, login, registerUsers } from "./Controllers/UsersController";

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

//endpoints de usuarios

app.post("/users/regist",registerUsers)
app.post("/users/login",login)

app.get("users/getAllUsers",getAllUsers)