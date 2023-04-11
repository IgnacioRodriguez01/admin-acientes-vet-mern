import nodemailer from "nodemailer";

const emailPassword = async ({email, nombre, token}) => {
    //Definir transport con credenciales
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    //Enviar email
    const info = await transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: "Recuperar Acceso a APV",
        text: "Restablece tu Password de APV",
        html: 
        `
            <p>Hola ${nombre}, hemos recibido una solicitud de restablecimiento de contraseña de tu cuenta en APV</p>
            
            <p>Entra en el siguiente enlace para cambiar tu password:       
            <a href="${process.env.FRONTEND_URL}/password-reset/${token}">Comprobar Cuenta</a> </p>
            
            <p>Si tu no enviaste esta solicitud, alguien más está intentando acceder a tu cuenta.</p>
        
        `   
      });

      console.log("Mensaje enviado: %s", info.messageId);
};

export default emailPassword;