import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import CreateUserComp from './Components/CreateUserComp';
import LoginUserComp from './Components/LoginUserComp';
import ItemsComp from './Components/ItemsComp';
import CreateItemComp from './Components/CreateItemComp';
import MyItemsComp from './Components/MyItemsComp';
import DetailsItemComp from './Components/DetailsItemComp';

function App() {
  return (
    <div className="main-container">
      <nav>
        <ul className='navbar'>
          <li><Link to="/">Index</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Log In</Link></li>   
          <li><Link to="/items">Items</Link></li>      
          <li><Link to="/createItem">Create Item</Link></li>
          <li><Link to="/myItems">My Items</Link></li>     
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

        <Route path="/items" element={
          <ItemsComp/>         
        }/>

        <Route path="/createItem" element={
          <CreateItemComp/>         
        }/>

        <Route path="/myItems" element={
          <MyItemsComp/>
        }/>

        <Route path="/item/:itemId" element={
          <DetailsItemComp/>
        }/>
      </Routes>
    </div>
  );
}

export default App;
