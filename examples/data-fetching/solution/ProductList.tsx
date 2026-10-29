import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { SubmitEvent } from 'react';
import { z } from 'zod';
import {
  createProduct,
  fetchProducts,
  NewProductSchema,
  productsQueryKey,
} from './productApi';

const toMessage = (error: Error) =>
  error instanceof z.ZodError
    ? 'Die Produktdaten sind ungültig.'
    : 'Die Produkte konnten nicht geladen werden.';

export const ProductList = () => {
  const queryClient = useQueryClient();
  const productsQuery = useQuery({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
  });
  const addProduct = useMutation({
    mutationFn: createProduct,
    // Der Cache ist nach dem POST veraltet – TanStack Query lädt neu.
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: productsQueryKey }),
  });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parseResult = NewProductSchema.safeParse({
      name: formData.get('name'),
      priceInCents: Number(formData.get('priceInCents')),
    });
    if (!parseResult.success) return;
    addProduct.mutate(parseResult.data, { onSuccess: () => form.reset() });
  };

  if (productsQuery.isPending) return <p>Lädt …</p>;
  if (productsQuery.isError)
    return <p role="alert">{toMessage(productsQuery.error)}</p>;

  return (
    <>
      <ul>
        {productsQuery.data.map((product) => (
          <li key={product.id}>
            {product.name} – {(product.priceInCents / 100).toFixed(2)} €
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
        <label htmlFor="priceInCents">Preis in Cent</label>
        <input id="priceInCents" name="priceInCents" type="number" required />
        <button type="submit" disabled={addProduct.isPending}>
          Hinzufügen
        </button>
        {addProduct.isError && (
          <p role="alert">Das Produkt konnte nicht gespeichert werden.</p>
        )}
      </form>
    </>
  );
};
