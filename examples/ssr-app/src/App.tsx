import { AddToCartButton } from './AddToCartButton';
import type { ProductPageData } from './productPage';
import { formatCents } from './shop';

export const App = ({ data }: { data: ProductPageData }) => (
  <main>
    <h1>{data.product.name}</h1>
    <p>{data.description}</p>
    <p>
      {formatCents(data.product.priceCents)} · {data.product.stock} auf Lager
    </p>
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
