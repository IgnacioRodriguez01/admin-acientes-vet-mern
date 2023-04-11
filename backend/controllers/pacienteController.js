import jwt from "jsonwebtoken";
import Paciente from "../models/Paciente.js";

//Agregar revisiones para el req.body via un middleware? No necesariamente,
//El modelo se encarga de que se requieran solo sus campos. Evaluar casos en los que sea necesario.
//Agregar alerta cuando paciente existe pero no es del veterinario?

const agregarPaciente = async (req, res, next) => {
    
    //Guardar un nuevo Paciente
    const paciente = new Paciente(req.body);
    //Traer veterinario en sesion
    paciente.vet = req.veterinario._id;
    
    try {    
        const pacienteRes = await paciente.save(); //Guardar en el modelo        
        res.json({pacienteRes});
    } catch (error) {
        console.error(error);
    }
};
const obtenerPacientes = async (req, res, next) => {
    try {
        const pacientes = await Paciente.find()
            .where('vet')
            .equals(req.veterinario._id);
        res.json(pacientes);
        
    } catch (error) {
        console.log(error);
    }
};

const obtenerPaciente = async (req, res, next) => {
    const {id} = req.params;

    const paciente = await Paciente.findOne({_id:id})
        .where('vet')
        .equals(req.veterinario._id);
    
    if(!paciente) {
        const error = new Error('Paciente no encontrado.');
        return res.status(404).json({ msg: error.message });
    }

    res.json(paciente);
};
const editarPaciente = async (req, res, next) => {
    const {id} = req.params;
    try {
        const paciente = await Paciente.findOneAndUpdate(id, req.body, {returnDocument:'after'})
            .where('vet')
            .equals(req.veterinario._id);
    
        if(!paciente) {
            const error = new Error('Paciente no encontrado.');
            return res.status(404).json({ msg: error.message });
        }
    
        res.json({msg:"Paciente editado correctamente", paciente});
        
    } catch (error) {
        console.log(error);
    }
};
const borrarPaciente = async (req, res, next) => {
    const {id} = req.params;

    try {
        const paciente = await Paciente.findOneAndDelete({_id:id})
            .where('vet')
            .equals(req.veterinario._id);        
            
            if(!paciente) {
                const error = new Error('Paciente no encontrado.');
                return res.status(404).json({ msg: error.message });
            }
        
            res.json({msg:"Paciente eliminado correctamente", paciente});

    } catch (error) {
        console.log(error);
    }

};

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    editarPaciente,
    borrarPaciente,
}