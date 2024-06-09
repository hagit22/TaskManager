import { useState, useEffect } from 'react'
import { Ticket, Task, TaskStatus } from '../../pages/common/appTypes';
import { taskClient } from '@/pages/task/taskClient';
import TicketCard from './ticket-card';
import TaskCard from './task-card';
import styles from './tickets-container.module.scss';

export default function SingleTicketContainer({ ticket, onUpdateTicket }: 
  { ticket: Ticket; onUpdateTicket: (ticket: Ticket) => void }) {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const ticketObject = ticket as any
    setTasks(ticketObject.tasks)
    //getTicketTasks()
  }, [ticket])

  /*useEffect( () => {
    //console.log("Got Tasks: ",tasks.length)
  }, [tasks, tasks.length])*/

  /*const getTicketTasks = async () => {
    try {
      const tasks = await taskClient.getTasksForTicket(ticket)
      setTasks(tasks)
    }
    catch(err) {
      console.log("getTicketTasks Error: ",err)
    }
  }*/

  const onAddNewTask = (newTask: Task) => {
    const ticketObject = ticket as any
    const updatedTasks = [newTask, ...ticketObject.tasks]
    const updatedTicket = {...ticketObject, tasks: updatedTasks}
    console.log("onAddNewTask: ",updatedTicket)
    onUpdateTicket(updatedTicket)
  }

  return ( tasks &&
    <section className={styles.singleTicketContainer}>
      <TicketCard ticket={ticket} onAddNewTask={onAddNewTask}/>

      <TaskCard taskGroup={tasks.filter(task => task.status.toString() == "0" || task.status == TaskStatus.New)}/>
      <TaskCard taskGroup={tasks.filter(task => task.status.toString() == "1" || task.status == TaskStatus.InProgress)}/>
      <TaskCard taskGroup={tasks.filter(task => task.status.toString() == "2" || task.status == TaskStatus.Done)}/>

      {/* <TaskCard taskGroup={tasks.filter(task => task.status == TaskStatus.New)}/>
      <TaskCard taskGroup={tasks.filter(task => task.status == TaskStatus.InProgress)}/>
      <TaskCard taskGroup={tasks.filter(task => task.status == TaskStatus.Done)}/> */}
    </section>
  );
}
