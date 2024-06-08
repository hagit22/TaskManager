// Ticket Common Types

export interface Ticket {
    id: string;
    title: string;
    description: string;
    owner: string;
    dueDate: Date;
    status: TicketStatus;
    priority: number;
    ticketCategory: TicketCategory;
}

export enum TicketCategory {
    None = "",
    Ticket = "Ticket",
    Bug = "Bug"
}

export enum TicketStatus {
    New,
    Approved,
    Committed,
    Done
}


// Task Common Types

export interface Task {
    id: string;
    title: string;
    description: string;
    owner: string;
    status: TaskStatus;
    priority: number;
    ticketId: string;
}

export enum TaskStatus {
    New,
    InProgress,
    Done
}

