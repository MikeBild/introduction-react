import { CheckoutForm } from './CheckoutForm';
import './styles.css';

export const App = () => (
  <CheckoutForm
    onPay={(data) => alert(`Danke, ${String(data.get('name'))}!`)}
    onBack={() => alert('Zurück zum Warenkorb')}
    onCancel={() => alert('Bestellung storniert')}
  />
);
