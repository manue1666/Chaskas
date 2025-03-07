import { UserModel } from "../Models/UsersModel.js";

export const registerUsers = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        //valida que los datos esten completos
        if (!name || !email || !password) {
            res.status(400).json({
                msg: "datos incompletos"
            });
            return;
        }

        const user = await UserModel.create({
            name,
            email,
            password
        });
        res.status(200).json({
            msg: "usuario creado con exito",
            user
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "hubo un error al crear el usuario"
        });
        return;
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email, password: req.body.password });
        //verifica que el usuario existe
        if (!user) {
            res.status(400).json({
                msg: "el usuario no existe"
            });
            return;
        }

        res.status(200).json({
            msg: "exito al iniciar sesion",
            user
        });
        return;

    } catch (error) {
        res.status(400).json({
            msg: "ups un errorsito"
        });
        return;
    }
};

export const getAllUsers = async (_req, res) => {
    try {
        const allUsers = await UserModel.find();
        if (!allUsers) {
            res.status(400).json({ msg: "no hay usuarios registrados" });
            return;
        }
        res.status(200).json({ msg: "usuarios obtenidos con exito", allUsers });
        return;
    } catch (error) {
        res.status(500).json({ msg: "error al obtener usuarios" });
    }
};



