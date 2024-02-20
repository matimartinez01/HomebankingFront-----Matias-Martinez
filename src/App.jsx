import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'tailwindcss/tailwind.css';
import Anchor from './components/Anchor';
import Header from './components/Header';
import Accounts from './pages/Accounts';
import Footer from './components/Footer';
import Cards from './pages/Cards';
import AccountClient from './pages/AccountClient';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Loans from './pages/Loans';
import Transactions from './pages/Transactions';
import Home from './pages/Home';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Accounts/>}></Route>
        <Route path="/cards" element={<Cards/>}></Route>
        <Route path="/accounts/:id" element={<AccountClient/>}></Route>
        <Route path="/loan" element={<Loans/>}></Route>
        <Route path="/transaction" element={<Transactions/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
