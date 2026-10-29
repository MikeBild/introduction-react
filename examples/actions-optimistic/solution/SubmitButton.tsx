import { useFormStatus } from 'react-dom';

// useFormStatus funktioniert nur in einer Child Component der Form.
export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Speichere …' : label}</button>;
};
