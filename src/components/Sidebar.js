import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiHome, BiTask, BiCalendar, BiLogOut, BiDollar, BiSolidBabyCarriage } from 'react-icons/bi';
import { toggleLogin } from '../features/login/loginSlice';
import { useDispatch } from 'react-redux';


const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <BiHome />,
        to: '/',
        section: 'dashboard'
    },
    {
        display: 'Tasks',
        icon: <BiTask />,
        to: '/tasks',
        section: 'tasks'
    },
    {
        display: 'Calendar',
        icon: <BiCalendar />,
        to: '/calendar',
        section: 'calendar'
    },
    {
        display: 'Finances',
        icon: <BiDollar />,
        to: '/finances',
        section: 'finances'
    },
    {
        display: 'Baby',
        icon: <BiSolidBabyCarriage />,
        to: '/baby',
        section: 'baby'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(prevIndex => curPath.length === 0 ? 0 : activeItem);
        console.log(activeIndex);
    }, [location, activeIndex]);

    const handleLogout = () => {
        dispatch(toggleLogin(false));
        navigate('/');
    };

    return (
        <div className='fixed top-0 left-0 bottom-0 w-64 bg-white rounded-r-lg shadow-md flex flex-col justify-between'>
            <div>
                <div className="sidebar__logo text-center pt-4 text-2xl">
                    Family Hub
                </div>
                <div ref={sidebarRef} className="sidebar__menu">
                    <div
                        ref={indicatorRef}
                        className="sidebar__menu__indicator"
                        style={{
                            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                        }}
                    ></div>
                    {sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''} flex items-center justify-start px-6 py-4 text-lg font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-white hover:bg-purple-300 ${activeIndex === index ? 'bg-purple-300 text-white' : ''} rounded-md`}>
                                <div className="sidebar__menu__item__icon mr-4 text-xl">
                                    {item.icon}
                                </div>
                                <div className="sidebar__menu__item__text">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            {/* Logout Button */}
            <Link to="/logout" onClick={handleLogout}>
                <div className="px-6 py-4 text-lg font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-white hover:bg-red-500 rounded-md">
                    <div className="flex items-center justify-start">
                        <div className="sidebar__menu__item__icon mr-4 text-xl text-red-500">
                            <BiLogOut />
                        </div>
                        <div className="sidebar__menu__item__text">
                            Logout
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Sidebar;
