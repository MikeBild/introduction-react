import { useRef, useState } from 'react';
import { EmailField } from '../src/EmailField';
import type { Customer } from '../src/shop';

type ProfilePanelProps = { customer: Customer; onSave: () => void };

export const ProfilePanel = ({ customer, onSave }: ProfilePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closePanel = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)}>
        Profil bearbeiten
      </button>
      {isOpen && (
        <section aria-labelledby="profile-heading">
          <h2 id="profile-heading">Profil von {customer.name}</h2>
          <button
            type="button"
            aria-label="Profil schließen"
            onClick={closePanel}
          >
            <span aria-hidden="true">✕</span>
          </button>
          <EmailField defaultValue={customer.email} />
          <button type="button" onClick={onSave}>
            Speichern
          </button>
        </section>
      )}
    </>
  );
};
