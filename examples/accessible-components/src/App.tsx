import { ProfilePanel } from './ProfilePanel';
import { customers } from './shop';

export const App = () => (
  <main>
    <h1>Werkstatt-Shop · Mein Konto</h1>
    <ProfilePanel customer={customers[0]} onSave={() => alert('Gespeichert')} />
  </main>
);
