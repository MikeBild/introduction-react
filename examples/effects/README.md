*English · [Deutsch](README.de.md)*

# Effects

An order panel in the workshop shop with four `useEffect`. Only one of them really synchronizes with an external system – and even that one lacks a cleanup.

Lesson: **Do you really need this effect?** (`react-effects`)

```bash
npm install
npm run dev
npm test
```

## Exercise

Check every effect in `src/OrderPanel.tsx` with the question: does it synchronize with something outside of React?

1. **Effect 1** derives the total `totalCents` from the loaded orders. Compute the value during render and delete state and effect.
2. **Effect 4** reacts to a click. Call `onReorder` directly in the event handler. Remove `.skip` on the test “bestellt bei jedem Klick erneut” (reorders on every click) – it shows why the effect is wrong.
3. **Effect 3** starts an interval and never cleans it up. Return a cleanup function that calls `clearInterval`.
4. **Effect 2** loads orders. In the app, click “Nächster Kunde” (next customer) quickly: a slow old answer overwrites the new one. Give the request an `AbortController` and set the state only while the signal has not been aborted.
5. Remove all `.skip` in `src/OrderPanel.test.tsx`.

Tip: `<StrictMode>` in `src/main.tsx` mounts every component twice in development. Missing cleanups show up earlier that way.

## Reference solution

`solution/OrderPanel.tsx` with tests in `solution/OrderPanel.test.tsx`. One effect remains – the request with abort.
