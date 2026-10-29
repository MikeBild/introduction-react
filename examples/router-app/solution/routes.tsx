import type { RouteObject } from 'react-router';
import { OrderPage, orderLoader } from './OrderPage';
import { OrdersPage, ordersLoader } from './OrdersPage';
import { ProductsPage } from './ProductsPage';
import { RouteError } from './RouteError';
import { ShopLayout } from './ShopLayout';

// Jede Route hat ihre eigene ErrorBoundary – ein Fehler im Detail
// lässt Layout und Navigation stehen.
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: ShopLayout,
    ErrorBoundary: RouteError,
    HydrateFallback: () => <p>Lädt …</p>,
    children: [
      { index: true, Component: ProductsPage },
      {
        path: 'orders',
        loader: ordersLoader,
        Component: OrdersPage,
        ErrorBoundary: RouteError,
      },
      {
        path: 'orders/:orderId',
        loader: orderLoader,
        Component: OrderPage,
        ErrorBoundary: RouteError,
      },
    ],
  },
];
