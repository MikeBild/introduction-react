# 📘 React + TypeScript Cheat-Sheet

## 🔹 Props
```ts
type ButtonProps = { 
  label: string; 
  disabled?: boolean; 
  onClick: () => void; 
};
```
👉 `?` optional Props

---

## 🔹 Component
```ts
const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);
```
👉 Use `React.FC<Props>` or `(props: Props)`


---

## 🔹 Children
```ts
type CardProps = { 
  children: React.ReactNode 
};
```
👉 `React.ReactNode` always for `children`.

---

## 🔹 State
```ts
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```
👉 `useState<T>()` use Generic-Types.

---

## 🔹 Events
```ts
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};
```
👉 Event-Types: `ChangeEvent`, `MouseEvent`, `FormEvent`.

---

## 🔹 Refs
```ts
const inputRef = useRef<HTMLInputElement | null>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);
```
👉 Access to DOM-Elements

---

## 🔹 Lists & Arrays
```ts
type User = { id: number; name: string };

const [users, setUsers] = useState<User[]>([]);
```
👉 `T[]` for Arrays

---

## 🔹 Utility Types
```ts
type Preview = Pick<User, "id" | "name">;
type Editable = Partial<User>;
type WithoutEmail = Omit<User, "email">;
```
👉 For flexible Props & State

---

## 🔑 Faustregeln
- **Props**: declare `type` or `interface`  
- **Children**: Always `React.ReactNode`
- **Events**: Use React-Events instead of Standard-Events  
- **State**: Use Generics for `useState<T>()`
- **Utility Types** useful Helpers to save time 
