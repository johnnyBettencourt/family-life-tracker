import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../login/loginSlice";

const RegistrationForm = ({ handleRegisterError, registerStatus }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // Registration logic here
            // For this example, we'll just toggle login state
            dispatch(toggleLogin());
        } else {
            // Handle password mismatch error
            handleRegisterError("Passwords do not match.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {registerStatus && (
                <p className="text-red-500 text-sm my-2">{registerStatus}</p>
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
            <input
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
            <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-full w-full transition-colors duration-200"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;