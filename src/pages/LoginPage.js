import LoginForm from "../features/login/LoginForm";

// LoginPage component
const LoginPage = () => {
    return (
        // Main container for login page
        <div className="md:w-8/12 bg-gray-50 rounded-2xl mx-auto shadow-xl overflow-hidden md:flex transition ease-in-out duration-300">
            {/* Left side with background image */}
            <div className="login-img md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-no-repeat bg-cover bg-center text-white text-center">
                <h1 className="text-4xl font-semibold mb-4">Welcome to Family Hub</h1>
                <p className="text-xl">Let us help you track the things that are important in life.</p>
            </div>
            {/* Right side with login form */}
            <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16 text-center">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
