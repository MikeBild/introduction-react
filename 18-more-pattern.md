# More React Pattern

## Stateless Funtions

```javascript
const HelloWorld = () => <div>Hello World!</div>;

const HelloWorld = (props, context) => (
  <div style={{ color: context.color }}>Hello {props.name}!</div>
);
```

## Render props

```javascript
const Layout = ({ subnav }) => (
  <Fragment>
    {subnav}
    <content>...</content>
  </Fragment>
);

<Layout subnav={<ul><li><a href="...">First</a></li></ul>}>
```

## Higher Order Components

```javascript
export default WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <F>
          {this.props && this.props.loading && <Loading>Loading...</Loading>}
          <WrappedComponent {...this.props} />
        </F>
      );
    }
  };
};
```

```javascript
withLoading(<Page />);
```

## Error Boundaries

```javascript
export default class Catch extends React.Component {
  state = {
    err: null
  };

  componentDidCatch(err) {
    this.setState({ err });
  }

  componentWillReceiveProps(next) {
    if (!this.state.err) return;
    this.setState({ err: null });
  }

  render() {
    const { err } = this.state;

    if (!err) return this.props.children;

    return <pre children={err.toString()} />;
  }
}
```
