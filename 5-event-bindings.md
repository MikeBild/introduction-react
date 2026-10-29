# Events und Forms

React reicht Events als Props durch: `onClick`, `onChange`, `onSubmit`. Daten fließen nach unten, Events nach oben.

```tsx
const [email, setEmail] = useState('');

<input value={email} onChange={(event) => setEmail(event.target.value)} />;
```

## Controlled oder Uncontrolled?

- **Controlled:** React-State hält den Wert, das Input zeigt ihn nur an. Nimm das, wenn du beim Tippen validierst, ableitest oder einen Button deaktivierst.
- **Uncontrolled:** Das DOM hält den Wert, du liest ihn beim Submit über `FormData`. Nimm das für einfache Forms und für Form Actions aus React 19.

## Regeln

- Ruf in `onSubmit` zuerst `event.preventDefault()` auf, wenn du selbst sendest.
- Typisiere Handler über die React-Typen, zum Beispiel `SubmitEvent<HTMLFormElement>` oder `ChangeEvent<HTMLInputElement>`.
- Leite abgeleitete Werte wie „Button aktiv?“ beim Rendern ab, statt sie in eigenen State zu legen.

## Übung

Lektion **Wem gehört der Wert im Input?** (`react-events-forms`): [examples/events-forms](examples/events-forms/README.md)

Die alte Fassung dieses Kapitels liegt unter [legacy/chapters/5-event-bindings.md](legacy/chapters/5-event-bindings.md).
