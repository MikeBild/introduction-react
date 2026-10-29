# Extended React

## Context

- Extend all children via context props
- See it as the global object (singleton) of your component tree
- DON'T updating the context

## Provider

- Uses the context
- Pattern to pass object(s) to components from top to bottom
- All its descendant can have access to it

## Higher-Order-Components

- Extend component(s) by wrapping into "higher" component
- Enhance component isolation, interoperability and composablity
- Reduces maintainability by reusing components
- Use [Recompose](17-recompose.md) module to build powerful functional composition
