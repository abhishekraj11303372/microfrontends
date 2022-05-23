import React, { lazy, Suspense, useState,useEffect } from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Progress from './components/Progress'
import Header from './components/Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const MarketingAppLazy = lazy(() => import('./components/MarketingApp') )
const AuthAppLazy = lazy(() => import('./components/AuthApp') )
const DashboardAppLazy = lazy(() => import('./components/DashboardApp') )

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
        <Switch>
          <Suspense fallback={<Progress />} >
            <Route path="/auth">
              <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard" component={DashboardAppLazy} />
            <Route path="/" component={MarketingAppLazy} />
          </Suspense>
        </Switch>
      </div>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App