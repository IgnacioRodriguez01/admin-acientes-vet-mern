import jwt from "jsonwebtoken";
import Veterinario from "../Models/Veterinario.js";

//Este middleware es para verificar y restringir acceso las rutas a usuarios autorizados
const checkAuth = async (req, res, next) => { 
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //En req.veterinario almacenamos la "sesion" del veterinario
            req.veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado" //Quita estos campos del select
            );
        
            return next();

        } catch (error) {
            const err = new Error('Error en la autenticación. Inténtalo de nuevo.');
            res.status(401).json({ msg: err.message });
        }
    }

    if(!token) {
        const err = new Error('JWT no válido o inexistente');
        res.status(401).json({ msg: err.message });
    }
    

    next();
};

export default checkAuth;