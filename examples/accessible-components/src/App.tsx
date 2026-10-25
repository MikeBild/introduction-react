import { ProfilePanel } from './ProfilePanel';

export const App = () => (
  <main>
    <h1>Settings</h1>
    <ProfilePanel onSave={() => alert('Saved')} />
  </main>
);
