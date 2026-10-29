import { useState } from "react";

export interface TasklistPorps<T extends { id: string }> {
  items: T[];
  renderItem: (x: T) => React.ReactNode;
  onAddClick: (x: { id: string; text: string }) => void;
  onReloadClick: () => void;
}

export function Tasklist<T extends { id: string }>({
  items,
  renderItem,
  onAddClick,
  onReloadClick,
}: TasklistPorps<T>) {
  const [text, setText] = useState("");
  return (
    <>
      <input type="text" onChange={(evt) => setText(evt.target.value)} />
      <button
        onClick={() => onAddClick({ id: (items.length + 1).toString(), text })}
      >
        Add
      </button>
      <button onClick={onReloadClick}>Reload</button>
      <ul>
        {items.map((x, idx) => (
          <li key={x.id || idx}>{renderItem(x)}</li>
        ))}
      </ul>
    </>
  );
}
