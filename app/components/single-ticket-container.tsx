import { useState, useEffect } from 'react'
import { Ticket } from '../../pages/ticket/ticketService';
import { Task, TaskStatus } from '@/pages/task/taskService';
import { taskClient } from '@/pages/task/taskClient';
import TicketCard from './ticket-card';
import TaskCard from './task-card';
import styles from './tickets-container.module.scss';

export default function SingleTicketContainer({ ticket }: { ticket: Ticket }) {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getTicketTasks()
  }, [ticket])

  /*useEffect( () => {
    //console.log("Got Tasks: ",tasks.length)
  }, [tasks, tasks.length])*/

  const getTicketTasks = async () => {
    try {
      const tasks = await taskClient.getTasksForTicket(ticket)
      setTasks(tasks)
    }
    catch(err) {
      console.log("getTicketTasks Error: ",err)
    }
  }

  return ( tasks &&
    <section className={styles.singleTicketContainer}>
      <TicketCard ticket={ticket}/>
      <TaskCard taskGroup={tasks.filter(task => task.status == TaskStatus.New)}/>
      <TaskCard taskGroup={tasks.filter(task => task.status == TaskStatus.InProgress)}/>
      <TaskCard taskGroup={tasks.filter(task => task.status == TaskStatus.Done)}/>
    </section>
  );
}
