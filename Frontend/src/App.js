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
import AddRoute from './FlightManager/AddRoute';
import UpdateFlight from './FlightManager/UpdateFlight';
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
          <Route path='/updateflight' element={<UpdateFlight />} />
          <Route path='/flightmanager' element={<FlightManagerPage />} />
          <Route path='/addaircraft' element={<AddAircraft />} />
          <Route path='/addroute' element={<AddRoute />} />
        </Routes>
      </Router>

      <Footer></Footer>
    </div>
  )
}

export default App;