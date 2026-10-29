import type { SubmitEvent } from 'react';
import { Button } from './Button';

type CheckoutFormProps = {
  onPay: (data: FormData) => void;
  onBack: () => void;
  onCancel: () => void;
};

const inputClasses = 'rounded border border-slate-300 p-2';

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
    <form
      className="mx-auto my-8 max-w-md rounded-lg bg-white p-6 shadow"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-4 text-2xl font-bold">Kasse</h1>
      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className={inputClasses}
        />
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="iban">IBAN</label>
        <input id="iban" name="iban" required className={inputClasses} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="danger" onClick={onCancel}>
          Bestellung stornieren
        </Button>
        <Button variant="secondary" onClick={onBack}>
          Zurück zum Warenkorb
        </Button>
        <Button type="submit">Jetzt bezahlen</Button>
      </div>
    </form>
  );
};
