import { Ticket } from '../../pages/common/appTypes';
import SingleTicketContainer from './single-ticket-container';
import styles from './tickets-container.module.scss';

export default function TicketsContainer({ tickets, onUpdateTicket }: 
  { tickets: Ticket[]; onUpdateTicket: (ticket: Ticket) => void }) {

  return ( tickets &&
    <section className={styles.ticketsContainer}>
      {tickets.map ((ticket, index) => <SingleTicketContainer ticket={ticket} onUpdateTicket={onUpdateTicket} key={index}/>)}
    </section>
  );
}
