
class TicketRepository{
    constructor(ticketDao){
        this.dao=ticketDao
    }
    getTickets = async () => await this.dao.get()
    getTicketBy = async (filter) => await this.dao.getBy(filter)
    createTicket = async (newTicket) => await this.dao.create(newTicket)
    updateTicket = async (tid,ticketToUpdate) => await this.dao.update(tid,ticketToUpdate)
    deleteTicket = async (tid) => await this.dao.delete(tid)
}

export default TicketRepository