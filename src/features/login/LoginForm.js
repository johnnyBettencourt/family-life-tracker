import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { toggleLogin } from "./loginSlice";
import RegistrationForm from "../Register/RegistrationForm";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [loginStatus, setLoginStatus] = useState(null); // State to track login status
    const [registerStatus, setRegisterStatus] = useState(null);

    const dispatch = useDispatch();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const storeUsername = useSelector((state) => state.login.username);
    const storePassword = useSelector((state) => state.login.password);

    const handleLoginError = (message) => {
        setLoginStatus(message);
        setRegisterStatus(null); // Clear registration error
    };

    const handleRegisterError = (message) => {
        setRegisterStatus(message);
        setLoginStatus(null); // Clear login error
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For this example, I'm using a hardcoded username and password for demonstration purposes.
        const correctUsername = storeUsername;
        const correctPassword = storePassword;

        if (username === correctUsername && password === correctPassword) {
            // Successful login
            dispatch(toggleLogin());
        } else {
            // Unsuccessful login
            handleLoginError("Incorrect username or password. Please try again.");
        }
    };

    return (
        <>
            <div className={`form-container transition-h duration-500 ease-in-out ${register || loginStatus || registerStatus ? 'max-h-screen' : 'max-h-72 overflow-hidden'}`}>
            {register ? (
                // Render the registration form if register is true
                <>
                    <h2 className="text-3xl mb-4">Sign Up</h2>
                    <RegistrationForm handleRegisterError={handleRegisterError} registerStatus={registerStatus} />
                </>
                
            ) : (
                // Render the login form if register is false
                <>
                    <h2 className="text-3xl mb-4">Log In</h2>
                    <form onSubmit={handleSubmit} className="form">
                    {loginStatus && (
                        <p className="text-red-500 mt-2">{loginStatus}</p>
                    )}
                    <div className="">
                        <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="mt-3 mb-3">
                        <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-full w-full mt-4"
                    >
                        Submit
                    </button>
                </form>
                </>
                
            )}

            {/* Toggle button to switch between login and registration */}
            <button
                onClick={() => setRegister(!register)}
                className="mt-3 text-blue-500 hover:underline cursor-pointer"
            >
                {register ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
        </div>
        </>
        
    );
};

export default LoginForm;