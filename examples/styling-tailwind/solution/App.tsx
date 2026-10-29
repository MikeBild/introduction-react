import { CheckoutForm } from './CheckoutForm';
import './tailwind.css';

export const App = () => (
  <div className="min-h-screen bg-slate-50 font-sans">
    <CheckoutForm
      onPay={(data) => alert(`Danke, ${String(data.get('name'))}!`)}
      onBack={() => alert('Zurück zum Warenkorb')}
      onCancel={() => alert('Bestellung storniert')}
    />
  </div>
);
