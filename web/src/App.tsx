import React from 'react';
import RoutesContainer from '@routes/RoutesContainer';
import AuthContextProvider from '@contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthContextProvider>
      <RoutesContainer />
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default App;
