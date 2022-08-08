import { useState } from 'react'
import { useSelector } from 'react-redux/es/exports'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, ProductDetail, Purchases} from './pages'
import { NavBar, Loading } from './components'
import { Container } from 'react-bootstrap'
import "/bootswatch/dist/lux/bootstrap.min.css";
import './App.css'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        <NavBar/>
        { isLoading && <Loading/>}
        <Container>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/product/:id' element={<ProductDetail/>}/>
            <Route path='/purchases' element={<Purchases/>}/>
          </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App
