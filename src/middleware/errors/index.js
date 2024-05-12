import Errors from "../../utils/errors/enums.js";
import loggerWinston from "../../utils/logger.js";


const handleErrors = (error, req, res, next)=>{
    loggerWinston.warning(error.cause);

    switch(error.code){
        case Errors.INVALID_TYPE_ERROR:
            return res.send({status: 'error',error: error.name})   
            break;

        default:
            return res.send ({status:'error', error: 'Error de server'})
            break;
    }
}

export default handleErrors