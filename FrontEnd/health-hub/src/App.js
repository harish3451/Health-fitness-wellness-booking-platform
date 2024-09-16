
import './App.css';
import LandingPage from './Components/LandingPage';
import NavBar from './Components/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/User Components/Home';
import UserManager from './Components/User Components/UserManager';
import AdminHome from './Components/Admin Components/adminHome';
import UserProfile from './Components/User Components/UserProfile';
import Appointment from './Components/User Components/Appointments';
import ErrorBoundary from './Components/ErrorBoundary';
import AddCompany from './Components/Admin Components/Services/components/AddCompany';
import BookAppointment from './Components/User Components/BookAppointment';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext';
import UpdateService from './Components/Admin Components/Services/components/UpdateService';
import Reports from './Components/Admin Components/Reports';

function App() {
  
  return (
    <div>
        <ErrorBoundary>
        <Router>

        <NavBar/>

        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          {localStorage.getItem('admin')?<>
          <Route path='/adminhome' element={<ProtectedRoute component={AdminHome} />}>
            <Route path='addcompany' element={<ProtectedRoute component={AddCompany}/>}/>
            
          </Route>
          <Route path='/updateService' element={<ProtectedRoute component={UpdateService}/>}/>
          <Route path='/reports' element={<ProtectedRoute component={Reports}/>}/>
          </>:<>
          <Route path='/userhome' element={<ProtectedRoute component={Home}/>}></Route>
            <Route path='/bookappointment' element={<ProtectedRoute component={BookAppointment}/>}/>
          
          <Route path='/manager' element={<ProtectedRoute component={UserManager}/>}>
          <Route path='' element={<ProtectedRoute component={UserProfile}/>}/>
          <Route path='appointment' element={<ProtectedRoute component={Appointment}/>}/>
          </Route>
          </>}

          <Route path='*' element={<LandingPage/>}/>
        </Routes>

        </Router>
        <Footer/>
        </ErrorBoundary>
    </div>
  );
}

export default App;
