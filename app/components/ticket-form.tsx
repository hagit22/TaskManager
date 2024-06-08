"use client";

import React, { useState } from 'react'
import { genData } from '../utils/dataGenUtil';
import { Ticket, TicketCategory, TicketStatus, getDefaultTicket } from '@/pages/common/appTypes';
import { utilities } from '../utils/utilities';
import styles from './form-modal.module.scss';

export default function TicketForm({ onClose }: { onClose: () => void } ) {
  
    const [ticket, setTicket] = useState(getDefaultTicket())

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTicket(prev => ({...prev, ticketCategory: TicketCategory.Ticket}));

        console.log("New Ticket: ", ticket)
        alert("Ticket '" + ticket.title + "' Saved!!")

        onClose();
    };

    const onChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement> ) => {
        const { id, value }  = target
        switch (id) {
            case "title": setTicket(prev => ({...prev, title: value})); break;
            case "dueDate": setTicket(prev => ({...prev, dueDate: new Date(value)})); break;
            default: break;
        }   
    }

    const onChangeTextarea = ({ target }: React.ChangeEvent<HTMLTextAreaElement> ) => {
        const { value }  = target
        setTicket(prev => ({...prev, description: value}));
    }

    const onChangeSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value }  = target
        switch (id) {
            case "owner": setTicket(prev => ({...prev, owner: value})); break;
            case "priority": setTicket(prev => ({...prev, priority: +value})); break;
            case "status": setTicket(prev => ({...prev, status: value as TicketStatus})); break;
            default: break;
        }
    }


    return (
        <form className={styles.ticketForm} onSubmit={onSubmit}>
            <label>
                Input:
                <input type="text" id={"title"} value={ticket.title} onChange={onChangeInput} required/>
            </label>
            <label>
                Textarea:
                ks<textarea id="description" value={ticket.description} onChange={onChangeTextarea} />
            </label>
            <div className={styles.inputRow}>
                <label>
                    Owner:
                    <select id="owner" value={ticket.owner} onChange={onChangeSelect} required>
                        <option value="" disabled>Select owner</option>
                        {genData.ownerNames.map((owner: string, index: number) => (
                            <option value={owner} key={index}>{owner}</option>))}
                    </select>
                </label>
                <label>
                    Priority:
                    <select id="priority" value={ticket.priority} onChange={onChangeSelect}>
                        <option value="" disabled>Select priority</option>
                        {Array.from({ length: 10 }, (_, index) => (
                            <option value={index + 1} key={index + 1}>{String(index + 1).padStart(2, '\u00A0')}</option>))}
                    </select>
                </label>
            </div>
            <div className={styles.inputRow}>
                <label>
                    Due Date:
                    <input type="date" id="dueDate" value={utilities.formatDate(ticket.dueDate)} onChange={onChangeInput} />
                </label>
                <label>
                    Status:
                    <select id="status" value={ticket.status} onChange={onChangeSelect}>
                        <option value="" disabled>Select status</option>
                        {Object.values(TicketStatus).map((status: TicketStatus | string, index: number) => (
                            <option value={status} key={index}>{status}</option>))}
                    </select>
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

