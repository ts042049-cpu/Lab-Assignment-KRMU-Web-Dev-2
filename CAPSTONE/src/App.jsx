import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Planner from './pages/Planner';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Navbar />
      <div className='app-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/planner' element={<Planner />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
