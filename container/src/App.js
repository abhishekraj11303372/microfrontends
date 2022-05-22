import React from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AuthApp from './components/AuthApp'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

function App() {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header />
        <Switch>
          <Route path="/auth" component={AuthApp} />
          <Route path="/" component={MarketingApp} />
        </Switch>
      </div>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App