# Actions Optimistic

A todo list using a React 19 form action with `useActionState` – ready for `useOptimistic`.

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Move the submit button into `SubmitButton.tsx` and read the pending state there with `useFormStatus` from `react-dom`.
2. Show a new todo immediately with `useOptimistic` in `src/TodoList.tsx`, greyed out while it is saving.
3. Add a todo containing "fail": the optimistic entry disappears and the error is shown.
4. Remove `.skip` from the tests in `src/TodoList.test.tsx`.

A possible solution lives in `solution/`.
