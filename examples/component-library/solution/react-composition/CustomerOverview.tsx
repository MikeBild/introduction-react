import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import { countOrders, type Customer } from '../../src/data/customers';
import { Card } from './Card';

type CustomerOverviewProps = {
  customers: readonly Customer[];
  onEdit: (customer: Customer) => void;
};

export const CustomerOverview = ({
  customers,
  onEdit,
}: CustomerOverviewProps) => (
  <section aria-labelledby="customer-overview-heading">
    <h2 id="customer-overview-heading">Kundenübersicht</h2>
    {customers.map((customer) => (
      <Card
        key={customer.id}
        header={
          <h3>
            {customer.name}{' '}
            <Badge>{countOrders(customer.id)} Bestellungen</Badge>
          </h3>
        }
        actions={
          <>
            <Button onClick={() => onEdit(customer)}>Bearbeiten</Button>
            <a href={`mailto:${customer.email}`}>E-Mail schreiben</a>
          </>
        }
      >
        <p>{customer.email}</p>
      </Card>
    ))}
  </section>
);
