import React from 'react';
import './App.css';
import Sidenav from './features/sidenav/sidenav'
import Main from './features/main/main'

function App() {

  return (
      <div className="App">
        <div className='container'>
          <Sidenav />
          <Main />
        </div>
      </div>
  );
}

export default App;
