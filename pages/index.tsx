import { DateRange, utilities } from '../app/utils/utilities';
import { ticketClient } from './ticket/ticketClient'
import { Ticket } from './common/appTypes';
import TaskManagerApp from '../app/components/task-manager-app';

export async function getServerSideProps() {
  const defaultDateFilter = JSON.stringify(utilities.getCurrentWorkWeek())
  const loadedTickets = await ticketClient.getTickets({startDate: new Date(), endDate: new Date()}/*defaultDateFilter*/);
  return { props: {loadedTickets, defaultDateFilter } }
}

export default function Page({ loadedTickets, defaultDateFilter } : { loadedTickets: Ticket[]; defaultDateFilter: string }) {

  return <TaskManagerApp loadedTickets={loadedTickets} defaultDateFilter={defaultDateFilter} />

}
