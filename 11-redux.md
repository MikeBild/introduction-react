# Flux/Redux

![Flux Architecture](flux-architecture.png)

## Code Structure

* Rails-style: separate folders for “actions”, “constants”, “reducers”, “containers”, and “components”
* Domain-style: separate folders per feature or domain, possibly with sub-folders per file type
* “Ducks”: similar to domain style, but explicitly tying together actions and reducers, often by defining them in the same file

## Examples

* [Example Redux App](examples/redux-app/README.md)