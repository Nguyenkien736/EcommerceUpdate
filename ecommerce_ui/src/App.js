import logo from './logo.svg';
import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from './pages/registerpage/register';
import Home from './pages/homepage/home';
import LoginPage from './pages/loginpage/login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Itempage from './pages/itempage/itempage';
import Genrrefilterpage from './pages/genrefilterpage/genrefilter';
import Searchpage from './pages/searchpage/searchpage';
import Accountpage from './pages/accountpage/accountpage';
import Cartpage from './pages/cartpage/cartpage';

//import axios from 'axios'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<RegisterPage></RegisterPage>} >
        
      </Route>
      <Route path='/home' element={<Home></Home>}>

      </Route>
      <Route path='/login' element={<LoginPage></LoginPage>}>

      </Route>
      <Route path='/item/:itemid' element={<Itempage></Itempage>}>

      </Route>
      <Route path='/genrefilter' element={<Genrrefilterpage></Genrrefilterpage>}> 

      </Route>
      <Route path = '/search' element={<Searchpage></Searchpage>}>

      </Route>
      <Route path='/account' element={<Accountpage></Accountpage>}></Route>
      <Route path='/cartpage' element={<Cartpage></Cartpage>}></Route>

    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
