import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import UserDashboard from './UserDashBoard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<UserDashboard />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/' element={<Register />} /> */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;