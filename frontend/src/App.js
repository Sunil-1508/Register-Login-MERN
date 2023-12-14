import {BrowserRouter , Routes, Route } from 'react-router-dom'
import './App.css';
import Register from './Components/Register.js'
import Login from './Components/Login.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
