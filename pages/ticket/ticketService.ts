import { LoremIpsum } from "lorem-ipsum";
import { DateRange, utilities } from "../../app/utils/utilities";
import { randomData } from "../../app/utils/randomData";


export interface Ticket {
    _id: string;
    title: string;
    description: string;
    owner: string;
    dueDate: Date;
    status: TicketStatus;
    priority: number;
    ticketCategory: TicketCategory;
}

export enum TicketCategory {
    None = "",
    Ticket = "Ticket",
    Bug = "Bug"
}

export enum TicketStatus {
    New,
    Approved,
    Committed,
    Done
}

export const ticketService = {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket
}

const PRIORITY_RANGE = 10


async function getTickets (dateRange: DateRange) {
    //console.log("ticketService: getTickets - DateRange: ", dateRange)
    let tickets: Array<Ticket> = []
    for (let index=0; index<30; index++) {
        const category = _getRandomCategory()
        tickets.push ({
            _id: index.toString(),
            title: category == TicketCategory.Ticket ? randomData.ticketTitlesShort[index] : randomData.bugTitlesShort[index],
            description: new LoremIpsum().generateSentences(1),
            owner: utilities.getRandomValInList(randomData.ownerNames),
            dueDate: utilities.getRandomDateInRange(10),
            status: _getRandomTicketStatus(),
            priority: utilities.getRandomValInRange(PRIORITY_RANGE),
            ticketCategory: category
        })
    }
    console.log("the tickets are: ",tickets.length, dateRange)
    tickets = tickets.filter(ticket => ticket.dueDate >= dateRange.startDate && ticket.dueDate <= dateRange.endDate)
    return Promise.resolve(tickets)
}
  
/*const getTickets = async (dateRange: DateRange) => {
    console.log("ticketService: getTickets!!!")
    const tickets: Partial<Ticket>[] = new Array(10).fill({});
    return Promise.resolve(tickets.map ((val: Object, index: number) => 
        {
            const category = getRandomCategory()
            return {
                _id: index,
                title: category == TicketCategory.Ticket ? randomData.ticketTitlesShort[index] : randomData.bugTitlesShort[index],
                description: new LoremIpsum().generateSentences(1),
                owner: utilities.getRandomValInList(randomData.ownerNames),
                dueDate: utilities.getRandomDateInComingDays(30),
                status: getRandomTicketStatus(),
                priority: utilities.getRandomValInRange(PRIORITY_RANGE),
                ticketCategory: category
            }
        }
    ))
}*/
  
async function createTicket (ticket: Ticket[]) {
}

async function updateTicket (id: string, ticket: Ticket) {
}

async function deleteTicket (id: string) {
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

