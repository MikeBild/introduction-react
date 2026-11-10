import { useFormStatus } from 'react-dom';

// useFormStatus only works in a child component of the form.
export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Speichere …' : label}</button>;
};
