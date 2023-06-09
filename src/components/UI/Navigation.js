import React from 'react';
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Drivers from '../Drivers/Drivers';
import Races from '../Races/Races';
import Teams from '../Teams/Teams';
import Home from '../Home';
import DriverDetails from '../Drivers/DriverDetails';
import TeamDetails from '../Teams/TeamDetails';
import GrandPrixDetails from '../Races/GrandPrixDetails';
import SearchResultsDrivers from '../Search/SearchResultsDrivers';
import SearchResultsTeams from '../Search/SearchResultsTeams';
import SearchResultsRaces from '../Search/SearchResultsRaces';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
  return (
    <>
      <HashRouter basename='/'>
        <div>
          <Navbar
            collapseOnSelect
            expand='lg'
            style={{
              backgroundColor: '#095534',
              borderBottom: '1px solid #AED9C6'
            }}

            variant='dark'
            className='NavContainer'
          >
            <Navbar.Brand>
              <Link to='/' className='nav-link-home'>
                <img
                  src='./img/logo.png'
                  className='homeimg height-responsive width-responsive'
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav style={{ fontFamily: 'formulaBold', margin: 'auto' }}>
                <NavLink to='/drivers' className='nav-link text-center'>
                  <h2 className='mb-4 font-responsive'>Drivers</h2>
                  <div>
                    <img
                      src='./img/drivers.png'
                      className='helmet height-responsive'
                      alt='drivers'
                    />
                  </div>
                </NavLink>

                <NavLink to='/teams' className='nav-link text-center'>
                  <h2 className='mb-4 font-responsive'>Teams</h2>
                  <div>
                    <img
                      src='./img/bolid.png'
                      className='teams1 height-responsive'
                      alt='teams'
                    />
                  </div>
                </NavLink>

                <NavLink to='/races' className='nav-link text-center'>
                  <h2 className='mb-4 font-responsive'>Races</h2>
                  <div>
                    <img
                      src='./img/raceFlags.png'
                      className='races2 height-responsive'
                      alt='races'
                    />
                  </div>
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/drivers' element={<Drivers />} />
          <Route
            path='/drivers/details/:driverId'
            element={<DriverDetails />}
          />

          <Route path='/teams' element={<Teams />} />
          <Route path='/teams/details/:teamId' element={<TeamDetails />} />

          <Route path='/races' element={<Races />} />
          <Route path='/races/details/:round' element={<GrandPrixDetails />} />

          <Route path='/drivers/search' element={<SearchResultsDrivers />} />
          <Route path='/teams/search' element={<SearchResultsTeams />} />
          <Route path='/races/search' element={<SearchResultsRaces />} />
        </Routes>
      </HashRouter>
    </>
  );
}
