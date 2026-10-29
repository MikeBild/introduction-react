import { CheckoutForm } from './CheckoutForm';
import { orders } from '../src/shop';
import './tailwind.css';

export const App = () => (
  <div className="min-h-screen bg-slate-50 font-sans">
    <CheckoutForm
      items={orders[1]?.items ?? []}
      onPay={(data) => alert(`Danke, ${String(data.get('name'))}!`)}
      onBack={() => alert('Zurück zum Warenkorb')}
      onCancel={() => alert('Bestellung storniert')}
    />
  </div>
);
