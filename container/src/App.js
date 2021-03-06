import React, { lazy, Suspense, useState,useEffect } from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Progress from './components/Progress'
import Header from './components/Header'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const MarketingAppLazy = lazy(() => import('./components/MarketingApp') )
const AuthAppLazy = lazy(() => import('./components/AuthApp') )
const DashboardAppLazy = lazy(() => import('./components/DashboardApp') )

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if(isSignedIn) {
      history.push('dashboard');
    }
  },[isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
        <Switch>
          <Suspense fallback={<Progress />} >
            <Route path="/auth">
              <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardAppLazy />
            </Route>
            <Route path="/" component={MarketingAppLazy} />
          </Suspense>
        </Switch>
      </div>
      </StylesProvider>
    </Router>
  );
};

export default App