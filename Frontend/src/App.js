import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import SuperAdmin from './SuperAdmin/SuperAdminPage';
import Crew from './SuperAdmin/Crew';
import Maintenance from './SuperAdmin/Maintenance';
import FlightHistory from './SuperAdmin/FlightHistory';
import PaymentHistory from './SuperAdmin/PaymentHistory';
import UserDashboard from './UserDashBoard';
import AddFlight from './FlightManager/AddFlight';
import FlightManagerPage from './FlightManager/FlightManagerPage';
import AddAircraft from './FlightManager/AddAircraft';
<<<<<<< HEAD
import FlightResult from './FlightResults'; 
import BookFlight from './BookFlight';
import FinalBooking from './FinalBooking';
import ReviewPopup from './ReviewPopup';
import SeatSelection from './SeatSelection';
import TripSummary from './TripSummary';
import AdminPage from './AdminPage';
import NewUser from './NewUser';
import UserPayment from './UserPayment';
// import AdminCreateBooking from './AdminCreateBooking';
// import Footer from './Footer';
=======
import AddRoute from './FlightManager/AddRoute';
import UpdateFlight from './FlightManager/UpdateFlight';
import AdminPage from './Admin/AdminPage';
import NewUser from  './Admin/NewUser';
import AdminCreateBooking from './Admin/AdminCreateBooking';
import Footer from './Footer';

>>>>>>> 6eb02d5756821a7c9ab5a2e02d1958f264566257

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/UserDashBoard' element={<UserDashboard />} />
          <Route path='/FlightResults' element={<FlightResult />} />

          <Route path='/BookFlight' element={<BookFlight />} />
          <Route path='/FinalBooking' element={<FinalBooking />} />
          <Route path='/ReviewPopup' element={<ReviewPopup />} />

          <Route path='/SeatSelection' element={<SeatSelection />} />
          <Route path='/TripSummary' element={<TripSummary />} />

          <Route path='/UserPayment' element={<UserPayment />} />




          <Route path='/superadmin' element={<SuperAdmin></SuperAdmin>} ></Route>
          <Route path='/crew' element={<Crew></Crew>} ></Route>
          <Route path='/maintenance' element={<Maintenance></Maintenance>} ></Route>
          <Route path='/flighthistory' element={<FlightHistory></FlightHistory>} ></Route>
          <Route path='/paymenthistory' element={<PaymentHistory></PaymentHistory>}></Route>

          <Route path='/addflight' element={<AddFlight />} />
          <Route path='/updateflight/:flightNumber' element={<UpdateFlight />} />
          <Route path='/flightmanager' element={<FlightManagerPage />} />
          <Route path='/addaircraft' element={<AddAircraft />} />
          <Route path='/addroute' element={<AddRoute />} />
          
          
        <Route path='/AdminPage' element={<AdminPage />} />
        <Route path='/NewUser' element={<NewUser />} />
        {/* <Route path='/AdminCreateBooking' element={<AdminCreateBooking />} /> */}
        </Routes>
      </Router>

      {/* <Footer></Footer> */}
    </div>
  )
}

export default App;