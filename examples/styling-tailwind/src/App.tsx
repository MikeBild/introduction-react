import { CheckoutForm } from './CheckoutForm';
import { orders } from './shop';
import './styles.css';

export const App = () => (
  <CheckoutForm
    items={orders[1]?.items ?? []}
    onPay={(data) => alert(`Danke, ${String(data.get('name'))}!`)}
    onBack={() => alert('Zurück zum Warenkorb')}
    onCancel={() => alert('Bestellung storniert')}
  />
);
