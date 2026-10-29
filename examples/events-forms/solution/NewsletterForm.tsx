import { useState, type SubmitEvent } from 'react';
import type { Subscribe } from '../src/subscription';

export const NewsletterForm = ({ onSubscribe }: { onSubscribe: Subscribe }) => {
  // Controlled: React hält den Wert, das Input zeigt ihn nur an.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const isIncomplete = name.trim() === '' || email.trim() === '';

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubscribe({ name: name.trim(), email: email.trim() });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="email">E-Mail</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit" disabled={isIncomplete}>
        Anmelden
      </button>
    </form>
  );
};
