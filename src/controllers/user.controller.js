import { userService, cartService } from "../repositories/index.repository.js";
import CustomError from "../utils/errors/customError.js";
import generateUserErrorInfo from "../utils/errors/info.js";
import Errors from "../utils/errors/enums.js";
import loggerWinston from "../utils/logger.js"

export class UserController {
    constructor() {
        this.services = userService
        this.serviceCart = cartService
    }
    getUsers = async (req, res) => {
        try {
            const users = await this.services.getUsers()

             loggerWinston.info(users);

            res.send(users)

        } catch (error) {
             loggerWinston.error(error);
        }

    }
    getUser = async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await this.services.getUserById(uid);

            res.send({
                status: 'Success',
                result: user
            })
        } catch (error) {
             loggerWinston.error(error)
        }


    }

    getUsersPremium = async (req,res) =>{
        try {
            const users = await this.services.getUsersPremium({isPremium:true})

             loggerWinston.info(users);

            res.send(users)
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    createUser = async (req, res,next) => {
        try {
            const { first_name, last_name, email, age, password, role } = req.body

            if(!last_name || !last_name || !email){
                CustomError.createError({
                    name:"User creation error",
                    cause: generateUserErrorInfo({
                        first_name,
                        last_name,
                        email
                    }),
                    message:'Error tryng to created user',
                    code: Errors.INVALID_TYPE_ERROR
                })
            }

            let carts = []
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password,
                role,
                carts
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

            res.send({
                status: 'Success',
                usersCreate: finallUser
            })

        } catch (error) {
            next(error)
        }

    }
    updateUserToPremium = async (req, res) => {
        try {
            const { uid } = req.params       
            const userPremium = await this.services.updateUserToPremium(uid)
            res.send({
                status: 'Success',
                message: userPremium,
            })
        } catch (error) {
             loggerWinston.error(error)
        }

    }
    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params
            const result = await this.services.deleteUser(uid)
            res.send({
                status: 'Success, user delete'
            })
        } catch (error) {
            loggerWinston.error(error)
        }
        
    }
    
    getDocuments = async (req,res) => {
        try {
            const {uid} = req.params

            const user = await this.services.getUserById(uid)
            const result = console.log(user.documents);
            res.send({
                status: 'Success, there is user documents',
                payload: result
            })
        } catch (error) {
            loggerWinston.error(error)
            
        }
    }
}

