# Actions Optimistic

Eine Todo-Liste mit einer Form Action aus React 19 und `useActionState` – bereit für `useOptimistic`.

Lektion: **Optimistic UI braucht einen Rückweg** (`react-actions-optimistic`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Verschieb den Submit-Button in `SubmitButton.tsx` und lies dort den Pending State mit `useFormStatus` aus `react-dom`.
2. Zeig ein neues Todo in `src/TodoList.tsx` sofort mit `useOptimistic` an, ausgegraut, solange es gespeichert wird.
3. Leg ein Todo mit „fail“ im Text an: Der optimistische Eintrag verschwindet und die Fehlermeldung erscheint.
4. Entferne `.skip` in `src/TodoList.test.tsx`.

## Lösung

Eine mögliche Lösung liegt in `solution/`.
