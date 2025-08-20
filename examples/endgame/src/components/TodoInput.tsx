import { useRef, useState } from "react";

interface TodoInputProps {
  onSave: (todo: { text: string; important: boolean }) => void;
  onCancel: () => void;
}

export default function TodoInput({ onSave, onCancel }: TodoInputProps) {
  const [important, setImportant] = useState(false);
  const todoInputRef = useRef<HTMLInputElement>(null);

  function handleSave(e: React.FormEvent) {
    const text = todoInputRef.current?.value || "";
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter a todo.");
      return;
    }
    onSave({ text, important });

    setImportant(false);
  }

  function handleCancel() {
    setImportant(false);
    onCancel();
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        background: "linear-gradient(135deg, #e6f9ec 0%, #c1eac5 100%)",
        padding: "24px 32px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(60, 120, 60, 0.08)",
        minWidth: "320px",
        alignItems: "center",
      }}
      onSubmit={handleSave}
    >
      <input
        type="text"
        placeholder="Enter your todo..."        
        ref={todoInputRef}
        style={{
          padding: "10px",
          border: "1.5px solid #81c784",
          borderRadius: "8px",
          outline: "none",
          width: "100%",
        }}
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#2e7d32",
        }}
      >
        <input
          type="checkbox"
          checked={important}
          onChange={(e) => setImportant(e.target.checked)}
        />
        Mark as important
      </label>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            boxShadow: "0 2px 8px rgba(67, 160, 71, 0.12)",
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            background: "#fff",
            color: "#388e3c",
            border: "1px solid #43a047",
            borderRadius: "8px",
            padding: "10px 24px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
