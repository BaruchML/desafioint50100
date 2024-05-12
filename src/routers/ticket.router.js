import {Router} from 'express'
import { TicketController } from '../controllers/ticket.controller.js'

const router = Router()
const { 
    getTicket,
    getTicketBy,
    createTicket,
    updateTicket,
    deleteTicket,
    ticketPost} = new TicketController()
router
    .get('/', getTicket)
    .get('/:tid',getTicketBy )
    .post('/',createTicket)
    .put('/:tid/:pid', updateTicket)
    .post('/:cid/purchase',ticketPost)
    .delete('/:tid',deleteTicket)

export default router