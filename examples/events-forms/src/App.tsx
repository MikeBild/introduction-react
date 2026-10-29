import { useState } from 'react';
import { NewsletterForm } from './NewsletterForm';
import type { Subscription } from './subscription';

export const App = () => {
  const [subscriptions, setSubscriptions] = useState<readonly Subscription[]>(
    []
  );
  return (
    <main>
      <h1>Newsletter</h1>
      <NewsletterForm
        onSubscribe={(subscription) =>
          setSubscriptions((current) => [...current, subscription])
        }
      />
      <p>{subscriptions.length} Anmeldungen</p>
    </main>
  );
};
