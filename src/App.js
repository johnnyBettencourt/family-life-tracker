import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import FinancesPage from './pages/FinancesPage';
import BabyPage from './pages/BabyPage';

function App() {
  // Check if the user is logged in using Redux state
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <div className="App min-h-screen bg-gradient-to-tl from-indigo-600 to-purple-400">
      {!isLoggedIn ? ( // Display the login page if the user is not logged in
        <div className="container mx-auto md:py-40 py-5">
          <LoginPage /> {/* Render the LoginPage component */}
        </div>
      ) : (
        <div className="flex">
          <Sidebar /> {/* Render the Sidebar component */}
          <div className="flex-grow">
            {/* Set up routes for different pages */}
            <Routes>
              <Route path="/" element={<DashboardPage />} /> {/* Render DashboardPage for the root path */}
              <Route path="/tasks" element={<TasksPage />} /> {/* Render TasksPage for /tasks path */}
              <Route path="/calendar" element={<CalendarPage />} /> {/* Render CalendarPage for /calendar path */}
              <Route path="/finances" element={<FinancesPage />} /> {/* Render FinancesPage for /finances path */}
              <Route path="/baby" element={<BabyPage />} /> {/* Render BabyPage for /baby path */}
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;