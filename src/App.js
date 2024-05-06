import React from 'react'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home  from './Pages/Home/Home';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        <Route path="/" exact element={<Home/>}></Route>
        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
