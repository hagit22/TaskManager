import { Ticket } from '../../pages/common/appTypes';
import SingleTicketContainer from './single-ticket-container';
import styles from './tickets-container.module.scss';

export default function TicketsContainer({ tickets }: { tickets: Ticket[] }) {

  return ( tickets &&
    <section className={styles.ticketsContainer}>
      {tickets.map ((ticket, index) => <SingleTicketContainer ticket={ticket} key={index}/>)}
    </section>
  );
}
