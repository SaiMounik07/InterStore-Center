import './App.css';
import Navbar from './components/navbar/navbar';
import Prouduct from './components/product/product';
import Category from './components/product/category';
import Home from './components/home/home';
import { BrowserRouter, Routes, Route, redirect,Link, Navigate } from "react-router-dom";
import NoPage from './pages/nopage';
import Login from './components/login/login'; // Correct import for Login component
import AuthService from './auth/auth-service';
import { useState, useEffect } from "react";
import Logout from './components/logout/logout';
import Order from './components/order/order';
import { useNavigate } from 'react-router-dom';
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showPopup, setShowPopup] = useState(true);
  // const navigate=useNavigate();

  const handleLogout = () => {
    setShowPopup(true);
  };
  const  handlePopupClose = () => {
    setShowPopup(false);
    // navigate("/login");
  };


  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const isAuthenticated = !!currentUser;

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          {isAuthenticated ? (
           <Route path="/" element={<Navbar />}>
                  <Route path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/category"
                    element={isAuthenticated ? <Category /> : <Route path="/login" element={<Login />} />}
                  /> 
          <Route path="/product"  
                    element={isAuthenticated ? <Prouduct /> : <Navigate to="/login" />}
                  />
          <Route path="/order"
                    element={isAuthenticated ? <Order/>:<Navigate to="/login"/>}
                  />        
          <Route path="/logout"
                    element={isAuthenticated ? <Logout isVisible={showPopup} onClose={handlePopupClose} />:<Route path="/login" element={<Login />} />}
                  />
                  <Route path="*" element={<NoPage />} />
             </Route>  
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          {isAuthenticated ? null : <Route path="/login"  element={<Login />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
