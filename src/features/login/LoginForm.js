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
            <div className={`transition-all ease-in-out duration-500 ${register || loginStatus || registerStatus ? 'max-h-screen' : 'max-h-72 overflow-hidden'}`}>
                {register ? (
                    <>
                        <h2 className="text-3xl font-medium mb-4 text-gray-700">Sign Up</h2>
                        <RegistrationForm handleRegisterError={handleRegisterError} registerStatus={registerStatus} />
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl font-medium mb-4 text-gray-700">Log In</h2>
                        <h4 className="text-l font-medium text-gray-300">Username: test</h4>
                        <h4 className="text-l font-medium mb-4 text-gray-300">password: test</h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {loginStatus && (
                                <p className="text-red-500 text-sm my-2">{loginStatus}</p>
                            )}
                            <input
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <input
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="submit"
                                className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-full w-full transition-colors duration-200"
                            >
                                Submit
                            </button>
                        </form>
                    </>
                )}

                {/* Toggle button to switch between login and registration */}
                <button
                    onClick={() => setRegister(!register)}
                    className="text-md text-blue-500 hover:text-blue-600 transition-colors duration-200 mt-4"
                >
                    {register ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                </button>
            </div>
        </>
    );
};

export default LoginForm;