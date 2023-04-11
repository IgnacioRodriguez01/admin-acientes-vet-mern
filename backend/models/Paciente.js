import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
        nombre: {
            type: String,
            required: true,
        },
        propietario: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        fecha_alta: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        sintomas: {
            type: String,
            required: true,
        },
        vet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Veterinario',
            required: true,
        },

    }, 
    {
        timestamps: true,
    }
)

const Paciente = mongoose.model('Paciente', pacienteSchema);
export default Paciente;