
import './App.css';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <div className="App">
      <Header />
      {!isLoggedIn ? (
        // Render your main application content here when the user is logged in
        <div>
          <LoginPage />
          
          {/* Your main app content */}
        </div>
      ) : (
        // Render the login page when the user is not logged in
        <div>
          
          <h1>Welcome to Your App</h1>
        </div>
        
      )}
    </div>
  )
}

export default App;
