import express from "express";
import { registrar, confirmar, autenticar, resetearPassword, tokenPassword, nuevoPassword, perfil, editarPerfil } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Public Routes
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/password-reset', resetearPassword);
//router.get('/password-reset/:token', tokenPassword);
//router.post('/password-reset/:token', nuevoPassword); Manera simplificada:
router.route('/password-reset/:token').get(tokenPassword).post(nuevoPassword);

//Private Routes
router.get('/perfil', checkAuth, perfil); //Ejecuta un middleware después del otro
router.put('/editar-perfil', checkAuth, editarPerfil); //Ejecuta un middleware después del otro


export default router;
