import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from "bcrypt";

//Definir el Schema
const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String, 
        required: true,
        trim: true,
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false,
    }

});

veterinarioSchema.pre('save', async function(next) { //Aqui debe ser function para que el scope del this sea el correcto. Con las arrow el scope es global.
    if(!this.isModified('password')){ //si ya está hasheado, no lo hashea
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}

//Compilar el Schema a un Model
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default Veterinario;