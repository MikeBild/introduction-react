import { AddToCartButton } from './AddToCartButton';
import type { ProductPageData } from './productPage';

const priceFormat = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

export const App = ({ data }: { data: ProductPageData }) => (
  <main>
    <h1>{data.product.name}</h1>
    <p>{data.product.description}</p>
    <p>{priceFormat.format(data.product.priceInCents / 100)}</p>
    <AddToCartButton productName={data.product.name} />
    <section>
      <h2>Bewertungen</h2>
      <ul>
        {data.reviews.map((review) => (
          <li key={review.id}>
            {review.author}: {'★'.repeat(review.rating)} – {review.text}
          </li>
        ))}
      </ul>
    </section>
  </main>
);
