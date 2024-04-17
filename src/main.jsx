import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'tailwindcss/tailwind.css';
import Anchor from './components/Anchor.jsx';
import "./utils/axios.config.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <App/>
)

