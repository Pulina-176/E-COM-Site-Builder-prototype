import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import AdminSettings from './pages/AdminSettings';
import AppearanceSettings from './pages/AppearanceSettings';
import AddCommodity from './pages/AddCommodity';
import ViewCommodity from './pages/ViewCommodity';
import UpdateCommodity from './pages/UpdateCommodity';
import Products from './pages/Products';
import Services from './pages/Services';

import Products_user from './pages-user/Products-user';
import Services_user from './pages-user/Services-user';
import Landing_Page_User from './pages-user/Landing-user';

const App = () => {
  return (
    <Routes>
        <Route path='/admin' element={<AdminSettings/>}/> 
        <Route path='/admin/visuals' element={<AppearanceSettings/>}/>
        <Route path='/admin/addcom' element={<AddCommodity/>}/>
        <Route path='/admin/viewcom' element={<ViewCommodity/>}/>
        <Route path='/admin/upcom/:Type/:ID' element={<UpdateCommodity/>}/> 
        <Route path='/admin/products' element={<Products/>}/>
        <Route path='/admin/services' element={<Services/>}/>

        <Route path='/user/products' element={<Products_user/>} />
        <Route path='/user/services' element={<Services_user/>} />
        <Route path='/user' element={<Landing_Page_User/>} />
    </Routes>
  )
}

export default App 



 