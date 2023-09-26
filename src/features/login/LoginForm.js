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

    const dispatch = useDispatch();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const storeUsername = useSelector((state) => state.login.username);
    const storePassword = useSelector((state) => state.login.password);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === storeUsername && password === storePassword) {
            dispatch(toggleLogin());
        } else {
            setLoginStatus("Incorrect username or password. Please try again.");
        }
    };

    return (
        <div className="form-container">
            {register ? (
                // Render the registration form if register is true
                <RegistrationForm />
            ) : (
                // Render the login form if register is false
                <form onSubmit={handleSubmit} className="form">
                    {loginStatus && (
                        <p className="text-red-500">{loginStatus}</p>
                    )}
                    <div className="">
                        <input
                            className="border border-grey-400 py-1 px-2 w-full"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="mt-5 mb-5">
                        <input
                            className="border border-grey-400 py-1 px-2 w-full"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-full bg-purple-500 py-1 hover:bg-purple-600 px-3 transition duration-300 ease-in-out text-white w-1/2 text-lg"
                    >
                        Submit
                    </button>
                </form>
            )}

            {/* Toggle button to switch between login and registration */}
            <button
                onClick={() => setRegister(!register)}
                className="mt-3 text-blue-500 hover:underline cursor-pointer"
            >
                {register ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
        </div>
    );
};

export default LoginForm;
