
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileProvider } from "./FileContext"; 
import './App.css'

import Event from './pages/Event';

function App() {

  return (
    <FileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Event />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </FileProvider>
  )
}

export default App
