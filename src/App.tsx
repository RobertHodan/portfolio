import React from 'react';
import './App.scss';
import { Header } from './pages/header/header';
import { Footer } from './pages/footer/footer';
import { MainMenu } from './pages/main-menu/main-menu';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Header></Header>
        <div className="App wrapper">
            <Switch>
            <Route path="/portfolio-project">

              </Route>
              <Route path="/">
                <MainMenu></MainMenu>
              </Route>
            </Switch>
          <Footer></Footer>
        </div>
      </Router>
    </>
  );
}

export default App;
