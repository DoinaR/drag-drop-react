import Playlist from './components/Playlist'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Playlist />} />
      <Route path=':viewParam?' exact element={<Playlist />} />
    </Routes>
  )
}

export default App
