import React from 'react';

import Canvas from './components/Canvas';
import AppContextProvider from './AppContextProvider';

import './App.css';

const App = () => {
  return (
    <main className="main">
      <AppContextProvider>
        <Canvas />
      </AppContextProvider>
    </main>
  );
};

export default App;
