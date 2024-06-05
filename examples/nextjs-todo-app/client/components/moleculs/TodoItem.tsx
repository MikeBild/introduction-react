export interface TodoItemProps {
  item: {
    id: string;
    desc: string;
    state: "open" | "closed";
  };
}

export function TodoItem({ item: { desc, state } }: TodoItemProps) {  
  return (
    <div>
      <input
        data-testid="TodoItem-input-checkbox"
        type="checkbox"
        defaultChecked={state === "open"}        
      />
      <input
        data-testid="TodoItem-input-text"
        type="text"
        defaultValue={desc}
      />
      <button data-testid="TodoItem-button-remove">Remove</button>
    </div>
  );
}
