
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;



//multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`${__dirname}/public/img`);
    },
    filename:(req, file, cb)=>{
        cb(null, `${Date.now( )}-${file.originalname}`)
    }
})

export const uploader = multer({storage});