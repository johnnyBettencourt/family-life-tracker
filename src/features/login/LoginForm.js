import { useState } from "react"
import { store } from "../../app/store";
import { useDispatch } from "react-redux";
import { toggleLogin } from "./loginSlice";
import RegistrationForm from "../Register/RegistrationForm";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);

    const dispatch = useDispatch()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        e.preventDefault();
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        e.preventDefault();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === store.getState().login.username && password === store.getState().login.password) {
            dispatch(toggleLogin());
        }
        e.preventDefault();
    }
    return (
        <div className="form-container">
            {register ? (
                // Render the registration form if register is true
                <RegistrationForm />
            ) : (
                // Render the login form if register is false
                <form onSubmit={handleSubmit} className="form">
                    <div className="">
                        <input
                            className="border border-grey-400 py-1 px-2 w-full"
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="mt-5 mb-5">
                        <input
                            className="border border-grey-400 py-1 px-2 w-full"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-full bg-purple-500 py-1 hover:bg-purple-600 px-3 transition duration-300 ease-in-out text-white w-1/2 text-lg">
                        Submit
                    </button>
                </form>
            )}

            {/* Toggle button to switch between login and registration */}
            <button
                onClick={() => setRegister(!register)}
                className="mt-3 text-blue-500 hover:underline cursor-pointer">
                {register ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
        </div>
    );
};

export default LoginForm