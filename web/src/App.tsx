import React from 'react';
import RoutesContainer from '@routes/RoutesContainer';
import AuthContextProvider from '@contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <RoutesContainer />
    </AuthContextProvider>
  );
}

export default App;
