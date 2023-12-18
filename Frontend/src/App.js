import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
<<<<<<< HEAD
import UserDashboard from './UserDashBoard';
=======
import SuperAdmin from './SuperAdminPage';
>>>>>>> 202879aa4ab4afcde6257988808b9d17157e56bd

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<UserDashboard />} />
          <Route path='/register' element={<Register />} />
<<<<<<< HEAD
          {/* <Route path='/' element={<Register />} /> */}
          <Route path='/login' element={<Login />} />
=======
          <Route path='/' element={<Login />} />
          <Route path='/superadmin' element={<SuperAdmin />} />
>>>>>>> 202879aa4ab4afcde6257988808b9d17157e56bd
        </Routes>
      </Router>
    </div>
  );
}

export default App;