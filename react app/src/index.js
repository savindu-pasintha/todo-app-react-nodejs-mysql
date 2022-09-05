import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ModelOpen from './model/ModelOpen'
// { ToastContainer, toast } from 'react-toastify'
const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement,
)
