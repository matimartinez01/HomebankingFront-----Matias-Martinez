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
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './redux/store';
import withAuth from './hocs/withAuth';


function App() {
  const [count, setCount] = useState(0)

  const AccountsWithAuth = withAuth(Accounts)
  const CardsWithAuth = withAuth(Cards)
  const AccountClientWithAuth = withAuth(AccountClient)
  const LoansWithAuth = withAuth(Loans)
  const TransactionsWithAuth = withAuth(Transactions)

  return (
    <BrowserRouter >
      <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path="/" element={<AccountsWithAuth/>}></Route>
        <Route path="/cards" element={<CardsWithAuth/>}></Route>
        <Route path="/accounts/:id" element={<AccountClientWithAuth/>}></Route>
        <Route path="/loan" element={<LoansWithAuth/>}></Route>
        <Route path="/transaction" element={<TransactionsWithAuth/>}></Route>
      </Routes>
      </Provider>
    </BrowserRouter>
  )
  
}

export default App
