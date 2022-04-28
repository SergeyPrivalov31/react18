import React from 'react';
import {Batching} from './examples/Batching';
import { Concurrent } from './examples/Concurrent';

const App = () => {
  return (
    <div>
      <Batching />
      <br />
      <Concurrent />
    </div>
  );
}

export default App;
