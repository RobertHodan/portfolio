import React from 'react';
import './App.scss';
import 'normalize.css';
import { Header } from './pages/header/header';
import { Footer } from './pages/footer/footer';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { getRouteComponents } from './components/hamburger-menu/routes';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Header></Header>
        <div className="App wrapper">
            <Switch>
              { getRouteComponents() }
            </Switch>
          <Footer></Footer>
        </div>
      </Router>
    </>
  );
}

export default App;
