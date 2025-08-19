export interface ToDoListItemEntry{
    id: string;
    text?: string;
    isChecked?: boolean;
    priority?: "high" | "medium" | "low";
    createdAt?: Date;
}