import { useState } from "react";

export interface TodoAddProps {
  onTodoAdd: (desc: string) => void;
}

export function TodoAdd(props: TodoAddProps) {
  const [inputText, setInputText] = useState("");

  return (
    <>
      <input data-testid="TodoAdd-input" type="text" onChange={(evt) => setInputText(evt.target.value)} />
      <button data-testid="TodoAdd-button" onClick={() => props.onTodoAdd(inputText)}>Add</button>
    </>
  );
}
