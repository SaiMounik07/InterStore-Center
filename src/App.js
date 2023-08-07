import './App.css';
import Navbar from './navbar/navbar';
import Prouduct from './components/product';
import Category from './components/category';
import Home from './components/home';
import { BrowserRouter, Routes,Outlet, Route } from "react-router-dom";
import NoPage from './pages/nopage';

function App() {
  return (
    <div className="App">
              <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navbar/>}>
                      <Route path='/home' index element={<Home/>}/>
                      <Route path="/category" element={<Category/>}/>
                      <Route path="/product" element={<Prouduct/>}/>
                      <Route path="*" element={<NoPage />} />
                    </Route>                  
                </Routes>
              </BrowserRouter>
    </div>
  );
}

export default App;
