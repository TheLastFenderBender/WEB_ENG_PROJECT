import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import SuperAdmin from './SuperAdmin/SuperAdminPage';
import Crew from './SuperAdmin/Crew';
import Maintenance from './SuperAdmin/Maintenance';
import FlightHistory from './SuperAdmin/FlightHistory';
// import UserDashboard from './UserDashBoard';
import AddFlight from './AddFlight';
import FlightManagerPage from './FlightManagerPage';
import AddAircraft from './AddAircraft';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/UserDashBoard' element={<UserDashboard />} /> */}

          {/* <Route path='/superadmin' element={<SuperAdmin></SuperAdmin>} ></Route> */}
          {/* <Route path='/crew' element={<Crew></Crew>} ></Route> */}
          {/* <Route path='/maintenance' element={<Maintenance></Maintenance>} ></Route> */}
          {/* <Route path='/flighthistory' element={<FlightHistory></FlightHistory>} ></Route> */}

          <Route path='/addflight' element={<AddFlight />} />
          <Route path='/flightmanager' element={<FlightManagerPage />} />
          <Route path='/addaircraft' element={<AddAircraft />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;