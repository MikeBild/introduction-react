import { useRef, useState } from 'react';
import { EmailField } from '../src/EmailField';

export const ProfilePanel = ({ onSave }: { onSave: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closePanel = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)}>
        Edit profile
      </button>
      {isOpen && (
        <section aria-labelledby="profile-heading">
          <h2 id="profile-heading">Profile</h2>
          <button type="button" aria-label="Close profile" onClick={closePanel}>
            <span aria-hidden="true">✕</span>
          </button>
          <EmailField />
          <button type="button" onClick={onSave}>
            Save
          </button>
        </section>
      )}
    </>
  );
};
