import { Task } from '../../pages/common/appTypes';
import styles from './tickets-container.module.scss';

export default function TaskCard({ taskGroup }: { taskGroup: Task[] }) {

  return (
    <section className={`${styles.card} ${styles.task}`}>
      {taskGroup.map ((task, index) => <span key={index} className={styles.taskTitle}>{task.title}</span>)}
    </section>
  );
}
