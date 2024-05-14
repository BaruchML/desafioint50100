import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import logger from 'morgan'
import appRouter from './routers/index.js'
import { configObject } from './config/config.js'
//cookie - session -  store
import cookieParser from "cookie-parser";
import session from "express-session";
import  FileStore  from "session-file-store";
import MongoStore from "connect-mongo";

import cors from "cors"

//passport estrategias para el sessions 
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import handleErrors from "./middleware/errors/index.js";

import { addLogger } from "./utils/logger.js";
import loggerWinston from "./utils/logger.js";

//swagger
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express"

const app = express()
const PORT = configObject.port

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))
app.use(cors())

//cookie
app.use(cookieParser('palabrasecretaparafirmarcookie'))//cookie, en el parametro podemos crear una firma cuando cree la cookie, y no va a poder ser validada si se modifica
const fileStore = FileStore(session)
// PASSPORT
initializePassport()
app.use(passport.initialize())

app.use(addLogger)

app.use(express.static(__dirname+'/public'))
console.log(__dirname);
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//swagger config -> documentacion
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de la App de Gerardo Baruch',
            description: 'Descripción de las rutas productos y carritos de la app'
        }
    },
    apis: [`src/docs/**/*.yaml`]
}

const specs = swaggerJsDocs(swaggerOptions);

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use('/', appRouter)
app.use(handleErrors)


app.listen(PORT, (err)=>{
    if(err)loggerWinston.error(err);
   loggerWinston.info(`Escuchando en el puerto ${PORT}`);
})

