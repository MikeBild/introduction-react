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
      <input type="checkbox" defaultChecked={state === "open"} />
      <input type="text" defaultValue={desc} />
      <button>Remove</button>
    </div>
  );
}
