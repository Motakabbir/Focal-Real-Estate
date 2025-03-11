import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { routes } from '../router';

const SubMenu = ({ handleSubMenuClick, subRoutes, showSubMenu, closeSubMenu }) => {
  return (
    <ul
      onMouseLeave={closeSubMenu} // Close submenu on mouse leave
      className={`submenu absolute bg-white mt-2 p-4 rounded shadow-lg ${showSubMenu ? 'block' : 'hidden'}`}
    >
      {subRoutes.map((subRoute, index) => (
        <li key={index} className="text-md leading-8 hover:text-blue-700">
          <Link to={subRoute.path} onClick={closeSubMenu}>
            {subRoute.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Navigation = () => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const location = useLocation();

  const handleSubMenuClick = (index) => {
    // Toggle submenu visibility
    setActiveSubMenu(index === activeSubMenu ? index : index );
  };

  const closeSubMenu = (index) => {
    // Close submenu on mouse leave

      const handleEvent = (event) => {
    const navMenu = document.querySelector('.navmenu');
    const submenu = document.querySelector('.submenu');
    if (!navMenu.contains(event.target) ) {
      // setActiveSubMenu(null);
      if (activeSubMenu === index && submenu) {
        setActiveSubMenu(index);
      } else {
        setActiveSubMenu(null);
      }
    }
  };

document.addEventListener('click', handleEvent);
document.addEventListener('mousemove', handleEvent);
  };

  // if mouse is not in navmenu then setActiveSubMenu(null);



  return (
    <nav className="flex items-center justify-between p-6 lg:px-8">
      <div className="navbar w-[95%] lg:w-[85%] flex items-center justify-between">
        <div className="flex-shrink-0">
          <a href="/" className="-m-1.5 p-1">
            <span className="sr-only">FOCAL Real Estate</span>
            <img className="h-12 w-auto" src="/fre-logo-color.svg" alt="FOCAL Real Estate" />
          </a>
        </div>
        {/* {activeSubMenu} */}
        <ul className="navmenu flex flex-1 justify-center">
          {routes
            .filter((route) => route.main !== false)
            .map((route, index) => (
              <li className="mr-8 text-lg leading-8" key={index} onMouseEnter={() => handleSubMenuClick(index)}>
                {route.subRoutes ? (
                  <>
                    <span
                       // On mouse enter, show submenu
                      onMouseLeave={() => closeSubMenu(index)} // On mouse leave, close submenu
                      className="cursor-pointer"
                    >
                      <span className="flex items-center">
                        {route.title}
                        <span className="text-xs ml-1">
                          {activeSubMenu === index ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-chevron-up"
                            >
                              <path d="m18 15-6-6-6 6" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-chevron-down"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          )}
                        </span>
                      </span>
                    </span>
                    <SubMenu
                      handleSubMenuClick={handleSubMenuClick}
                      subRoutes={route.subRoutes}
                      showSubMenu={activeSubMenu === index}
                      closeSubMenu={closeSubMenu}
                    />
                  </>
                ) : (
                  <>
                    {route.path === "/blog" ? (
                      <a href="https://focalrealestate.com.au/blog">Blog</a>
                    ) : (
                      <Link to={route.path} className={`${location.pathname === route.path ? 'active-link' : ''}`}>
                        {route.title}
                      </Link>
                    )}
                  </>
                )}
              </li>
            ))}
        </ul>

        <div className="flex-shrink-0 hidden lg:block">
          <div className="rounded-md p-3 text-sm font-semibold text-focal-blue border border-gray-300">
            <a href="tel:0732086222">
              <img src="/icons/telephone.png" className="inline mr-2" /> Call Us Now! (07) 3208 6222
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
