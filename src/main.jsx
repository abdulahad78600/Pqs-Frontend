import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import SiteLock from './components/SiteLock.jsx'
import DisclaimerGate from './components/DisclaimerGate.jsx'
import { ThemeProvider, useTheme } from './theme/ThemeContext.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

function ThemedToasts() {
  const { theme } = useTheme()
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme={theme}
    />
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SiteLock>
        <BrowserRouter>
          <DisclaimerGate>
            <App />
          </DisclaimerGate>
          <ThemedToasts />
        </BrowserRouter>
      </SiteLock>
    </ThemeProvider>
  </React.StrictMode>
)
