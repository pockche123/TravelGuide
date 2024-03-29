import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTourist } from '../../contexts/touristContext';
import { useGuide } from '../../contexts/guideContext';
import { useWelcome } from '../../contexts/welcomeContext';
import Notification from '../Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const PageWrapper = () => {
  const { tourist, setTourist } = useTourist();
  const { guide, setGuide } = useGuide();
  const { welcome, setWelcome } = useWelcome();

  const handleTouristLogout = () => {
    sessionStorage.removeItem('touristId');
    sessionStorage.removeItem('touristUsername');
    sessionStorage.removeItem('touristEmail');
    sessionStorage.removeItem('tourist_token');
    sessionStorage.removeItem('tourist_refresh');
    setTourist(false);
    setWelcome(true);
  };

  const handleGuideLogout = () => {
    sessionStorage.removeItem('guide_id');
    sessionStorage.removeItem('guide_Username');
    sessionStorage.removeItem('guide_Email');
    sessionStorage.removeItem('guide_token');
    sessionStorage.removeItem('guide_refresh');
    setGuide(false);
    setWelcome(true);
  };

  const renderWelcomeSection = () => (
    <div className='welcomeWrapper'>
      <header className='welcome-header'>
        <nav role='navbar' id='welcome-navbar'>
          <section className='logout-button'>
            <NavLink to='/touristloginpage'>Login</NavLink>
          </section>
        </nav>
      </header>
     </div>
  );

  const renderTouristSection = () => (
    <div className='touristWrapper'>
      <header className='tourist-header'>
        <span className='brand'>TravelGuide</span>
        <nav id='link-navbar'>
          <section className='links'>
            <NavLink to='/touristhomepage'>Home</NavLink>
            <NavLink to='/touristplanspage'>Plans</NavLink>
            <NavLink to='/touristwatchlistpage'>WatchList</NavLink>
            <NavLink to='/chat'>Chat</NavLink>
            {/* <NavLink to='/profile'>Profile</NavLink> */}
        
             
            <NavLink to='/' onClick={handleTouristLogout}>
               <FontAwesomeIcon icon={faDoorOpen} />
                Logout
              </NavLink>
    
          </section>
        </nav>
      </header>
    </div>
  );

  const renderGuideSection = () => (
    <div className='touristWrapper'>
      <header className='tourist-header'>
        <span className='brand'>TravelGuide</span>
        <nav id='link-navbar'>
          <section className='links'>
            <NavLink to='/guidehomepage'>Home</NavLink>
            <NavLink to='/guideprofilepage'>Profile</NavLink>
            <NavLink to='/chat'>Chat</NavLink>
            <NavLink to="/guidePlans">Plans</NavLink>
            <><Notification/></>
            {/* <section className='logout-button'> */}
            <NavLink to='/' onClick={handleGuideLogout}>
              <FontAwesomeIcon icon={faDoorOpen} />
                Logout
              </NavLink>
            {/* </section> */}
          </section>
        </nav>
      </header>
    </div>
  );

  return (
    <div className='page-wrapper'>
      {welcome && renderWelcomeSection()}
      {sessionStorage.getItem('tourist_token') && renderTouristSection()}
      {sessionStorage.getItem('guide_token') && renderGuideSection()}
      <Outlet />
      <footer id='footer'>
        <p>Copyright 2024</p>
      </footer>
    </div>
  );
};

export default PageWrapper;
