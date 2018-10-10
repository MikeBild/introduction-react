# GraphQL with Apollo

- [React Apollo](https://github.com/apollographql/react-apollo)

## Setup

```bash
npm install apollo-client apollo-cache-inmemory apollo-link-http react-apollo graphql-tag graphql --save
```

### Apollo Client

```javascript
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: YOUR_GRAPHQL_API_URL }),
  cache: new InMemoryCache(),
});
```

### React Enhancements

```javascript
import { ApolloProvider } from 'react-apollo';

ReactDOM.render(
  <ApolloProvider client={client}>
    <MyRootComponent />
  </ApolloProvider>,
  document.getElementById('root'),
);
```

### GraphQL Query Component

```javascript
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FETCH_SOMETHING = gql`
  {
    something {
      id
      some
    }
  }
`;

const MyRootComponent = () => (
  <Query query={FETCH_SOMETHING}>
    {({ loading = false, error, data: { something = [] } = {} }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          {something.map(x => (
            <div key={x.id} value={x.some}>
              {x.some}
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);
```

### GraphQL Mutation Component

> coming soon

### GraphQL Subscription Component

> coming soon

## Examples

- []()
