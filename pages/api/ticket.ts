import { NextApiRequest, NextApiResponse } from 'next';
import { ticketService } from '../ticket/ticketService'; 
import { CRUDCodes, StatusCodes, ErrorMessages } from '../common/commonTypes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //console.log("Ticket Request:", {method: req.method, /*headers: req.headers, body: req.body*/ query: req.query})
    switch (req.method) {
        case CRUDCodes.GET :
            try {
                const { startDate, endDate } = req.query as { startDate: string, endDate: string };
                const dateRange = {startDate: new Date(startDate), endDate: new Date(endDate)}
                const tickets = await ticketService.getTickets(dateRange);
                res.status(StatusCodes.OK).json(tickets);
            }
            catch(err) {
                res.status(500).json({ error: ErrorMessages.GET + 'tickets' });
                console.log(ErrorMessages.GET + 'tickets' + '==> ',err)
            }
            break;
        case CRUDCodes.POST :  
            try {
                const newTicket = await ticketService.createTicket(req.body);
                res.status(StatusCodes.CREATED).json(newTicket);
            }
            catch(err) {
                res.status(500).json({ error: ErrorMessages.POST + 'ticket' });
                console.log(ErrorMessages.POST + 'ticket' + '==> ',err)
            }
            break;
        case CRUDCodes.PUT :
            try {
                const { id } = req.query                
                if (typeof id != 'string')
                    throw('Illegal id')
                const updatedTicket = await ticketService.updateTicket(id, req.body);
                res.status(StatusCodes.OK).json(updatedTicket);
            }
            catch(err) {
                res.status(500).json({ error: ErrorMessages.PUT + 'ticket' });
                console.log(ErrorMessages.PUT + 'ticket' + '==> ',err)
            }
            break;
        case CRUDCodes.DELETE :  
            try {
                const { id } = req.query
                if (typeof id != 'string')
                    throw('Illegal id')
                const newTicket = await ticketService.deleteTicket(id);
                res.status(StatusCodes.NO_CONTENT).end();
            }
            catch(err) {
                res.status(500).json({ error: ErrorMessages.DELETE + 'ticket' });
                console.log(ErrorMessages.DELETE + 'ticket' + '==> ',err)
            }
            break;
        default: 
            res.setHeader('Allow', [CRUDCodes.GET, CRUDCodes.POST, CRUDCodes.PUT, CRUDCodes.DELETE]);
            res.status(StatusCodes.NOT_ALLOWED).end(`Method ${req.method} not allowed`);
  }
}


