import * as React from 'react';
import * as ReactDOM from 'react-dom';
import asyncComponent from '../.';

const options = {
  Loading: () => <div>Loading...</div>,
  onLoaded: (c) => {
    console.log('Successfully loaded:', c);
  },
  ErrorComponent: () => <div>An error occurred</div>,
  onError: (e) => {
    console.error('Error Loading:', e);
  },
};

const FailToLoadMe = asyncComponent(() => import(`./LoadMeToo`), options);

const LoadMeAsync = asyncComponent(() => import('./LoadMeAsync'), options);

const App = () => {
  return (
    <div>
      <FailToLoadMe />
      <LoadMeAsync />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
