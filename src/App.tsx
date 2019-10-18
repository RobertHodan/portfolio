import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Header } from './pages/header/header';
import { Footer } from './pages/footer/footer';
import { MainMenu } from './pages/main-menu/main-menu';

const App: React.FC = () => {
  return (
    <>
      <Header></Header>
      <div className="App wrapper">
        <MainMenu></MainMenu>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
