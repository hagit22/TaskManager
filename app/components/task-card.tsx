import { Task } from '../../pages/task/taskService';
import styles from './tickets-container.module.scss';

export default function TaskCard({ taskGroup }: { taskGroup: Task[] }) {

  return (
    <section className={`${styles.card} ${styles.task}`}>
      {taskGroup.map ((task, index) => <span key={index} className={styles.taskTitle}>{task.title}</span>)}
    </section>
  );
}
