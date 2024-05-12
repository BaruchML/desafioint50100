import ticketModel from "../models/ticket.model.js";

class TicketDaoMongo {
    constructor() {
        this.model = ticketModel
    }

    get = async () => await this.model.find({ isActive: true })

    getBy = async (filter) => await this.model.findOne({ _id: filter })

    create = async (newTicket) => await this.model.create(newTicket)

    update = async (tid, newTicket) => await this.model.findOneAndUpdate({ _id: tid }, newTicket, { new: true })

    delete = async (tid) => await this.model.findOneAndUpdate({ _id: tid }, { isActive: false })

}

export default TicketDaoMongo