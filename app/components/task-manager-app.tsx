"use client";

import { useState, useEffect } from 'react'; 
import { DateRange, parseDateRange } from '../utils/utilities'
import { ticketClient } from '../../pages/ticket/ticketClient'
import { Ticket } from '../../pages/common/appTypes'
import DateFilter from './date-filter'
import AddNewTicket from './add-new-ticket'
import TicketsContainer from './tickets-container'

export default function TaskManagerApp({ loadedTickets, defaultDateFilter } : 
  { loadedTickets: Ticket[]; defaultDateFilter: string }) {

  const [tickets, setTickets] = useState(loadedTickets)
  //const [dateFilter, setDateFilter] = useState(defaultDateFilter)
  const [dateFilter, setDateFilter] = useState<DateRange>(JSON.parse(defaultDateFilter, parseDateRange));

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

  async function onAddNewTicket(newTicket: Ticket) {
    try {
      setTickets(prev => [newTicket, ...prev])
      const savedTicket = await ticketClient.save(newTicket)
    }
    catch(err) {
      console.log("onAddNewTicket Error: ",err)
    }
  }

  return (
    <section className="taskManager">
      <div className="control">
        <DateFilter initialFilter={dateFilter} onUpdateDates={onUpdateDates}/>
        <AddNewTicket onAddNewTicket={onAddNewTicket}/>
      </div>
      {tickets==null ? '' : tickets.length == 0 ?  
        <img src='/img/all-done.jpg' className="allDone"/> :
        <TicketsContainer tickets={tickets}/>
      }
    </section>
  )
}

