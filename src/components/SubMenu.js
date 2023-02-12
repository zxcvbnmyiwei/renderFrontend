import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './SubMenu.css';


const SidebarLabel = styled.span`
  margin-left: 16px;
`;


const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link to={item.path} onClick={item.subNav && showSubnav} className='sidebarLink'>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link to={item.path} key={index} className='dropdownLink'>
              {item.icon}
              <span className="subMenuSpan">{item.title}</span>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
