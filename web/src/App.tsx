import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Root from '@pages/Root';
import Main from '@pages/Main';

function App() {
  return (
    <Routes>
      <Route path='/:type' element={<Main />}/>
      <Route path='/' element={<Root />}/>
    </Routes>
  );
}

export default App;