"use client";

import { useState, useEffect } from 'react'; 
import { DateRange, utilities } from './utils/utilities';
import { ticketClient } from '../pages/ticket/ticketClient'
import DateFilter from './components/date-filter'
import AddNewTicket from './components/add-new-ticket';
import TicketsContainer from './components/tickets-container';
import './styles/globals.scss';

export default function TaskManager() {

  const [tickets, setTickets] = useState<Array<any> | null>(null)
  const [dateFilter, setDateFilter] = useState(utilities.getCurrentWorkWeek())

  useEffect( () => {
    loadAppData()
  }, [dateFilter])

  /*useEffect( () => {
    //console.log("Got Tickets: ",tickets)
  }, [tickets, tickets.length])*/

  const loadAppData = async () => {
    try {
      const tickets = await ticketClient.getTickets(dateFilter)
      setTickets(tickets)
    }
    catch(err) {
      console.log("loadAppData Error: ",err)
    }
  }

  function onUpdateDates(dateRange: DateRange) {
    setDateFilter(dateRange)
  }

  return (
    <section className="taskManager">
      <div className="control">
        <DateFilter initialFilter={dateFilter} onUpdateDates={onUpdateDates}/>
        <AddNewTicket/>
      </div>
      {tickets==null  ? '' : tickets.length == 0 ?  
        <img src='/img/all-done.jpg' className="allDone"/> :
        <TicketsContainer tickets={tickets}/>
      }
    </section>
  );
}
