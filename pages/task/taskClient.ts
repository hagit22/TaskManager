import Axios from 'axios'
import { Ticket, Task } from '../common/appTypes'
import { BASE_URL, ErrorMessages } from '../common/apiTypes';

const BASE_URL_TASK = BASE_URL + '/task'


export const taskClient = {
    getTasks,
    getTasksForTicket,
    getById,
    save,
    remove
}

var axios = Axios.create({
    withCredentials: true,
})

async function getTasks(filterBy = {}, sortObj = {}) {
    try {
        var { data: tasks } = await axios.get(BASE_URL_TASK, {params : {...filterBy, ...sortObj}})
        return tasks
    }
    catch (err) {
        console.log(ErrorMessages.GET + 'tasks' + '==> client: ','\n error: ',err)
        throw new Error(ErrorMessages.GET + 'tasks');
    }
}

async function getTasksForTicket(ticket: Ticket) {
    try {
        //console.log("taskClient: getTasksForTicket number: ",ticket)
        var { data: tasks } = await axios.get(BASE_URL_TASK, {params : { ticket: ticket }})
        return tasks
    }
    catch (err) {
        console.log(ErrorMessages.GET + 'tasks' + '==> client: ','\n error: ',err)
        throw new Error(ErrorMessages.GET + 'tasks');
    }
}

async function getById(taskId: string) {
    try {
        const url = BASE_URL_TASK + taskId
        var { data: task } = await axios.get(url)
        return task
    }
    catch (err) {
        console.log(ErrorMessages.DELETE + 'single task' + '==> client: ',taskId,'\n error: ',err)
        throw new Error(ErrorMessages.DELETE + 'single task- ' + taskId);
    }
}

async function remove(taskId: string) {
    try {
        const url = BASE_URL_TASK + taskId
        var { data: res } = await axios.delete(url)
        return res
    }
    catch (err) {
        console.log(ErrorMessages.SAVE + '==> client: ',taskId,'\n error: ',err)
        throw new Error(ErrorMessages.SAVE + taskId);
    }
}

async function save(task: Task) {
    try {
        const method = task.id ? 'put' : 'post'
        const url = BASE_URL_TASK 
        const { data: savedTask } = await axios[method](url, task)
        return savedTask
    }
    catch (err) {
        console.log(ErrorMessages.GET + '==> client: ',task,'\n error: ',err)
        throw new Error(ErrorMessages.GET + task);
    }
}
