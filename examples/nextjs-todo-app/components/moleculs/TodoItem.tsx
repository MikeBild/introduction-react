export interface TodoItemProps {
    item: {
      id: string;
      desc: string;
      state: "open" | "closed"
    };
  }

export function TodoItem(item: TodoItemProps) {
    return <></>
}