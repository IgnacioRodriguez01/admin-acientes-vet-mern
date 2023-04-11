import express from "express";
import { agregarPaciente, obtenerPacientes, obtenerPaciente, editarPaciente, borrarPaciente } from "../controllers/pacienteController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route("/")
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes);

router.route("/:id")
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, editarPaciente)
    .delete(checkAuth, borrarPaciente);

export default router;