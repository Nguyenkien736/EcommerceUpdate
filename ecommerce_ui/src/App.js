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
import Searchp from './pages/searchpage/searchpage';
import Accountpage from './pages/accountpage/accountpage';
import Cartpage from './pages/cartpage/cartpage';
import Successorder from './pages/successfulorderpage/successorder';
import Orderpage from './pages/accountpage/myorder';
import Rattingpage from './pages/accountpage/myratting';
import { Logout } from './pages/logoutpage/logout';
import { CheckOutPage } from './pages/checkoutpage/checkoutpage';
import Overview from './admin/adminpages/admindashboard/overview';
import AllItem from './admin/adminpages/itemmanage/allitem/allitem';
import AllOrder from './admin/adminpages/ordermanagepage/allorder/allorder';
import AllUser from './admin/adminpages/usermanage/alluser/alluser';
import AdminItem from './admin/adminpages/itemmanage/oneitem/oneitem';
import AdminOrder from './admin/adminpages/ordermanagepage/oneorder/oneorder';
import AdminUser from './admin/adminpages/usermanage/oneuser/oneuser';
import AddNewItem from './admin/adminpages/itemmanage/addnewitem/addnewitem';
import AddNewUser from './admin/adminpages/usermanage/addnewuser/addnewuser';
import CustomBanner from './admin/adminpages/custombanner/custom';
import AllGenre from './admin/adminpages/genremanage/allgenre/allgenre';
//import axios from 'axios'
function App() {
  const {user} = useContext(AuthContext);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/:numpage' element={<Home></Home>} >
        
      </Route>
      <Route path='/' element={<Home></Home>} >
        
      </Route>
      <Route path='/register' element={<RegisterPage></RegisterPage>} >
        
      </Route>
      <Route path='/home/:numpage' element={<Home></Home>}>

      </Route>
      <Route path='/login' element={<LoginPage></LoginPage>}>

      </Route>
      <Route path='/item/:itemid' element={<Itempage></Itempage>}>

      </Route>
      <Route path='/genrefilter' element={<Genrrefilterpage></Genrrefilterpage>}> 

      </Route>
      <Route path = '/searchpage/:searchphrase' element={<Searchp></Searchp>}>

      </Route>
      <Route path = '/searchpage/' element={<Searchp></Searchp>}>

      </Route>

      <Route path = '/logout' element={<Logout></Logout>}>

      </Route>
      <Route path='/account' element={user?<Accountpage></Accountpage>:<Home></Home>}>

      </Route>
      <Route path='/cartpage' element={<Cartpage></Cartpage>}>

      </Route>
      <Route path='/ordersucess' element={<Successorder></Successorder>}>

      </Route>
      <Route path='/myorder' element={<Orderpage></Orderpage>}>

      </Route>
      <Route path='/myratting' element ={<Rattingpage></Rattingpage>}>

      </Route>
      <Route path='/checkout' element = {<CheckOutPage></CheckOutPage>}>

      </Route>
      {user&&user.role=='admin'?
      <Route path='/admin'>
        <Route index element={<Overview></Overview>}></Route>
        <Route path='allitem' element={<AllItem></AllItem>}></Route>
        <Route path='allorder' element={<AllOrder></AllOrder>}></Route>
        <Route path='alluser' element={<AllUser></AllUser>}></Route> 
        <Route path='allgenre' element={<AllGenre></AllGenre>}></Route>
        <Route path='item'>
          <Route path='newitem' element={<AddNewItem></AddNewItem>}></Route>
          <Route path=':id' element={<AdminItem></AdminItem>}></Route>
          
        </Route>
        <Route path='order'>
          <Route path=':id' element={<AdminOrder></AdminOrder>}></Route>
        </Route>
        <Route path='user'>
          <Route path=':id' element={<AdminUser></AdminUser>}></Route>
          <Route path='newuser' element={<AddNewUser></AddNewUser>}></Route>
          
        </Route>
        <Route path='custombanner' element={<CustomBanner></CustomBanner>}></Route>

      </Route>:<>
      </>
      }
      
    </Routes>

    </BrowserRouter>
    
  
  );
}

export default App;
