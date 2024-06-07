import { NextApiRequest, NextApiResponse } from 'next';
import { Ticket } from '../ticket/ticketService';
import { taskService } from '../task/taskService';
import { CRUDCodes, StatusCodes, ErrorMessages } from '../common/commonTypes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //console.log("Task Request:", {method: req.method, /*headers: req.headers, body: req.body, query: req.query*/})
    switch (req.method) {
        case CRUDCodes.GET :
            try {
                const ticket = { 
                    _id: req.query['ticket[_id]'], 
                    title: req.query['ticket[title]'], 
                    ticketCategory: req.query['ticket[ticketCategory]'] 
                } as Partial<Ticket>
                const tasks = await taskService.getTasksForTicket(ticket);

                res.status(StatusCodes.OK).json(tasks);
            }
            catch(err) {
                res.status(500).json({ error: ErrorMessages.GET + 'tasks' });
                console.log(ErrorMessages.GET + 'tasks' + '==> ',err)
            }
            break;
        case CRUDCodes.POST :  
            try {
                const newTask = await taskService.createTask(req.body);
                res.status(StatusCodes.CREATED).json(newTask);
            }
            catch(err) {
                res.status(500).json({ error: ErrorMessages.POST + 'task' });
                console.log(ErrorMessages.POST + 'task' + '==> ',err)
            }
            break;
        case CRUDCodes.PUT :
            try {
                const { _id } = req.query 
                if (typeof _id != 'string')
                    throw('Illegal id')
                const updatedTask = await taskService.updateTask(_id, req.body);
                res.status(StatusCodes.OK).json(updatedTask);
            }
            catch(err) {
                res.status(500).json({ error: ErrorMessages.PUT + 'task' });
                console.log(ErrorMessages.PUT + 'task' + '==> ',err)
            }
            break;
        case CRUDCodes.DELETE :  
            try {
                const { _id } = req.query 
                if (typeof _id != 'string')
                    throw('Illegal id')
                const newTask = await taskService.deleteTask(_id);
                res.status(StatusCodes.NO_CONTENT).end();
            }
            catch(err) {
                res.status(500).json({ error: ErrorMessages.DELETE + 'task' });
                console.log(ErrorMessages.DELETE + 'task' + '==> ',err)
            }
            break;
        default: 
        res.setHeader('Allow', [CRUDCodes.GET, CRUDCodes.POST, CRUDCodes.PUT, CRUDCodes.DELETE]);
        res.status(StatusCodes.NOT_ALLOWED).end(`Method ${req.method} not allowed`);
  }
}