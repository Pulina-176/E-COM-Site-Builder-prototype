import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';


import AdminAuth from './pages/AdminAuth';
import AdminSettings from './pages/AdminSettings';
import AppearanceSettings from './pages/AppearanceSettings';
import AddCommodity from './pages/AddCommodity';
import ViewCommodity from './pages/ViewCommodity';
import UpdateCommodity from './pages/UpdateCommodity';
import Products from './pages/Products';
import Services from './pages/Services';
import PrivateRoutes from './components/PrivateRoutes';
import RequestsList from './pages/RequestsList';
import Orders from './pages/Orders';


import Products_user from './pages-user/Products-user';
import Services_user from './pages-user/Services-user';
import Landing_Page_User from './pages-user/Landing-user';
import Cart from './pages-user/Cart';


const App = () => {
  return (
    <Routes>

        <Route path='/admin-auth' element={<AdminAuth/>}/>

      <Route element={<PrivateRoutes/>}>
        <Route path='/admin' element={<AdminSettings/>}/> 
        <Route path='/admin/visuals' element={<AppearanceSettings/>}/>
        <Route path='/admin/addcom' element={<AddCommodity/>}/>
        <Route path='/admin/viewcom' element={<ViewCommodity/>}/>
        <Route path='/admin/upcom/:Type/:ID' element={<UpdateCommodity/>}/> 
        <Route path='/admin/products' element={<Products/>}/>
        <Route path='/admin/services' element={<Services/>}/>
        <Route path='/admin/requests' element={<RequestsList/>}/>
        <Route path='/admin/orders' element={<Orders/>}/>
      </Route>  

        <Route path='/user/products' element={<Products_user/>} />
        <Route path='/user/services' element={<Services_user/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/' element={<Landing_Page_User/>} />

        <Route path='/test' element={<PrivateRoutes/>} /> 


    </Routes>
  )
}

export default App 



 