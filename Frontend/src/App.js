import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import SuperAdmin from './SuperAdmin/SuperAdminPage';
import Crew from './SuperAdmin/Crew';
import Maintenance from './SuperAdmin/Maintenance';
import FlightHistory from './SuperAdmin/FlightHistory';
import PaymentHistory from './SuperAdmin/PaymentHistory';
// import UserDashboard from './UserDashBoard';
import AddFlight from './FlightManager/AddFlight';
import FlightManagerPage from './FlightManager/FlightManagerPage';
import AddAircraft from './FlightManager/AddAircraft';
import AdminPage from './Admin/AdminPage';
import NewUser from  './Admin/NewUser';
import AdminCreateBooking from './Admin/AdminCreateBooking';
import Footer from './Footer';


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/UserDashBoard' element={<UserDashboard />} /> */}
          
          <Route path='/superadmin' element={<SuperAdmin></SuperAdmin>} ></Route>
          <Route path='/crew' element={<Crew></Crew>} ></Route>
          <Route path='/maintenance' element={<Maintenance></Maintenance>} ></Route>
          <Route path='/flighthistory' element={<FlightHistory></FlightHistory>} ></Route>
          <Route path='/paymenthistory' element={<PaymentHistory></PaymentHistory>}></Route>

          <Route path='/addflight' element={<AddFlight />} />
          <Route path='/flightmanager' element={<FlightManagerPage />} />
          <Route path='/addaircraft' element={<AddAircraft />} />
          
          
        <Route path='/AdminPage' element={<AdminPage />} />
        <Route path='/NewUser' element={<NewUser />} />
        <Route path='/AdminCreateBooking' element={<AdminCreateBooking />} />
        </Routes>
      </Router>

      <Footer></Footer>
    </div>
  )
}

export default App;