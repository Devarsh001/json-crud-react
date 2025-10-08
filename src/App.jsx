import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'font-awesome/css/font-awesome.min.css';
import Home from './components/Home'
import Adduser from './components/Adduser';
import Viewuser from './components/Viewuser';
import Edituser from './components/Edituser';
import Login from './components/Login';

function App() {
  return (
    <div className='container mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login></Login>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/addUser' element={<Adduser></Adduser>}></Route>
          <Route path='/viewUser/:id' element={<Viewuser></Viewuser>}></Route>
          <Route path='/editUser/:id' element={<Edituser></Edituser>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
