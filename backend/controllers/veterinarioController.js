import emailPassword from "../helpers/emailPassword.js";
import emailRegistro from "../helpers/emailRegistro.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res, next) => {
    try {
        //Revisar usuarios duplicados
        const {email, nombre} = req.body;

        const existeUsuario = await Veterinario.findOne({email})
        if(existeUsuario) {
            const error = new Error('Correo ya registrado');
            return res.status(400).json({ msg: error.message });
        }

        //Guardar un nuevo Veterinario
        const veterinario = new Veterinario(req.body) //Esto es debido a que viene {nombre:.., email:..}
        const veterinarioSave = await veterinario.save(); //Guardar en el modelo
        
        //Enviar email
        emailRegistro({email,nombre,token: veterinarioSave.token});

        res.json(veterinarioSave);
    } catch (error) {
        console.error(error);
    }
};
const confirmar = async (req, res, next) => {
    const {token} = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token});

    if(!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.save();

        res.json( {msg: 'Usuario confirmado correctamente.'} );
    } catch (error) {
        console.log(error);
    }

};

const autenticar = async (req, res, next) => {
    const {email, password} = req.body;
    const usuario = await Veterinario.findOne({email});

    //Comprobar si existe el usuario
    if(!usuario) {
        const error = new Error('El usuario no existe.');
        return res.status(401).json({ msg: error.message });
    }

    //Comprobar si está comprobado
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada.');
        return res.status(401).json({ msg: error.message });
    };

    //Autenticar usuario. Aca se hace con methods del schema, o directamente con una funcion aca. 
    //Ver que es más seguro, dependiendo qué se envía y por donde.?
    if(await usuario.comprobarPassword(password)) {
       res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token:  generarJWT(usuario.id),
       });
    } else {
        const error = new Error('Contraseña incorrecta');
        return res.status(401).json({ msg: error.message });
    }
};

const resetearPassword = async (req, res, next) => { //Comprueba si existe cuenta y se le asigna un token
    const {email} = req.body;
    try {
        const usuario = await Veterinario.findOne({email});
        
        if(!usuario) {
            const error = new Error('Usuario no existe.');
            return res.status(404).json({ msg: error.message });
        }

        usuario.token = generarId();
        await usuario.save();

        //Enviar email
        emailPassword({email,nombre: usuario.nombre,token: usuario.token});

        res.json({ msg:'Email con instrucciones enviado.' });
    } catch (error) {
        return res.status(404).json({ msg: error.message });
    }
};
const tokenPassword = async (req, res, next) => { //Verificar usuario por token.
    const {token} = req.params;
    const usuario = await Veterinario.findOne({token});

    if(!usuario) {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }

    res.json({ msg: 'Token válido.' });

};
const nuevoPassword = async (req, res, next) => { //Guardar nueva contraseña
    const {token} = req.params;
    const {password} = req.body;

    try {
        const usuario = await Veterinario.findOne({token});
        if(!usuario) {
            const error = new Error('Hubo un error.');
            return res.status(404).json({ msg: error.message });
        }
        
        if(await usuario.comprobarPassword(password)) {
            const error = new Error('Ingresar una contraseña diferente a la anterior');
            return res.status(401).json({ msg: error.message });
        }

        usuario.token = null;
        usuario.password = password;
        await usuario.save()

        res.json({ msg: 'Contraseña cambiada correctamente.' });
    } catch (error) {
        return res.status(404).json({ msg: error.message });
    }
};

const perfil = (req, res, next) => {
    const {veterinario} = req;
    res.json({ perfil: veterinario });
};

export {
    registrar,
    confirmar,
    autenticar,
    resetearPassword, 
    tokenPassword, 
    nuevoPassword,
    perfil
};