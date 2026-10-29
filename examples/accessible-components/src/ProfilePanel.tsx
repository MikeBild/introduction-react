import { useState } from 'react';
import { EmailField } from './EmailField';
import type { Customer } from './shop';

type ProfilePanelProps = { customer: Customer; onSave: () => void };

// Übung: Dieses Panel hat Barrieren – finde und behebe sie.
export const ProfilePanel = ({ customer, onSave }: ProfilePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Profil bearbeiten
      </button>
      {isOpen && (
        <section aria-labelledby="profile-heading">
          <h2 id="profile-heading">Profil von {customer.name}</h2>
          <span className="icon" onClick={() => setIsOpen(false)}>
            ✕
          </span>
          <EmailField defaultValue={customer.email} />
          <div className="button" onClick={onSave}>
            Speichern
          </div>
        </section>
      )}
    </>
  );
};
