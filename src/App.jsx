
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Event from './pages/Event';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Event />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  )
}

export default App
