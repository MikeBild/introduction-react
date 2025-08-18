# 📘 React + TypeScript Cheat-Sheet

| Area         | Type / Example | Description |
|-----------------|----------------|-----------|
| **Props** | ```ts
type ButtonProps = { label: string; disabled?: boolean; onClick: () => void; };
``` | `?` = optional Field |
| **Component** | ```ts
const Button: React.FC<ButtonProps> = ({ label, onClick }) => <button onClick={onClick}>{label}</button>;
``` | `React.FC<Props>` or `(props: Props)` |
| **Children** | ```ts
type CardProps = { children: React.ReactNode };
``` | `React.ReactNode` for JSX-Content |
| **State** | ```ts
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
``` | `useState<T>()` für Typangabe |
| **Events** | ```ts
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();
``` | Eventtypen: `ChangeEvent`, `MouseEvent`, `FormEvent` |
| **Refs** | ```ts
const inputRef = useRef<HTMLInputElement | null>(null);
inputRef.current?.focus();
``` | Access to DOM-Elemente |
| **Lists / Arrays** | ```ts
type User = { id: number; name: string };
const [users, setUsers] = useState<User[]>([]);
``` | `T[]` für Arrays |
| **Utility Types** | ```ts
type Preview = Pick<User, "id" | "name">;
type Editable = Partial<User>;
type WithoutEmail = Omit<User, "email">;
``` | helpful for flexible Props/State |

---

### 🔑 Short
- **Props**: declare`type` or `interface`  
- **Children**: always `React.ReactNode`
- **Events**: React-Events instead of Standard-Events  
- **State**: Use generic `useState<T>()`
- **Utility Types** helper to save time  
