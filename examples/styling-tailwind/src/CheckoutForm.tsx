import type { SubmitEvent } from 'react';

type CheckoutFormProps = {
  onPay: (data: FormData) => void;
  onBack: () => void;
  onCancel: () => void;
};

export const CheckoutForm = ({
  onPay,
  onBack,
  onCancel,
}: CheckoutFormProps) => {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onPay(new FormData(event.currentTarget));
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h1>Kasse</h1>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="iban">IBAN</label>
        <input id="iban" name="iban" required />
      </div>
      <div className="actions">
        <button type="button" className="btn btn-danger" onClick={onCancel}>
          Bestellung stornieren
        </button>
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          Zurück zum Warenkorb
        </button>
        <button type="submit" className="btn btn-primary">
          Jetzt bezahlen
        </button>
      </div>
    </form>
  );
};
