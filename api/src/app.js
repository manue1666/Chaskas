import express from "express";
import cors from "cors";
import { getAllUsers, login, registerUsers } from "./Controllers/UsersController.js";
import { createChaska, deleteChaska, getAllChaskas, getChaskas, updateChaska } from "./Controllers/ChaskasController.js";

//servidor
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(_req, res)=>{
    res.send("hola desde servidor js")
})


//endpoints

//endpoints de usuarios
app.post("/users/regist",registerUsers)
app.post("/users/login",login)
//obtener todos los usuarios
app.get("/users/getAllUsers",getAllUsers)

//endpoints de chaskas

//crear chaska
app.post("/chaskas/create",createChaska)
//obtener chaskas del usuario
app.post("/userchaskas/get",getChaskas)
//obtener todas las chaskas
app.get("/allchaska/get",getAllChaskas)
//actualizar chaska
app.put("/chaskas/update", updateChaska)
//borrar chaska
app.delete("/chaska/delete",deleteChaska)

export default app;