import { registerUser } from './registerUser';
import { SignupForm } from './SignupForm';

export const App = () => (
  <main>
    <h1>Sign up</h1>
    <SignupForm registerUser={registerUser} />
  </main>
);
