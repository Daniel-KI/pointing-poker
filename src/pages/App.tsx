import React, { ReactElement } from 'react';
import TextInput from '../components/TextInput/TextInput';

import './App.scss';

function App(): ReactElement {
  return (
    <div className='App'>
      <h1>Pointing poker</h1>
      <TextInput disabled />
      <TextInput disabled />
      <TextInput bordered />
      <TextInput color='primary' size='small' name='qwe' />
      <TextInput bordered color='light' />
      <TextInput bordered color='warning' />
      <TextInput bordered color='danger' />
      <TextInput bordered color='success' />
      <TextInput bordered color='dark' />
      <TextInput bordered color='light' />
    </div>
  );
}

export default App;
