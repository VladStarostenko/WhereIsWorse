import React from 'react';
import './App.css';
import Navbar from './components/navBar';
import MainPageContainer from './components/mainPage/mainPageContainer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <MainPageContainer/>
    </div>
  );
}

export default App;
