import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import DesignerPage from './Designer';
import DeveloperPage from './Developer';
import PortfolioPage from './PortfolioPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/designer" component={DesignerPage} />
      <Route path="/developer" component={DeveloperPage} />
      <Route path="/portfolio" component={PortfolioPage} />
    </Switch>
  );
}

export default App;