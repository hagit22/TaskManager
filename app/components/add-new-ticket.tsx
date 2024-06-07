"use client";

import { useState, ChangeEvent } from 'react';
import { TicketCategory } from '../../pages/ticket/ticketService';
import styles from './controls.module.scss';

export default function AddNewTicket() {

  const [ticketType, setTicketType] = useState(TicketCategory.None) 

  const onTicketTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const chosenType = event.target.value  as any
    if (Object.values(TicketCategory).includes(chosenType))
      setTicketType(chosenType)
    else setTicketType(TicketCategory.None)
  };
  return (
    <section className={styles.controlFrame}>
      <select id="options" value={ticketType} onChange={onTicketTypeChange}>
          <option value={TicketCategory.None}>Add a new</option>
          <option value={TicketCategory.Ticket} className={styles.ticket}>{TicketCategory.Ticket}</option>
          <option value={TicketCategory.Bug} className={styles.bug}>{TicketCategory.Bug}</option>
      </select>
    </section>
  );
}
