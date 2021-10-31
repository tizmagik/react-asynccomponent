import * as React from 'react';
import * as ReactDOM from 'react-dom';
import asyncComponent from '../.';

const LoadMeAsync = asyncComponent(() => import('./LoadMeAsync'));

const App = () => {
  return (
    <div>
      <LoadMeAsync />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
