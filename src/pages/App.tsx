import React, { ReactElement } from 'react';

import './App.scss';
import Lobby from './Lobby/Lobby';
// import Main from './Main/Main';

function App(): ReactElement {
  return (
    <div className='App'>
      <Lobby />
    </div>
  );
}

export default App;
