# react-asynccomponent

> ⚠️ Still a work in progress. Do not use yet! ⚠️

Asynchronously load large components, but use them in JSX as if they were synchronously available. This component basically wraps dynamic import `import()` with some additional convenience options.

## Usage

```jsx
import React from 'react';
import asyncComponent from 'react-asynccomponent';

const HeavyComponent = asyncComponent(() => import('./HeavyComponent'));

const App = () => (
  <>
    <HeavyComponent />
  </>
);
```

## Options

Available options are:

```js
type AsyncComponentOptions = {
  /** Function will be called if there's an error while running the dynamic import */
  onError?: (e: unknown) => void,

  /** Function called upon successfully loading.  */
  onLoaded?: (c: ComponentType) => void,

  /** Component to render if there was an error. */
  ErrorComponent?: ComponentType,

  /** Component to render while loading. */
  Loading?: ComponentType,
};
```

## Current Project Status

This project is still under active development. Roadmap:

- Better TypeScript typings
- Better tests
- Storybook/documentation site

Stay tuned! And if you're interested in helping out, by all means, feel free to create an issue/PR/discussion. Cheers!
