import nodemailer from "nodemailer"
import { configObject } from "../config/config.js"
import __dirname from "../utils.js"

//quien envia
const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
        user: configObject.gmail_user,
        pass: configObject.gmail_pass
    }
})


//que va a enviar
 export const sendMail = async ({service = '',to = 'buenas@buenas.com',subject='',html=''} ) => await transport.sendMail({
    // from: 'coder test <super.javier.101.@gmail.com>',
    from: `${service}-${configObject.gmail_user}`,
    to,
    subject,
    html,
    attachments: [{
        filename: 'carro.jpg',
        path: __dirname + '/utils/carro.jpg',
        cid: 'carro'

    }]

})
