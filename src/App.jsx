
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './components/auth/ProtectedRoutes'
import Pokedex from './pages/Pokedex'
import PokemonId from './pages/PokemonId'
import Home from './pages/Home'
import Config from './pages/Config'


function App() {


  localStorage.setItem('pokemonType', []);
  

  return (
    <section className=' sm:grid-cols-[1fr_auto]  mx-auto bg-white min-h-screen font-["Inter"]'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:pokemonName' element={<PokemonId />} />
          <Route path='/config' element={<Config />} />
        </Route>
      </Routes>
    </section>
  )
}

export default App
