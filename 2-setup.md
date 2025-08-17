# Setting up a React Application

## Application Structure

- JSX is a template language to write HTML in declarative way
- Babel transforms JSX/ES5/6/7 to compatible JavaScript
- JavaScript polyfills fills the Browser gaps
- Webpack bundles sources to Single-Page-App
- Webpack-Dev-Server for development
- HTML/Javascript/CSS interaction via React-DOM
- Component-Oriented Design
  - Stateless **"dumb"** component
  - Stateful **"smart"** component

### Setup

- [Babel](2.1-setup-babel-webpack.md)
- [Parcel](2.2-setup-parcel.md)
- [NextJS](2.3-setup-nextjs.md)
- [Vite](2.4-setup-vite.md)

## JSX Basics

- Every JSX snippet will transform to JavaScript via Babel/Webpack, ESBuild, NextJS, etc.
- React uses a **Virtual-DOM** to re(renderer)
- React renders the complete virtual DOM on every state change
- React compares changes between virtual and real DOM and applying only the results
- React evaluates and execute inline JavaScript expressions `{...}` to bind state, events, styles, etc.

```javascript
// React.createElement('h1', null, '...')
render () {
  return (
    <h1>...</h1>
  )
}
```
