"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { DateRange, utilities } from '../utils/utilities';
import styles from './controls.module.scss';

interface props {
  initialFilter: DateRange;
  onUpdateDates: (dateRange: DateRange) => void;
}

export default function DateFilter({ initialFilter, onUpdateDates }: props): React.ReactElement {

  const [dateFrom, setDateFrom] = useState(initialFilter.startDate)
  const [dateTo, setDateTo] = useState(initialFilter.endDate)

  useEffect (() => {
    setDateFrom(initialFilter.startDate)
    setDateTo(initialFilter.endDate)
  }, [])

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {id, value} = event.target
    const dateVal = new Date(value)
    switch (id) {
      case "dateFrom" : {
        setDateFrom(dateVal)
        setDateTo(prev => dateVal > dateTo ? dateVal : prev);
        break
        }
      case "dateTo" : {
        setDateTo(dateVal)
        setDateFrom(prev => dateVal < dateFrom ? dateVal : prev); 
        break;
        }
      default: break;
    }
    onUpdateDates({startDate: dateFrom, endDate: dateTo})
  };

  return ( 
    <section className={styles.dateFilter}>
      <span className={styles.text}>Dates: </span>
      <input type="date" id="dateFrom" value={utilities.formatDate(dateFrom)} onChange={onDateChange} className={styles.controlFrame}/>
      <span className='text'> - </span>
      <input type="date" id="dateTo" value={utilities.formatDate(dateTo)} onChange={onDateChange} className={styles.controlFrame}/>
    </section>
  );
}

