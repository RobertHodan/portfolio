import React, { useCallback } from 'react';
import './App.scss';
import 'normalize.css';
import { Header } from './pages/header/header';
import { Footer } from './pages/footer/footer';
import { BrowserRouter, Switch} from 'react-router-dom';
import { getRouteComponents } from './components/hamburger-menu/routes';
import { RouteHandling } from './components/route-handling/route-handling';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <RouteHandling>
          <Header></Header>
          <div className="App wrapper">
              <Switch>
                { getRouteComponents() }
              </Switch>
            <Footer></Footer>
          </div>
        </RouteHandling>
      </BrowserRouter>
    </>
  );
}

export default App;
