import { useFormStatus } from 'react-dom';

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Saving …' : label}</button>;
};
