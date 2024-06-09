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
    New = "New",
    Approved = "Approved",
    Committed = "Committed",
    Done = "Done"
}

export function getDefaultTicket() {
    return {
        id: "",
        title: "",
        description: "",
        owner: "",
        dueDate: new Date(),
        status: TicketStatus.New,
        priority: 7,
        ticketCategory: TicketCategory.None
    }
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
    New = "New",
    InProgress = "In Progress",
    Done = "Done"
}

