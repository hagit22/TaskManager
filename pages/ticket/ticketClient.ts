import Axios from 'axios'
import { DateRange } from '../../app/utils/utilities';
import { Ticket } from '../common/appTypes';
import { BASE_URL, ErrorMessages } from '../common/apiTypes';

const BASE_URL_TICKET = BASE_URL + '/ticket'

export const ticketClient = {
    getTickets,
    getById,
    save,
    remove
}

var axios = Axios.create({
    withCredentials: true,
})

async function getTickets(dateFilter: DateRange) {
    try {
        //console.log("ticketClient: getTickets - DateFilter: ", dateFilter)
        var { data: tickets } = await axios.get(BASE_URL_TICKET, {params : dateFilter})
        return tickets
    }
    catch (err) {
        console.log(ErrorMessages.GET + 'tickets' + '==> client: ','\n error: ',err)
        throw new Error(ErrorMessages.GET + 'tickets');
    }
}

async function getById(ticketId: string) {
    try {
        const url = BASE_URL_TICKET + ticketId
        var { data: ticket } = await axios.get(url)
        return ticket
    }
    catch (err) {
        console.log(ErrorMessages.GET + 'single ticket' + '==> client: ',ticketId,'\n error: ',err)
        throw new Error(ErrorMessages.GET + 'single ticket- ' + ticketId);
    }
}

async function remove(ticketId: string) {
    try {
        const url = BASE_URL_TICKET + ticketId
        var { data: res } = await axios.delete(url)
        return res
    }
    catch (err) {
        console.log(ErrorMessages.GET + 'remove' + '==> client: ',ticketId,'\n error: ',err)
        throw new Error(ErrorMessages.GET + 'remove- ' + ticketId);
    }
}

async function save(ticket: Ticket) {
    try {
        const method = ticket.id ? 'put' : 'post'
        const url = BASE_URL_TICKET 
        const { data: savedStory } = await axios[method](url, ticket)
        return savedStory
    }
    catch (err) {
        console.log(ErrorMessages.GET + 'save' + '==> client: ',ticket,'\n error: ',err)
        throw new Error(ErrorMessages.GET + 'save- ' + ticket);
    }
}


