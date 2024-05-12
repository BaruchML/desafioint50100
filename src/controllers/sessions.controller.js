import userDaoMongo from "../dao/Mongo/userDao.mongo.js";
import { createHash, isInvalidPassword } from "../utils/hashBcrypt.js";
import generateToken, { authTokenMiddleware } from "../utils/jsonwebtoken.js";
import passport from "passport";
import { cartService, userService } from "../repositories/index.repository.js";
import { sendMail } from "../utils/sendEmail.js";
import loggerWinston from "../utils/logger.js"

export class SessionController {
    constructor() {
        this.services = userService
        this.serviceCart = cartService
    }

    register = async (req, res) => {

        try {
            const { first_name, last_name, email, password,role } = req.body

           // validar los datos recibidos
           if (!first_name || !last_name || !email || !password) return res.status(400).send({status: 'error', error: 'Values incomplete'})
           const exists = await this.services.getUserBy({email:email})

           if (exists) return res.status(401).send({status: 'error', message: 'El usuario ya existe'})

           let carts = []
            const newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password),
                role
            }
            const newCart = {
                title:`${newUser.first_name} Cart`,
                emailUser: `${newUser.email}`
        }
        const cartDao = await this.serviceCart.createCart(newCart)
        const cart = await this.serviceCart.getCartByEmail({emailUser:`${newUser.email}`})
       
        const user = await this.services.createUser(newUser)
        const userDao = await this.services.getUserBy({email:`${newUser.email}`})
        userDao.carts.push({cart})
        const finallUser = await this.services.updateUser(userDao._id,userDao)
            //ENVIAR EMAIL
            // const emailConfigObject = {
            //     service: 'Bienvenido usuario',
            //     to: newUser.email,
            //     subject : 'Bienvenido a la app de ecomerce',
            //     html:'<h!>Bienvenido</h1>'
            // }
            // sendMail(emailConfigObject)

            //TOKEN 
            //NO GUARDAR DATOS SENSIBLES
            loggerWinston.info(finallUser);
            const token = generateToken({
                fullname: `${first_name} ${last_name}`,
                role:role,
                id:finallUser._id 
            })

            res.cookie('cookieToken', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true
            }).send({ status: 'success',payload: finallUser, token})

        } catch (error) {
            loggerWinston.error({ status: 'error', error: error.message });

        }
     
    }
    login = async (req, res) => {
        try {
            const { email, password } = req.body

            if (!email || !password) return res.status(400).send({status: 'error', error: 'Values incomplete'})

            const userFoundDB = await this.services.getUserBy({email})

            if (!userFoundDB) return res.status(401).send({status: 'error', error: 'No se encuentra el usuario'})

            if (!isInvalidPassword({ password: userFoundDB.password }, password)) return res.status(401).send('no coincide las credenciales')

            const token = generateToken({
                fullname: `${userFoundDB.first_name} ${userFoundDB.last_name}`,
                role: userFoundDB.role,
                email: userFoundDB.email
            })

            //esta vinculado a authentication
            res.cookie('cookieToken', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true
            }).send({
                status: "success",
                usersCreate: 'login success'
            })
        } catch (error) {
            loggerWinston.error({ status: 'error', error: error.message });
        }
    }

    current = async (req, res) => {
        try {
            res.send({ message: 'datos sensibles' })

        } catch (error) {
            loggerWinston.error({ status: 'error', error: error.message });
        }
    }

}