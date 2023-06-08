
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import 'bootstrap/dist/js/bootstrap.bundle';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard'
function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/dashboard/*' element={<Dashboard/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
