*English · [Deutsch](5-event-bindings.de.md)*

# Events and forms

React passes events through as props: `onClick`, `onChange`, `onSubmit`. Data flows down, events flow up.

```tsx
const [email, setEmail] = useState('');

<input value={email} onChange={(event) => setEmail(event.target.value)} />;
```

## Controlled or uncontrolled?

- **Controlled:** React state holds the value, the input only displays it. Use this when you validate, derive, or disable a button while the user types.
- **Uncontrolled:** The DOM holds the value, you read it on submit via `FormData`. Use this for simple forms and for Form Actions from React 19.

## Rules

- In `onSubmit`, call `event.preventDefault()` first if you send the data yourself.
- Type handlers with the React types, for example `SubmitEvent<HTMLFormElement>` or `ChangeEvent<HTMLInputElement>`.
- Derive values such as “button enabled?” during render instead of keeping them in separate state.

## Exercise

Lesson **Who owns the value in the input?** (`react-events-forms`): [examples/events-forms](examples/events-forms/README.md)

The earlier version of this chapter is in [archive/chapters/5-event-bindings.md](archive/chapters/5-event-bindings.md).
