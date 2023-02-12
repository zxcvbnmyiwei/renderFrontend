import React, { useState,useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import SubMenu from './SubMenu';
import GetSideBatData from "./SidebarData";
import AuthContext from '../context/AuthContext'
import { Button } from 'antd';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [subnav, setSubnav] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showSubnav = () => setSubnav(!subnav);
  const sidebarData = GetSideBatData();
  let {user, logoutUser} = useContext(AuthContext)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div style={{margin:"10px"}}>
          {user ? <Button onClick={logoutUser}>Logout</Button> : <Link to="/login">Login</Link>}
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose onClick={showSidebar}/>
              </Link>
            </li>
            {sidebarData.map((item, index) => {

              return <SubMenu  item={item} />;
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;