import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  priceInCents: z.number().int().nonnegative(),
});

export type Product = z.infer<typeof ProductSchema>;

export const NewProductSchema = ProductSchema.omit({ id: true });
export type NewProduct = z.infer<typeof NewProductSchema>;

export class HttpError extends Error {
  constructor(readonly status: number) {
    super(`HTTP ${status}`);
  }
}

const readJson = async (response: Response): Promise<unknown> => {
  if (!response.ok) throw new HttpError(response.status);
  return response.json();
};

// Ein Query Key pro Ressource – useQuery und invalidateQueries nutzen ihn.
export const productsQueryKey = ['products'] as const;

export const fetchProducts = async (): Promise<Product[]> =>
  z.array(ProductSchema).parse(await readJson(await fetch('/api/products')));

export const createProduct = async (newProduct: NewProduct): Promise<Product> =>
  ProductSchema.parse(
    await readJson(
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(NewProductSchema.parse(newProduct)),
      })
    )
  );
