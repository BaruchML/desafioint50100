import twilio from "twilio"
import { configObject } from "../config/config.js"


const {twilio_sid,twilio_token,twilio_phone} = configObject

const client = twilio(twilio_sid,twilio_token)

export const sendSms = (nombre, apellido)=> client.messages.create({
    body:`Gracias por la compra ${nombre} ${apellido}`,
    from: twilio_phone,
    to:'+527716992830'
})