
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import {Routes,Route} from 'react-router-dom'

function App() {
  

  return (
    <section >
      <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
       <Route path='/register' element={<Register/>}/>
      </Routes>

    </section>
  )
}

export default App
