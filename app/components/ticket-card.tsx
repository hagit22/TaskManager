import { Ticket, TicketCategory, TicketStatus } from '../../pages/common/appTypes';
import styles from './tickets-container.module.scss';
import { utilities } from '../utils/utilities';

export default function TicketCard({ ticket }: { ticket: Ticket }) {

  return (
    // <section className={`{${styles.card} ${ticket.ticketCategory == ticketTypes.TicketCategory.Ticket}`}>
    <section className={`${styles.card} ${ticket.ticketCategory == TicketCategory.Ticket ? styles.ticket : styles.bug}`}>
      <span className={styles.ticketTitle}>{ticket.title}</span>
      <span className={styles.ticketInfo}>Owner: {ticket.owner}</span>
      <span className={styles.ticketInfo}>Status: {TicketStatus[ticket.status]}</span>
      <span className={styles.ticketInfo}>Due Date: {utilities.formatDate(new Date(ticket.dueDate))}</span>
    </section>
  );
}
