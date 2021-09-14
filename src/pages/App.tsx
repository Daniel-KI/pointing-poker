import React, { ReactElement } from 'react';
import Button from '../components/Button/Button';

import './App.scss';

function App(): ReactElement {
  return (
    <div className='App'>
      <h1>Pointing poker</h1>
      <Button onClick={() => console.log('qwe')} color='dark' size='small'>
        qwe
        <div>qwe</div>
      </Button>
    </div>
  );
}

export default App;
