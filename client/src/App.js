
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./components/User/Registration";
import SignIn from "./components/User/Login";
import Home from './components/Home/Home';
import Protected from './components/ProtectedRoutes/Protected';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
       <Route path='/' element = {<SignUp/>}/>
        <Route path='/login' element = {<SignIn/>}/>
        <Route path='/notes' element = {<Protected Component={Home}/>}/>
        
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
