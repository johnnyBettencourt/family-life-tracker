import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../login/loginSlice";

const RegistrationForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState(null);

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
            setRegistrationStatus("Passwords do not match.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            {registrationStatus && (
                        <p className="text-red-500">{registrationStatus}</p>
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
            <div className="mt-5 mb-5">
                <input
                    className="border border-grey-400 py-1 px-2 w-full"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
            </div>

            <button
                type="submit"
                className="rounded-full bg-purple-500 py-1 hover:bg-purple-600 px-3 transition duration-300 ease-in-out text-white w-1/2 text-lg">
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;
