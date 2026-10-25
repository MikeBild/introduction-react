import { useState } from 'react';
import { EmailField } from './EmailField';

// Exercise: this panel has barriers – find and fix them.
export const ProfilePanel = ({ onSave }: { onSave: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Edit profile
      </button>
      {isOpen && (
        <section aria-labelledby="profile-heading">
          <h2 id="profile-heading">Profile</h2>
          <span className="icon" onClick={() => setIsOpen(false)}>
            ✕
          </span>
          <EmailField />
          <div className="button" onClick={onSave}>
            Save
          </div>
        </section>
      )}
    </>
  );
};
