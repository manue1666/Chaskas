import { ChaskaModel } from "../Models/ChaskasModel.js";

export const createChaska = async (req, res) => {
    try {
        const c_name = req.body.c_name
        const c_description = req.body.c_description
        const userId = req.body.userId

        if(!c_name || !c_description){
            res.status(400).json({msg:"datos incompletos"})
            return
        }

        const chaska = await ChaskaModel.create({
            c_name,
            c_description,
            userId
        })
        res.status(200).json({msg:"chaska creada con exito", chaska})
        return


    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"error al crear tarea"})
        return
    }
}

export const getChaskas = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            res.status(400).json({ msg: "el usuario no existe" });
            return;
        }

        const userChaskas = await ChaskaModel.find({ userId });

        if (userChaskas.length === 0) {
            res.status(400).json({ msg: "este usuario no tiene chaskas :(" });
            return;
        }

        res.status(200).json({ msg: "chaskas encontradas:", userChaskas });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "no se pudo sorry" });
        return;
    }
};

export const getAllChaskas = async (_req, res) => {
    try {
        const allChaskas = await ChaskaModel.find();
        if (!allChaskas || allChaskas.length === 0) {
            res.status(400).json({ msg: "no hay chaskas para mostrar" });
            return;
        }
        res.status(200).json({ msg: "aqui estan las chaskas creadas:", allChaskas });
    } catch (error) {
        res.status(500).json({ msg: "un error al obtener chaskas" });
    }
};

export const updateChaska = async (req, res) => {
    try {
        const chaskaId = req.body._id;
        if (!chaskaId) {
            res.status(400).json({ msg: "no existe la chaska" });
            return;
        }
        const updatedChaska = await ChaskaModel.findByIdAndUpdate(chaskaId, req.body, { new: true });
        res.status(200).json({ msg: "chaska editada con exito", updatedChaska });
        return;
    } catch (error) {
        res.status(500).json({ msg: "error al updatear" });
        return;
    }
};

export const deleteChaska = async (req, res) => {
    try {
        const chaskaId = req.body._id;
        if (!chaskaId) {
            res.status(400).json({ msg: "no se encontro la chaska" });
            return;
        }
        const deletedChaska = await ChaskaModel.findByIdAndDelete(chaskaId);
        res.status(200).json({ msg: "se elimino la chaska con exito", deletedChaska });
        return;
    } catch (error) {
        res.status(500).json({ msg: "error al eliminar chaska" });
        return;
    }
};
