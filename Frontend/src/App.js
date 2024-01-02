import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './User/Register';
import Login from './User/Login';
import SuperAdmin from './SuperAdmin/SuperAdminPage';
import Crew from './SuperAdmin/Crew';
import Maintenance from './SuperAdmin/Maintenance';
import FlightHistory from './SuperAdmin/FlightHistory';
import PaymentHistory from './SuperAdmin/PaymentHistory';
import Feedback from './SuperAdmin/Feedback';
import Reports from './SuperAdmin/Reports';

import UserDashboard from './User/UserDashBoard';
import AddFlight from './FlightManager/AddFlight';
import UpdateFlight from './FlightManager/UpdateFlight';
import FlightManagerPage from './FlightManager/FlightManagerPage';
import AddRoute from './FlightManager/AddRoute';
import UpdateRoute from './FlightManager/UpdateRoute';
import ViewRoutes from './FlightManager/ViewRoutes';
import AddAircraft from './FlightManager/AddAircraft';
import FlightResult from './User/FlightResults'; 
import BookFlight from './User/BookFlight';
import FinalBooking from './User/FinalBooking';
import ReviewPopup from './User/ReviewPopup';
import SeatSelection from './User/SeatSelection';
import TripSummary from './User/TripSummary';
import UserPayment from './User/UserPayment';
import UpdateAircraft from './FlightManager/UpdateAircraft';
import ViewAircrafts from './FlightManager/ViewAircrafts';
import AdminPage from './Admin/AdminPage';
import NewUser from './Admin/NewUser';
import Footer from './Footer';
import UserProfile from './User/UserProfile';
import BookingHistory from './User/BookingHistory';
import BookingDetails from './User/BookingDetails';
import Refund from './User/Refund';




function App() {

  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/UserDashBoard' element={<UserDashboard />} />
          <Route path='/FlightResults' element={<FlightResult />} />
          <Route path='/BookFlight/:userId' element={<BookFlight />} />
          <Route path="/FinalBooking/:userId/:flightNumber" element={< FinalBooking />} />
          <Route path='/UserProfile/:userId' element={<UserProfile />} />
          <Route path='/BookingHistory/:userId' element={<BookingHistory />} />
          <Route path='/BookingDetails/:userId' element={<BookingDetails />} />

          <Route path='/ReviewPopup' element={<ReviewPopup />} />

          
          <Route path='/SeatSelection/:userId/:flightNumber' element={<SeatSelection />} />
          <Route path='/TripSummary/:bookingNumber' element={<TripSummary />} />
          <Route path='/Refund/:userId/:bookingNumber' element={<Refund />} />

          <Route path='/UserPayment/:bookingNumber' element={<UserPayment />} />




          <Route path='/superadmin' element={<SuperAdmin></SuperAdmin>} ></Route>
          <Route path='/crew' element={<Crew></Crew>} ></Route>
          <Route path='/maintenance' element={<Maintenance></Maintenance>} ></Route>
          <Route path='/flighthistory' element={<FlightHistory></FlightHistory>} ></Route>
          <Route path='/paymenthistory' element={<PaymentHistory></PaymentHistory>}></Route>
          <Route path='/feedback' element={<Feedback></Feedback>}></Route>
          <Route path='/reports' element={<Reports></Reports>}></Route>

          <Route path='/addflight' element={<AddFlight />} />
          <Route path='/updateflight/:flightNumber' element={<UpdateFlight />} />
          <Route path='/flightmanager' element={<FlightManagerPage />} />
          <Route path='/addroute' element={<AddRoute />} />
          <Route path='/updateroute/:routeID' element={<UpdateRoute />} />
          <Route path='/viewroutes' element={<ViewRoutes />} />
          <Route path='/addaircraft' element={<AddAircraft />} />
          <Route path='/updateaircraft/:aircraftID' element={<UpdateAircraft />} />
          <Route path='/viewaircrafts' element={<ViewAircrafts />} />


          <Route path='/AdminPage' element={<AdminPage />} />
          <Route path='/NewUser' element={<NewUser />} /> 
        </Routes>
      </Router>

      <Footer className="footer"></Footer>
    </div>
  )
}

export default App;