import { NavLink } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import './Navbar.css';

function Navbar() {
  const { darkMode, setDarkMode } = useTrips();

  return (
    <nav className='navbar'>
      <div className='navbar-inner'>
        <NavLink to='/' className='navbar-logo'>
          <span className='logo-icon'>✈</span>
          <span className='logo-text'>Yatra<span>Boyz</span></span>
        </NavLink>

        <div className='navbar-links'>
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            end
          >
            🏠 Home
          </NavLink>
          <NavLink
            to='/explore'
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            🧭 Explore
          </NavLink>
          <NavLink
            to='/planner'
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            📅 Planner
          </NavLink>
          <NavLink
            to='/dashboard'
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            📊 Dashboard
          </NavLink>
        </div>

        <button
          className='dark-toggle'
          onClick={() => setDarkMode(!darkMode)}
          title='Toggle dark mode'
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
