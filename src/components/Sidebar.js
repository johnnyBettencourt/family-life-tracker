import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiHome, BiTask, BiCalendar, BiLogOut, BiDollar, BiSolidBabyCarriage } from 'react-icons/bi';
import { toggleLogin } from '../features/login/loginSlice'; // Import the Redux action for user logout
import { useDispatch } from 'react-redux';

// Sidebar navigation items with display names, icons, paths, and sections
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
];

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const curPath = location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(activeItem !== -1 ? activeItem : 0);
    }, [location]);

    const handleLogout = () => {
        dispatch(toggleLogin(false));
        navigate('/');
    };

    return (
        <div className='flex flex-col top-0 left-0 bottom-0 w-64 bg-gray-50 rounded-r-lg shadow-lg justify-between h-screen sticky'>
            <div>
                <div className="sidebar__logo text-center pt-6 pb-4 text-2xl font-bold text-purple-600">
                    Family Hub
                </div>
                <div className="sidebar__menu">
                    {sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div className={`sidebar__menu__item flex items-center px-4 py-3 text-lg font-medium transition-all duration-300 ease-in-out hover:bg-purple-100 rounded-md ${activeIndex === index ? 'bg-purple-200 text-purple-700' : 'text-gray-700'}`}>
                                <div className="sidebar__menu__item__icon mr-3 text-2xl">
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

            <div className="mb-4">
                <Link to="/" onClick={handleLogout}>
                    <div className="sidebar__menu__item flex items-center justify-start px-4 py-3 text-lg font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-white hover:bg-red-500 rounded-md">
                        <div className="sidebar__menu__item__icon mr-3 text-xl text-red-500">
                            <BiLogOut />
                        </div>
                        <div className="sidebar__menu__item__text">
                            Logout
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;