import React from 'react'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home  from './Pages/Home/Home';
import All  from './Pages/AddTicket/All';
import AddTicket  from './Pages/AddTicket/AddTicket';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/All" exact element={<All/>}></Route>
        <Route path="/AddTicket" exact element={<AddTicket/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
