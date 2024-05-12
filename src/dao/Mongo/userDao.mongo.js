import { paginate } from "mongoose-paginate-v2";
import usersModel from "../models/users.model.js";

class UserDaoMongo {
    constructor() {
        this.model = usersModel
    }

    // getUsersPaginate = async (limit=10, page=1)=> await this.usersModel.paginate({},{limit,page,lean,})

    get = async _ => await this.model.find({ isActive: true })
    getPremium = async (filter) => await this.model.find(filter)

    getBy = async (filter) => await this.model.findOne(filter)//probar que traiga activos y que sea por filtro
    
    getById = async (uid) => await this.model.findOne({_id:uid})//probar que traiga activos y que sea por filtro

    create = async (newUser) => await this.model.create(newUser)

    update = async (uid,userToUpdate) => await this.model.findOneAndUpdate({ _id: uid }, userToUpdate, { new: true })

    updatePremium = async (uid) => await this.model.findOneAndUpdate({ _id: uid }, {isPremium: true}, { new: true })

    delete = async (uid) => await this.model.findOneAndUpdate({ _id: uid }, { isActive: false })
}

export default UserDaoMongo