import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import CreateUserComp from './Components/CreateUserComp';
import LoginUserComp from './Components/LoginUserComp';

function App() {
  return (
    <div className="main-container">
      <nav>
        <ul className='navbar'>
          <li><Link to="/">Index</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Log In</Link></li>          
        </ul>
      </nav>
      
      <Routes>
        <Route path="/register" element={
          <CreateUserComp/>
        }/>

        <Route path="/login" element={
          <LoginUserComp/>
        }/>

        <Route path="/" element={
          <p>Index of website</p>          
        }/>
      </Routes>
    </div>
  );
}

export default App;
