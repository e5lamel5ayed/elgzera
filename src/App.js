import React from 'react'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home  from './Pages/Home/Home';
import All  from './Pages/AddTicket/All';
import AddTicket  from './Pages/AddTicket/AddTicket';
import AddCategory from './Pages/Ticket Categories/AddCategory';
import AllCategories from './Pages/Ticket Categories/AllCategories';
import AddTourGuides from './Pages/TourGuides/AddTourGuides';
import AllTourGuides from './Pages/TourGuides/AllTourGuides';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/All" exact element={<All/>}></Route>
        <Route path="/AddTicket" exact element={<AddTicket/>}></Route>
        <Route path="/AddCategory" exact element={<AddCategory/>}></Route>
        <Route path="/AllCategories" exact element={<AllCategories/>}></Route>
        <Route path="/AddTourGuides" exact element={<AddTourGuides/>}></Route>
        <Route path="/AllTourGuides" exact element={<AllTourGuides/>}></Route>
        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
