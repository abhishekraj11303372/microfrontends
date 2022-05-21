import React from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import { BrowserRouter } from 'react-router-dom'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

function App() {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header />
        <MarketingApp />
      </div>
      </StylesProvider>
    </BrowserRouter>
  )
}

export default App