import { useState, ChangeEvent } from 'react'
import { utilities } from '../utils/utilities';
import { Ticket, TicketCategory, TicketStatus, getDefaultTicket, Task } from '../../pages/common/appTypes';
import Modal from './modal'
import TicketForm from './ticket-form';
import styles from './tickets-container.module.scss';

export default function TicketCard({ ticket, onAddNewTask }: { ticket: Ticket; onAddNewTask: (task: Task) => void }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onAddNewTicket = () => {}

  return (
    <section>
      <div className={`${styles.card} ${ticket.ticketCategory == TicketCategory.Ticket ? styles.ticket : styles.bug}`}>
        <div className={styles.titleDiv}>
          <span className={styles.ticketTitle}>{ticket.title}</span>
          <button className={`${styles.addNewTask} ${ticket.ticketCategory==TicketCategory.Bug ? styles.bug : styles.ticket}`}
            onClick={openModal}>
              +
          </button>
        </div>
        <span className={styles.ticketInfo}>Owner: {ticket.owner}</span>
        <span className={styles.ticketInfo}>Status: {TicketStatus[ticket.status]}</span>
        <span className={styles.ticketInfo}>Due Date: {utilities.formatDate(new Date(ticket.dueDate))}</span>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TicketForm initialTicket={getDefaultTicket()} ticketType={TicketCategory.None} 
          onAddNewTicket={onAddNewTicket} onAddNewTask={onAddNewTask} onClose={closeModal} />
      </Modal>
    </section>
  );
}
