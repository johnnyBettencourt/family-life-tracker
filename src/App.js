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
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <div className="App min-h-screen bg-gradient-to-tl from-purple-300 to-blue-200 text-gray-800">
      {!isLoggedIn ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-24">
          <LoginPage />
        </div>
      ) : (
        <div className="flex">
          <Sidebar />
          <div className="flex-grow p-4 md:p-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/finances" element={<FinancesPage />} />
              <Route path="/baby" element={<BabyPage />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
