import { LoremIpsum } from "lorem-ipsum";
import { utilities } from "@/app/utils/utilities";
import { genData } from "@/app/utils/dataGenUtil";
import { Task, TaskStatus, Ticket, TicketStatus, getDefaultTicket } from '../common/appTypes';


export const taskServer = {
    getTasks,
    getTasksForTicket,
    createTask,
    updateTask,
    deleteTask
}

const MAX_TASKS_PER_TICKET = 5


async function getTasks () {
}
  
async function getTasksForTicket(ticket: Partial<Ticket>) {
    //console.log("taskService: getTasksForTicket number: ",ticket)
    
    /*const tasks: Partial<Task>[] = new Array(taskList.length).fill({});
    return Promise.resolve(tasks.map ((val: Object, index: number) => */

    const defaultTicket = getDefaultTicket()
    const taskList = utilities.getRandomUniquesFromList(genData.taskTitles, MAX_TASKS_PER_TICKET)
    let tasks: Array<Task> = []
    for (let index=0; index<taskList.length; index++) {
        tasks.push ({
            id: index.toString(),
            title: taskList[index],
            description: new LoremIpsum().generateSentences(1),
            owner: ticket.owner || defaultTicket.owner,
            status: _getNewTaskStatus(ticket.status),
            priority: ticket.priority || defaultTicket.priority,
            ticketId: ticket.id || defaultTicket.id
        })
    }
    //console.log(JSON.stringify(tasks, null, 2))
    return Promise.resolve(tasks)
}
  
async function createTask (task: Task[]) {
}

async function updateTask (id: string, task: Task) {
}

async function deleteTask (id: string) {
}


function _getNewTaskStatus(ticketStatus: TicketStatus  | undefined) {
    switch (ticketStatus) {
        case TicketStatus.New: return TaskStatus.New
        case TicketStatus.Done: return TaskStatus.Done
        default: return _getRandomTaskStatus()
    }
}

function _getRandomTaskStatus() {
    const random = utilities.getRandomValInRange(3)
    switch (random) {
        case 0: return TaskStatus.New
        case 1: return TaskStatus.InProgress
        case 2: return TaskStatus.Done
        default: return TaskStatus.New
    }
}



