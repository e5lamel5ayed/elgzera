import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AllTickets from "./Pages/AddTicket/AllTickets";
import AddTicket from "./Pages/AddTicket/AddTicket";
import AddCategory from "./Pages/Ticket Categories/AddCategory";
import AllCategories from "./Pages/Ticket Categories/AllCategories";
import AddTourGuides from "./Pages/TourGuides/AddTourGuides";
import AllTourGuides from "./Pages/TourGuides/AllTourGuides";
import AllCruises from "./Pages/Cruises/AllCruises";
import AddCruises from "./Pages/Cruises/AddCruises";
import AddPlaces from "./Pages/Places/AddPlaces";
import AllPlaces from "./Pages/Places/AllPlaces";
import AllProducts from "./Pages/Products/AllProducts";
import AddProducts from "./Pages/Products/AddProducts";
import AllReservation from "./Pages/Reservation/AllReservation";
import PayingOff from "./Pages/PayingOff/PayingOff";
import Login from "./Pages/Login";
import EditTicket from "./Pages/AddTicket/EditTicket";
import DailyReport from "./Pages/Reports/DailyReport";
import TotalDailyReport from "./Pages/Reports/TotalDailyReport";
import ProtectedRoute from "./Components/ProtectedRoute";
import AddUser from "./Pages/Register/AddUser";
import UserList from "./Pages/Register/UserList";
import AllUsers from "./Pages/Register/AllUsers";

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/Home" replace /> : <Login />}
        />
        <Route path="/Home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/AllTickets" element={<ProtectedRoute element={<AllTickets />} />} />
        <Route path="/AddTicket" element={<ProtectedRoute element={<AddTicket />} />} />
        <Route path="/EditTicket" element={<ProtectedRoute element={<EditTicket />} />} />
        <Route path="/AddCategory" element={<ProtectedRoute element={<AddCategory />} />} />
        <Route path="/AllCategories" element={<ProtectedRoute element={<AllCategories />} />} />
        <Route path="/AddTourGuides" element={<ProtectedRoute element={<AddTourGuides />} />} />
        <Route path="/AllTourGuides" element={<ProtectedRoute element={<AllTourGuides />} />} />
        <Route path="/AllCruises" element={<ProtectedRoute element={<AllCruises />} />} />
        <Route path="/AddCruises" element={<ProtectedRoute element={<AddCruises />} />} />
        <Route path="/AddPlaces" element={<ProtectedRoute element={<AddPlaces />} />} />
        <Route path="/AllPlaces" element={<ProtectedRoute element={<AllPlaces />} />} />
        <Route path="/AllProducts" element={<ProtectedRoute element={<AllProducts />} />} />
        <Route path="/AddProducts" element={<ProtectedRoute element={<AddProducts />} />} />
        <Route path="/AllReservation" element={<ProtectedRoute element={<AllReservation />} />} />
        <Route path="/PayingOff" element={<ProtectedRoute element={<PayingOff />} />} />
        <Route path="/daily-report" element={<ProtectedRoute element={<DailyReport />} />} />
        <Route path="/total-daily-report" element={<ProtectedRoute element={<TotalDailyReport />} />} />
        <Route path="/add-user" element={<ProtectedRoute element={<AddUser />} />} />
        <Route path="/user-list" element={<ProtectedRoute element={<UserList />} />} />
        <Route path="/all-users" element={<ProtectedRoute element={<AllUsers />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
