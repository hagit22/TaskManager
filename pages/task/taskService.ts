import { LoremIpsum } from "lorem-ipsum";
import { utilities } from "@/app/utils/utilities";
import { randomData } from "@/app/utils/randomData";
import { Ticket, TicketStatus } from "../ticket/ticketService";


export interface Task {
    _id: string;
    title: string;
    description: string;
    owner: string;
    status: TaskStatus;
    priority: number;
    ticketId: string;
}

export enum TaskStatus {
    New,
    InProgress,
    Done
}

export const taskService = {
    getTasks,
    getTasksForTicket,
    createTask,
    updateTask,
    deleteTask
}

const MAX_TASKS_PER_TICKET = 6


async function getTasks () {
}
  
async function getTasksForTicket(ticket: Partial<Ticket>) {
    //console.log("taskService: getTasksForTicket number: ",ticket)
    const taskList = utilities.getRandomUniquesFromList(randomData.taskTitles, MAX_TASKS_PER_TICKET)
    const tasks: Partial<Task>[] = new Array(taskList.length).fill({});
    return Promise.resolve(tasks.map ((val: Object, index: number) => 
        ({
            _id: index,
            title: taskList[index],
            description: new LoremIpsum().generateSentences(1),
            owner: ticket.owner,
            dueDate: ticket.dueDate,
            status: _getNewTaskStatus(ticket.status),
            priority: ticket.priority,
            ticketId: ticket._id
        })
    ))
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



