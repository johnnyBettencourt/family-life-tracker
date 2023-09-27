
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './features/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <div className="App min-h-screen bg-gradient-to-tl from-indigo-600 to-purple-400">
      {!isLoggedIn ? (
        // Render your main application content here when the user is logged in
        <div className='container mx-auto md:py-40 py-5'>
          <LoginPage />
          
          {/* Your main app content */}
        </div>
      ) : (
        // Render the login page when the user is not logged in
        <div className='flex'>
          <Sidebar />
          <div className='container mx-auto py-10'>
            <Dashboard />
          </div>
          
        </div>
        
      )}
    </div>
  )
}

export default App;
