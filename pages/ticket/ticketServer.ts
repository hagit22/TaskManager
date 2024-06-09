import { ObjectId } from "mongodb";
import { LoremIpsum } from "lorem-ipsum";
import { DateRange, utilities } from "../../app/utils/utilities"
import { genData } from "../../app/utils/dataGenUtil"
import { dbService } from "../lib/dbService"
import { Ticket, TicketStatus, TicketCategory } from '../common/appTypes';

const COLLECTION = 'ticket'

export const ticketServer = {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
}

const PRIORITY_RANGE = 10

async function getTickets(filterBy: DateRange) {
    try {
        //console.log("ticketServer: getTickets - DateFilter: ", filterBy)
        const collection = await dbService.getCollection(COLLECTION)

        const ticketCursor = await collection.find(
        /*{'dueDate': {
            $gte: filterBy.startDate, 
            $lte: filterBy.endDate }
        }*/).toArray()

        return ticketCursor
    } 
    catch(err) {
        console.log("ticketServer: Had problems getting tickets ",err)
        throw err
    }
}
  
async function createTicket (ticket: Ticket) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const { acknowledged, insertedId } = await collection.insertOne(ticket)
        return acknowledged ? insertedId : `Did not add ticket`
    }
    catch(err) {
        console.log("ticketServer: Had problems adding tickets ",err)
        throw err
    }
}

async function updateTicket (id: string, ticket: Ticket) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        let ticketFields = {
            title: ticket.title,
            description: ticket.description,
            owner: ticket.owner,
            dueDate: ticket.dueDate,
            status: ticket.status,
            priority: ticket.priority,
            TicketCategory: ticket.ticketCategory
        }
        const ticketObject = ticket as any
        const ticketUpdate = {...ticketFields, tasks: [...ticketObject.tasks]}
        console.log("ticketServer: updateTicket - ",ticketUpdate)
        
        const { acknowledged } = await collection.updateOne({ _id: id }, { $set: ticketUpdate })
        return acknowledged ? ticket : `Did not update ticket` 
    }   
    catch(err) {
        console.log("ticketServer: Had problems updating tickets ",err)
        throw err
    }
}

async function deleteTicket (id: string) {
}



async function getTicketsDemo (dateRange: DateRange) {
    console.log("ticketServer: getTickets - DateRange: ", dateRange)
    let tickets: Array<Ticket> = []
    for (let index=0; index<10; index++) {
        const category = _getRandomCategory()
        tickets.push ({
            id: index.toString(),
            title: category == TicketCategory.Ticket ? genData.ticketTitlesShort[index] : genData.bugTitlesShort[index],
            description: new LoremIpsum().generateSentences(1),
            owner: utilities.getRandomValInList(genData.ownerNames),
            dueDate: utilities.getRandomDateInRange(15),
            status: _getRandomTicketStatus(),
            priority: utilities.getRandomValInRange(PRIORITY_RANGE),
            ticketCategory: category
        })
    }
    //const mongoTickets = tickets.map(ticket => ({...ticket, tasks: [] as Task[]}))
    //console.log(JSON.stringify(mongoTickets, null, 2))
    tickets = tickets.filter(ticket => ticket.dueDate >= dateRange.startDate && ticket.dueDate <= dateRange.endDate)
    return Promise.resolve(tickets)
}


function _getRandomCategory() {
    const random = utilities.getRandomValInRange(2)
    return random ? TicketCategory.Bug : TicketCategory.Ticket
}

function _getRandomTicketStatus() {
    const random = utilities.getRandomValInRange(4)
    switch (random) {
        case 0: return TicketStatus.New
        case 1: return TicketStatus.Approved
        case 2: return TicketStatus.Committed
        case 3: return TicketStatus.Done
        default: return TicketStatus.New
    }
}

