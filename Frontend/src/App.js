import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
// import SuperAdmin from './SuperAdminPage';
import UserDashboard from './UserDashBoard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/UserDashBoard' element={<UserDashboard />} />
          {/* <Route path='/superadmin' element={<SuperAdmin />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;